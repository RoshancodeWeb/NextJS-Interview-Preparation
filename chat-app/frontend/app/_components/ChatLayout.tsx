"use client"
import { useEffect, useMemo, useState } from "react"

import type { ChatUser, Conversations, Message } from "../types"
import UserList from "./UserList"
import ChatPanel from "./ChatPanel"
import { socket } from "../lib/socket"




const ChatLayout = ({ currentUserName, onLeave }: { currentUserName: string, onLeave: () => void }) => {

    // Everyone online except you. Starts as [] — never undefined, or every
    // .filter/.find below would need a guard.
    const [availableUsers, setavailableUsers] = useState<ChatUser[]>([]);

    // The server's id for this connection. Empty until `connect` fires, because
    // socket.id does not exist before the handshake completes.
    const [currentUserId, setCurrentUserId] = useState("");


    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    // Every conversation, keyed by the other person's id.
    const [conversations, setConversations] = useState<Conversations>({});
    const [unreadByUser, setUnreadByUser] = useState<Record<string, number>>({});

    useEffect(() => {

        const onConnect = () => {
            setCurrentUserId(socket.id ?? "");
            socket.emit("user:join", currentUserName);
        }

        const onNewList = (userlist: ChatUser[]) => {
            const userListToSet = userlist.filter(u => u.id !== socket.id);
            setavailableUsers(userListToSet);
        }

        const onNewMessage = (message: Message) => {

            setConversations(prev => ({
                ...prev,
                [message.from]: [...(prev[message.from] ?? []), message]

            }));

            if(message.from !==selectedUserId){
                setUnreadByUser(prev=>({...prev,[message.from]:(prev[message.from] ?? 0) + 1}));
            }

        }

        socket.on("connect", onConnect);
        socket.on("total:userslist", onNewList);
        socket.on("message:new", onNewMessage);



        socket.connect();

        return () => {

            socket.off("connect", onConnect);
            socket.off("total:userslist", onNewList);
            socket.off("message:new", onNewMessage);

            socket.disconnect();
        }
    }, [currentUserName]);





    const partner = useMemo(
        () => availableUsers.find((u) => u.id === selectedUserId) ?? null,
        [availableUsers, selectedUserId]
    );

    const messages = selectedUserId ? conversations[selectedUserId] ?? [] : [];


    const handleSelect = (id: string) => {
        setSelectedUserId(id);

        // opening a conversation clears its badge
        setUnreadByUser((prev) => ({ ...prev, [id]: 0 }));
    };


    const sendMessage = async (text: string) => {
        if (!selectedUserId) return;

        const message = {
            _id: `${Date.now()}-${Math.random()}`,
            from: currentUserId,
            to: selectedUserId,
            text,
            createdAt: new Date().toISOString()
        };

        setConversations((prev) => ({
            ...prev,
            [selectedUserId]: [...(prev[selectedUserId] ?? []), message]
        }))

        socket.emit("message:user", message);
    };


    return (
        <main className='flex min-h-screen items-center justify-center bg-slate-100 p-0 sm:p-4'>
            <div className='flex h-screen w-full overflow-hidden border-slate-200 bg-white sm:h-[85vh] sm:max-w-4xl sm:rounded-2xl sm:border sm:shadow-sm'>

                {/* On mobile only one pane shows at a time: the list until you
                    pick someone, then the conversation. */}
                <div className={`${selectedUserId ? 'hidden sm:flex' : 'flex'} w-full sm:w-auto`}>
                    <UserList
                        users={availableUsers}
                        selectedUserId={selectedUserId}
                        onSelect={handleSelect}
                        unreadByUser={unreadByUser}
                        currentUserName={currentUserName}
                        onLeave={onLeave}
                    />
                </div>

                {partner ? (
                    <ChatPanel
                        partner={partner}
                        messages={messages}
                        currentUserId={currentUserId}
                        onSend={sendMessage}
                        onBack={() => setSelectedUserId(null)}
                    />
                ) : (
                    <section className='hidden flex-1 items-center justify-center bg-slate-50 p-6 sm:flex'>
                        <div className='text-center'>
                            <div className='mx-auto flex size-12 items-center justify-center rounded-full bg-slate-200 text-slate-500'>
                                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.8} strokeLinecap='round' strokeLinejoin='round' className='size-6' aria-hidden='true'>
                                    <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
                                </svg>
                            </div>
                            <p className='mt-3 text-sm font-medium text-slate-700'>Pick someone to chat with</p>
                            <p className='mt-1 text-sm text-slate-500'>
                                Choose a name from the list on the left.
                            </p>
                        </div>
                    </section>
                )}
            </div>
        </main>
    )
}

export default ChatLayout
