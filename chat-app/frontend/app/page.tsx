"use client"
import { useState } from "react"

import NameGate from "./_components/NameGate"
import ChatLayout from "./_components/ChatLayout"

const Home = () => {

    // Who you are. Held here rather than inside ChatLayout so that leaving
    // unmounts the whole chat and throws its conversation state away.
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    if (!currentUser) {
        return <NameGate onSubmit={setCurrentUser} />
    }

    return <ChatLayout currentUserName={currentUser} onLeave={() => setCurrentUser(null)} />
}

export default Home
