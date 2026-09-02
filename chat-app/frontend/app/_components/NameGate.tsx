"use client"
import { useState } from "react"

/**
 * Asks who you are before letting you into the room. Purely local state — there
 * is no auth here, the name is just a label attached to each message.
 */
const NameGate = ({ onSubmit }: { onSubmit: (name: string) => void }) => {

    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        /**
         * Read the value from the DOM, not from state.
         *
         * State is only populated once React has hydrated and onChange starts
         * firing. On a slow dev server — several tabs open, each triggering a
         * recompile — a user can type into the input before that happens, and
         * `name` would still be "". The DOM always has what they actually typed.
         */
        const form = e.currentTarget;
        const typed = (form.elements.namedItem("name") as HTMLInputElement)?.value ?? name;

        const trimmed = typed.trim();

        if (!trimmed) {
            setError("Please enter a display name");
            return;
        }

        setError("");
        onSubmit(trimmed);
    }

    return (
        <main className='flex min-h-screen items-center justify-center bg-slate-50 px-4'>
            <div className='w-full max-w-sm'>

                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'
                >
                    <header className='space-y-1'>
                        <h1 className='text-2xl font-bold tracking-tight text-slate-900'>
                            Join the chat
                        </h1>
                        <p className='text-sm text-slate-500'>
                            Pick a display name. No password, no account.
                        </p>
                    </header>

                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='name' className='text-sm font-medium text-slate-700'>
                            Display name
                        </label>
                        {/*
                          defaultValue + onChange, not value + onChange. The DOM
                          owns the text, so typing works whether or not React has
                          hydrated; state is kept in sync for anything that wants it.
                        */}
                        <input
                            type='text'
                            id='name'
                            name='name'
                            defaultValue={name}
                            onChange={(e) => { setName(e.target.value); if (error) setError(""); }}
                            placeholder='e.g. Roshan'
                            maxLength={24}
                            autoComplete='off'
                            autoFocus
                            aria-invalid={error ? true : undefined}
                            className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 aria-invalid:border-rose-400 aria-invalid:focus:border-rose-500 aria-invalid:focus:ring-rose-500/20'
                        />

                        {error && (
                            <p role='alert' className='text-xs font-medium text-rose-600'>{error}</p>
                        )}
                    </div>

                    {/*
                      Deliberately never disabled. A disabled button that depends
                      on React state is dead until hydration finishes — the user
                      types, nothing happens, and there is no way to find out why.
                      Let them click, and tell them what is wrong.
                    */}
                    <button
                        type='submit'
                        className='w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[.99]'
                    >
                        Enter room
                    </button>
                </form>
            </div>
        </main>
    )
}

export default NameGate
