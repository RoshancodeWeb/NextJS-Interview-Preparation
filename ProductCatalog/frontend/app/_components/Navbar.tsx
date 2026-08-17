"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useUserContext } from "../context/UserContext"

const Navbar = () => {
    const { loggedInUserDetails, logout } = useUserContext();
    const [loggingOut, setLoggingOut] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoggingOut(true);
        await logout();
        setLoggingOut(false);
        router.push("/login");
    }

    return (
        <header className='sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur'>
            <nav className='mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4'>

                {/* Brand */}
                <Link href='/' className='text-sm font-bold tracking-tight text-slate-900'>
                    Product<span className='text-indigo-600'>Catalog</span>
                </Link>

                {/* Right side */}
                {loggedInUserDetails ? (
                    <div className='flex items-center gap-3'>
                        {/* Initial circle */}
                        <span className='flex size-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold uppercase text-indigo-700'>
                            {loggedInUserDetails.name.charAt(0)}
                        </span>

                        <span className='hidden text-sm font-medium text-slate-700 sm:inline'>
                            {loggedInUserDetails.name}
                        </span>

                        <button
                            type='button'
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className='rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60'
                        >
                            {loggingOut ? 'Logging out…' : 'Log out'}
                        </button>
                    </div>
                ) : (
                    <div className='flex items-center gap-2'>
                        <Link
                            href='/login'
                            className='rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900'
                        >
                            Log in
                        </Link>
                        <Link
                            href='/signup'
                            className='rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700'
                        >
                            Sign up
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar
