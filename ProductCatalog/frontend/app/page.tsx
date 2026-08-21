"use client"
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import api from './lib/api'
import { useUserContext } from './context/UserContext'
import AddProduct from './_components/AddProduct'
import Products from './_components/Products'

const Home = () => {
  const { loggedInUserDetails } = useUserContext();


  return (
    <main className='mx-auto w-full max-w-2xl px-4 py-10'>
      <h1 className='text-2xl font-bold tracking-tight text-slate-900'>
        Product Catalog
      </h1>

      <p className='mt-1 text-sm text-slate-500'>
        {loggedInUserDetails
          ? `Signed in as ${loggedInUserDetails.name}`
          : 'Not signed in'}
      </p>

      {/* Refresh-flow tester */}
      <section className='mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <AddProduct />
        <Products />

      </section>
    </main>
  )
}

export default Home
