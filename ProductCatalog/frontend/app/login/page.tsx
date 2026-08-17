"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import axios from 'axios'
import { toast } from 'sonner'
import { User, useUserContext } from '../context/UserContext'
import { useRedirectIfLoggedIn } from '../hooks/useRedirectIfLoggedIn'
import api from '../lib/api'

const labelClass =
    "text-sm font-medium text-slate-700"

const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"

interface Credentials {
    email: string,
    password: string
}

const defaultCredentials: Credentials = {
    email: "",
    password: ""
}

const Login = () => {
    const [credentials, setCredentials] = useState<Credentials>(defaultCredentials);
    const {loggedInUserDetails,setLoggedInUserDetails}=useUserContext();

    useRedirectIfLoggedIn();

    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
           const res=await api.post<{ success: boolean; data: User; message: string }>("/user/login",credentials);
           setLoggedInUserDetails({_id:res.data.data._id,name:res.data.data.name,email:res.data.data.email});
           
           return toast.success(res.data.message);
        }
        catch(error){
            if(axios.isAxiosError(error)){
                if(error?.response){
                    const data=error.response?.data;
                    return toast.error(data.message);
                }

                return toast.error("Could Not Reach Server.Is it running");
            }

            return toast.error(error instanceof Error?error.message:"Something Went Wrong,Please Try Again");
        }

        
    }

    if (loggedInUserDetails) return null;


    return (
        <main className='flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-white to-indigo-50 px-4 py-10 sm:py-16'>
            <div className='w-full max-w-md'>

                {/* Card */}
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'
                >

                    {/* Header */}
                    <header className='space-y-1'>
                        <h1 className='text-2xl font-bold tracking-tight text-slate-900'>
                            Welcome back
                        </h1>
                        <p className='text-sm text-slate-500'>
                            Log in to manage your product catalog.
                        </p>
                    </header>

                    <div className='flex flex-col gap-4'>

                        {/* Email */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor='email' className={labelClass}>
                                Email
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                autoComplete='email'
                                value={credentials.email}
                                onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                                placeholder='you@example.com'
                                className={inputClass}
                            />
                        </div>

                        {/* Password */}
                        <div className='flex flex-col gap-1.5'>
                            <div className='flex items-center justify-between'>
                                <label htmlFor='password' className={labelClass}>
                                    Password
                                </label>
                                <Link
                                    href='/forgot-password'
                                    className='text-xs font-medium text-indigo-600 underline-offset-2 transition hover:underline'
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                autoComplete='current-password'
                                value={credentials.password}
                                onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                                placeholder='Enter your password'
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type='submit'
                        className='w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[.99] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                        Log In
                    </button>

                    {/* Divider */}
                    <div className='flex items-center gap-3'>
                        <span className='h-px flex-1 bg-slate-200' />
                        <span className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                            or
                        </span>
                        <span className='h-px flex-1 bg-slate-200' />
                    </div>

                    {/* Footer link */}
                    <p className='text-center text-sm text-slate-600'>
                        Don&apos;t have an account?{' '}
                        <Link
                            href='/signup'
                            className='font-semibold text-indigo-600 underline-offset-2 transition hover:underline'
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    )
}

export default Login
