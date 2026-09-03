"use client"
import { createContext, useContext, useState, type ReactNode } from "react"

/** The logged-in person. _id is the stable database id — the thing message
 *  routing and conversationIds are keyed on, unlike socket.id which changes
 *  on every reconnect. */
export type CurrentUser = {
    _id: string,
    name: string
}

type UserContextValue = {
    user: CurrentUser | null,
    setUser: (user: CurrentUser | null) => void,
}

const UserContext = createContext<UserContextValue | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<CurrentUser | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

/**
 * Read the logged-in user from anywhere in the tree. Throws if used outside
 * <UserProvider> — that turns a whole class of silent "it's null" bugs into
 * one loud, obvious error at the exact component that's misplaced.
 */
export const useCurrentUser = () => {
    const ctx = useContext(UserContext)
    if (!ctx) throw new Error("useCurrentUser must be used inside <UserProvider>")
    return ctx
}
