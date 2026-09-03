import axios from "axios";

/**
 * One axios instance for the whole app.
 *
 *  - baseURL     → callers write api.post("/user/login"), not the full URL
 *  - withCredentials → the auth cookie rides along, same as the socket does
 *
 * Same origin the socket points at, plus the shared /api/v1 prefix.
 */
export const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
    withCredentials: true,
});

/**
 * Pull a human message out of whatever axios threw. Three shapes:
 *  - the server answered with our ApiError JSON  → use its message
 *  - the request never arrived (server down, CORS) → err.response is undefined
 *  - something else entirely                       → generic fallback
 */
export const getApiErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
        return err.response?.data?.message ?? "Can't reach the server. Is it running?";
    }
    return "Something went wrong";
};
