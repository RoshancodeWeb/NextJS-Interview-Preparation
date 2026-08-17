"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserContext } from "../context/UserContext"

/**
 * Kicks an already-logged-in user off pages they shouldn't see (login, signup).
 *
 * No loading check is needed here: UserProvider renders the skeleton until
 * /me has answered, so by the time this runs we already know who the user is.
 */
export const useRedirectIfLoggedIn = (to: string = "/") => {
    const { loggedInUserDetails } = useUserContext();
    const router = useRouter();

    useEffect(() => {
        if (loggedInUserDetails) {
            // replace, not push — otherwise the back button lands them here again
            router.replace(to);
        }
    }, [loggedInUserDetails, router, to]);


}
