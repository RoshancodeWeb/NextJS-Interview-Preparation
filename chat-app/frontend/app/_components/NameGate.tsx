"use client"
import { useState } from "react"

import { api, getApiErrorMessage } from "../lib/api"
import { useCurrentUser } from "../context/UserContext"

/**
 * Asks who you are before letting you into the room. On submit it hits
 * POST /user/login, which upserts the user and hands back their record — so a
 * returning name logs back into the same account instead of making a new one.
 * The returned { _id, name } goes straight into context.
 */
const NameGate = () => {

    const { setUser } = useCurrentUser();

    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return; // guard against a double-click firing two logins

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

        // Cheap local check first — no point in a round-trip for an empty box.
        if (!trimmed) {
            setError("Please enter a display name");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const res = await api.post("/user/login", { name: trimmed });
            // Stored lowercase; capitalise the first letter just for display.
            const stored: string = res.data.user.name;
            setUser({
                _id: res.data.user._id,
                name: stored.charAt(0).toUpperCase() + stored.slice(1),
            });
        } catch (err) {
            // Real backend messages surface here: "name too short", "taken", etc.
            setError(getApiErrorMessage(err));
        } finally {
            setLoading(false);
        }
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
                            disabled={loading}
                            aria-invalid={error ? true : undefined}
                            className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 aria-invalid:border-rose-400 aria-invalid:focus:border-rose-500 aria-invalid:focus:ring-rose-500/20 disabled:opacity-60'
                        />

                        {error && (
                            <p role='alert' className='text-xs font-medium text-rose-600'>{error}</p>
                        )}
                    </div>

                    {/*
                      Disabled ONLY while a login is in flight — that's post-click,
                      so hydration is done and the dead-button trap doesn't apply.
                      It is never disabled based on field state, so an early typer
                      can always submit.
                    */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-indigo-600 disabled:active:scale-100'
                    >
                        {loading && (
                            <svg className='size-4 animate-spin' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                                <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' className='opacity-25' />
                                <path d='M12 2a10 10 0 0 1 10 10' stroke='currentColor' strokeWidth='4' strokeLinecap='round' />
                            </svg>
                        )}
                        {loading ? "Joining…" : "Enter room"}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default NameGate
