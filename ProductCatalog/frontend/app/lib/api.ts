import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

type RetriableRequest=InternalAxiosRequestConfig & {_retried?:boolean}

export const api=axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
    withCredentials:true
});

let refreshPromise:Promise<unknown> | null=null;

const refreshSession=()=>{
    if(!refreshPromise){
        refreshPromise=axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/refresh-token`,
            {},
            {withCredentials:true}
        ).finally(()=>{refreshPromise=null});
    }

    return refreshPromise;
}



api.interceptors.response.use(
    (response)=>response,
    async(error:AxiosError<{code?:string}>)=>{
        const original=error.config as RetriableRequest;
        const code=error.response?.data?.code;

        // ONLY a token that aged out.
        // NO_TOKEN means there was no cookie at all — and since both cookies
        // share the same maxAge, no access cookie means no refresh cookie
        // either. Refreshing cannot help, and treating it as refreshable sends
        // logged-out visitors into a redirect loop.
        const refreshable=code==="TOKEN_EXPIRED" || code==="NO_TOKEN";

        const shouldRefresh=error.response?.status===401 &&
                            refreshable &&
                            original &&
                            !original._retried;

        if(!shouldRefresh){
            return Promise.reject(error);
        }

        original._retried=true;

        try {
            await refreshSession();
            return api(original);
        } catch (refreshError) {
            // never hard-redirect to /login when we are already on /login
            const onAuthPage=typeof window !== "undefined" &&
                             (window.location.pathname.startsWith("/login") ||
                              window.location.pathname.startsWith("/signup"));

            if(typeof window !== "undefined" && !onAuthPage){
                window.location.href="/login";
            }

            return Promise.reject(refreshError);
        }
    }
)

export default api;
