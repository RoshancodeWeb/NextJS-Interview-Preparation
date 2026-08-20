import Form from './_components/Form'
import TaskList from './_components/TaskList'

const Home = () => {
  return (
    <main className='min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 px-4 py-10 sm:py-16'>
      <div className='mx-auto flex w-full max-w-2xl flex-col gap-8'>

        <header className='space-y-1'>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900'>Storing Tasks</h1>
          <p className='text-sm text-slate-500'>Fill in the form and your task is added to the list below.</p>
        </header>

        <Form />

        <TaskList />

       

      </div>
    </main>
  )
}

export default Home
