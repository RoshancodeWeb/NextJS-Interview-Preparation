"use client"
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import api from './lib/api'
import { useUserContext } from './context/UserContext'

const Home = () => {
  const { loggedInUserDetails } = useUserContext();
  const [pinging, setPinging] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const ping = async () => {
    setPinging(true);
    const startedAt = new Date().toLocaleTimeString();

    try {
      const res = await api.get("/user/ping");
      setLog((prev) => [`${startedAt}  ✅  ${res.data.message}`, ...prev]);
      toast.success("Ping succeeded");
    } catch (error) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ?? "Could not reach the server"
        : "Request failed";

      setLog((prev) => [`${startedAt}  ❌  ${message}`, ...prev]);
      toast.error(message);
    } finally {
      setPinging(false);
    }
  }

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
        <h2 className='text-sm font-semibold text-slate-900'>Refresh flow test</h2>
        <p className='mt-1 text-sm text-slate-500'>
          Calls the protected <code className='rounded bg-slate-100 px-1'>/user/ping</code> route.
          Once the access token expires, this should still succeed — the interceptor
          refreshes and replays the request.
        </p>

        <button
          type='button'
          onClick={ping}
          disabled={pinging}
          className='mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {pinging ? 'Pinging…' : 'Ping protected route'}
        </button>

        {log.length > 0 && (
          <ul className='mt-5 space-y-1.5 border-t border-slate-100 pt-4'>
            {log.map((line, i) => (
              <li key={i} className='font-mono text-xs text-slate-600'>{line}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default Home
