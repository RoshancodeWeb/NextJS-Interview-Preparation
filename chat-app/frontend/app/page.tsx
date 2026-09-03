"use client"
import { useCurrentUser } from "./context/UserContext"
import NameGate from "./_components/NameGate"
import ChatLayout from "./_components/ChatLayout"

const Home = () => {

    // Identity now lives in context, not local state. Leaving sets it back to
    // null, which unmounts ChatLayout and throws its conversation state away.
    const { user } = useCurrentUser();

    if (!user) {
        return <NameGate />
    }

    return <ChatLayout />
}

export default Home
