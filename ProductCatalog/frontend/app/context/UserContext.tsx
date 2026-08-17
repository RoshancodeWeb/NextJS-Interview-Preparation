"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../lib/api";



export interface User{
    _id:string,
    name:string,
    email:string,

}

interface UserContext{
   loggedInUserDetails:User | null,
   setLoggedInUserDetails:React.Dispatch<React.SetStateAction<User | null>>,
   logout:()=>Promise<void>
}


const UserContext=createContext<UserContext | null>(null);

const LoadingSkeleton=()=>{
    return (
        <div className='flex min-h-screen flex-col'>

            {/* stand-in for the navbar, same height so nothing jumps */}
            <div className='h-14 border-b border-slate-200 bg-white'>
                <div className='mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4'>
                    <div className='h-4 w-32 animate-pulse rounded bg-slate-200' />
                    <div className='flex items-center gap-2'>
                        <div className='h-7 w-16 animate-pulse rounded-lg bg-slate-100' />
                        <div className='h-7 w-20 animate-pulse rounded-lg bg-slate-200' />
                    </div>
                </div>
            </div>

            {/* stand-in for the page */}
            <div className='flex flex-1 items-center justify-center bg-linear-to-br from-slate-50 via-white to-indigo-50 px-4'>
                <div className='w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm'>
                    <div className='h-6 w-2/5 animate-pulse rounded bg-slate-200' />
                    <div className='h-3 w-3/5 animate-pulse rounded bg-slate-100' />
                    <div className='space-y-3 pt-2'>
                        <div className='h-10 w-full animate-pulse rounded-lg bg-slate-100' />
                        <div className='h-10 w-full animate-pulse rounded-lg bg-slate-100' />
                    </div>
                    <div className='h-10 w-full animate-pulse rounded-lg bg-slate-200' />
                </div>
            </div>

            {/* announced to screen readers, invisible on screen */}
            <span className='sr-only' role='status' aria-live='polite'>Loading your session</span>
        </div>
    )
}

const UserProvider=({children}:{children:React.ReactNode})=>{
    const [loggedInUserDetails,setLoggedInUserDetails]=useState<User | null>(null);
    const [loadingUser,setLoadingUser]=useState(true);

    useEffect(()=>{
       const loadUserDetails=async()=>{
           try {
              const response=await api.get("/user/me");
              setLoggedInUserDetails(response.data.data);

           } catch (error) {
              setLoggedInUserDetails(null);
           }finally{
              setLoadingUser(false);
           }

       }

        loadUserDetails();

    },[]);


    const logout=async()=>{
       try {
          await api.post("/user/logout");
          toast.success("Logged out");
       } catch {
          // even if the server call fails, clear locally — the user asked to leave
          toast.error("Could not reach server, logged out locally");
       } finally {
          setLoggedInUserDetails(null);
       }
    }


    return(
        <UserContext value={{loggedInUserDetails,setLoggedInUserDetails,logout}}>
            {loadingUser?<LoadingSkeleton/>:children}
        </UserContext>
    )
}



export const useUserContext=()=>{
    const context=useContext(UserContext);

    if(!context){
       throw new Error("Context Should Be Used Within The Provider");
    }

    return context;
}



export default UserProvider
