"use client"
import { useEffect, useRef } from "react"
import type { Message } from "../types"

const time = (iso: string) =>
    new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

type Props = {
    messages: Message[],
    /** your own id — anything `from` this is shown on the right */
    currentUserId: string,
    partnerName: string
}

const MessageList = ({ messages, currentUserId, partnerName }: Props) => {

    const bottomRef = useRef<HTMLDivElement>(null);

    // Jump to the newest message whenever the list grows. Without this you stay
    // scrolled where you were and never see what just arrived.
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);


    if (messages.length === 0) {
        return (
            <div className='flex flex-1 items-center justify-center p-6'>
                <div className='text-center'>
                    <p className='text-sm font-medium text-slate-700'>
                        No messages with {partnerName} yet
                    </p>
                    <p className='mt-1 text-sm text-slate-500'>Say hello.</p>
                </div>
            </div>
        )
    }

    return (
        <ul className='flex flex-1 flex-col gap-3 overflow-y-auto p-4'>
            {messages.map((message) => {
                const isMine = message.from === currentUserId;

                return (
                    <li
                        key={message._id}
                        className={`flex flex-col gap-1 ${isMine ? 'items-end' : 'items-start'}`}
                    >
                        <span className='px-1 text-xs font-medium text-slate-500'>
                            {isMine ? 'You' : partnerName}
                            <span className='ml-1.5 font-normal text-slate-400'>
                                {time(message.createdAt)}
                            </span>
                        </span>

                        <div
                            className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm wrap-break-word ${isMine
                                ? 'rounded-br-sm bg-indigo-600 text-white'
                                : 'rounded-bl-sm border border-slate-200 bg-white text-slate-800'
                                }`}
                        >
                            {message.text}
                        </div>
                    </li>
                )
            })}

            {/* scroll anchor */}
            <div ref={bottomRef} />
        </ul>
    )
}

export default MessageList
