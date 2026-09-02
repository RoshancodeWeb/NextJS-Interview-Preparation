"use client"
import type { ChatUser, Message } from "../types"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"

type Props = {
    partner: ChatUser,
    messages: Message[],
    currentUserId: string,
    onSend: (text: string) => Promise<void>,
    /** mobile only — clears the selection to reveal the list again */
    onBack: () => void
}



const ChatPanel = ({ partner, messages, currentUserId, onSend, onBack }: Props) => {
    return (
        <section className='flex flex-1 flex-col bg-slate-50'>

            <header className='flex items-center gap-2.5 border-b border-slate-200 bg-white px-4 py-3'>
                {/* only useful on narrow screens, where the list is hidden */}
                <button
                    type='button'
                    onClick={onBack}
                    aria-label='Back to people'
                    className='-ml-1 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:hidden'
                >
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' className='size-5' aria-hidden='true'>
                        <path d='M15 18l-6-6 6-6' />
                    </svg>
                </button>

                <span className='relative shrink-0'>
                    <span className='flex size-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold uppercase text-indigo-700'>
                        {partner.name.charAt(0)}
                    </span>
                    <span className='absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-emerald-500' />
                </span>

                <div className='min-w-0'>
                    <p className='truncate text-sm font-semibold text-slate-900'>{partner.name}</p>
                    <p className='text-xs text-emerald-600'>Online</p>
                </div>
            </header>

            <MessageList
                messages={messages}
                currentUserId={currentUserId}
                partnerName={partner.name}
            />

            <MessageInput onSend={onSend} placeholder={`Message ${partner.name}…`} />
        </section>
    )
}

export default ChatPanel
