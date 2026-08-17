import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

/** Our own flag, so a retried request is never retried twice. */
type RetriableRequest = InternalAxiosRequestConfig & { _retried?: boolean };

export const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
    withCredentials: true,   // cookies on every request — set once, can't be forgotten
});

/**
 * If several requests 401 at the same moment we must NOT fire several refreshes.
 * Keeping the in-flight promise here means the first one does the work and the
 * rest just wait on it.
 */
let refreshPromise: Promise<unknown> | null = null;

const refreshSession = () => {
    if (!refreshPromise) {
        refreshPromise = axios
            .post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/refresh-token`,
                {},
                { withCredentials: true }
            )
            .finally(() => { refreshPromise = null; });
    }
    return refreshPromise;
};

api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError<{ code?: string }>) => {
        const original = error.config as RetriableRequest | undefined;
        const code = error.response?.data?.code;

        // TOKEN_EXPIRED  → the token aged out
        // NO_TOKEN       → the access cookie is gone, but the refresh one may live
        // INVALID_TOKEN  → tampered. NEVER refresh this one.
        const refreshable = code === "TOKEN_EXPIRED" || code === "NO_TOKEN";

        const shouldRefresh =
            error.response?.status === 401 &&
            refreshable &&
            original &&
            !original._retried;

        if (!shouldRefresh) {
            return Promise.reject(error);
        }

        original._retried = true;

        try {
            await refreshSession();
            return api(original);          // replay the original request
        } catch {
            // the refresh token is gone or reused — this is a real logout
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
            return Promise.reject(error);
        }
    }
);

export default api;
