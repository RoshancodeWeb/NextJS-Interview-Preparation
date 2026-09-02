"use client"
import { useState } from "react"

type Props = {
    onSend: (text: string) => Promise<void>,
    disabled?: boolean,
    placeholder?: string
}

const MessageInput = ({ onSend, disabled, placeholder = "Type a message…" }: Props) => {

    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmed = text.trim();
        if (!trimmed) return;

        // Clear immediately so typing feels instant. If the send fails the
        // parent shows a toast — we don't hold the box hostage to the network.
        setText("");
        setSending(true);

        try {
            await onSend(trimmed);
        } finally {
            // one place that re-enables, whatever happened
            setSending(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='flex items-center gap-2 border-t border-slate-200 bg-white p-3'
        >
            <label htmlFor='message' className='sr-only'>Message</label>
            <input
                type='text'
                id='message'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeholder}
                maxLength={500}
                autoComplete='off'
                disabled={disabled}
                className='flex-1 rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-60'
            />

            <button
                type='submit'
                disabled={disabled || sending || !text.trim()}
                aria-label='Send message'
                className='flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-indigo-600 disabled:active:scale-100'
            >
                {sending ? (
                    <svg className='size-4 animate-spin' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                        <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' className='opacity-25' />
                        <path d='M12 2a10 10 0 0 1 10 10' stroke='currentColor' strokeWidth='4' strokeLinecap='round' />
                    </svg>
                ) : (
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' className='size-4' aria-hidden='true'>
                        <path d='M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z' />
                    </svg>
                )}
            </button>
        </form>
    )
}

export default MessageInput
