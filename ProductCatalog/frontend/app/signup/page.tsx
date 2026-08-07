"use client"
import React, { useState } from 'react'
import Link from "next/link"
import { toast } from 'sonner'
import axios from 'axios'

const labelClass =
    "text-sm font-medium text-slate-700"

const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"

interface User {
    name: string,
    email: string,
    password: string,
    confirmpassword: string
}




const SignUp = () => {
    const [userDetails, setUserDetails] = useState<User>({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    });



    const handleSubmit=async()=>{
        const errors=[];
        if(!userDetails.name.trim()) errors.push("Name Is Required");
        if(!userDetails.email.trim()) errors.push("Email Is Required");
        if(!userDetails.password.trim()) errors.push("Password Is Required");
        if(!userDetails.email.trim()) errors.push("Confirm Passwor Is Required");

        if(errors.length){
            toast.error(errors.join(", "));
            return;
        }

       
        if(userDetails.password!==userDetails.confirmpassword){
            toast.error("Password Did Not Matched");
            return;
        }

        try {
            const response=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/signup`,userDetails);
            toast.success(response.data.message);
        } catch (error) {
            
        }


    }

    return (
        <main className='flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-white to-indigo-50 px-4 py-10 sm:py-16'>
            <div className='w-full max-w-md'>

                {/* Card */}
                <div className='flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'>

                    {/* Header */}
                    <header className='space-y-1'>
                        <h1 className='text-2xl font-bold tracking-tight text-slate-900'>
                            Create your account
                        </h1>
                        <p className='text-sm text-slate-500'>
                            Start managing your product catalog in minutes.
                        </p>
                    </header>

                    <div className='flex flex-col gap-4'>

                        {/* Name */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor='name' className={labelClass}>
                                Name
                            </label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                autoComplete='name'
                                value={userDetails.name}
                                onChange={(e) => { setUserDetails((prev) => ({ ...prev, name: e.target.value })) }}
                                placeholder='Enter your name'
                                className={inputClass}
                            />
                        </div>

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
                                value={userDetails.email}
                                onChange={(e) => { setUserDetails((prev) => ({ ...prev, email: e.target.value })) }}
                                placeholder='you@example.com'
                                className={inputClass}
                            />
                        </div>

                        {/* Password */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor='password' className={labelClass}>
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                autoComplete='new-password'
                                value={userDetails.password}
                                onChange={(e)=>{setUserDetails((prev)=>({...prev,password:e.target.value}))}}
                                placeholder='Enter Your Password'
                                className={inputClass}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor='confirmpassword' className={labelClass}>
                                Confirm Password
                            </label>
                            <input
                                type='password'
                                id='confirmpassword'
                                name='confirmpassword'
                                autoComplete='new-password'
                                value={userDetails.confirmpassword}
                                onChange={(e)=>{setUserDetails((prev)=>({...prev,confirmpassword:e.target.value}))}}
                                placeholder='Re-enter your password'
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type='button'
                        className='w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[.99] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        onClick={handleSubmit}
                    >
                        Sign Up
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
                        Already have an account?{' '}
                        <Link
                            href='/login'
                            className='font-semibold text-indigo-600 underline-offset-2 transition hover:underline'
                        >
                            Login
                        </Link>
                    </p>
                </div>

                <p className='mt-6 text-center text-xs text-slate-400'>
                    By signing up you agree to our terms and privacy policy.
                </p>
            </div>
        </main>
    )
}

export default SignUp
