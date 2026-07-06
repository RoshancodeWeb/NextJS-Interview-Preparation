import Form from "../_components/Form"

const Home = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#f4f7ff_0%,_#f8fafc_35%,_#eef2ff_100%)] text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 shadow-sm backdrop-blur">
              Task tracker
            </span>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Capture names, tasks, and keep everything neatly organized.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Add a person, assign a task, and keep the list visually clean and easy to scan.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur">
                <p className="text-sm font-medium text-slate-500">Quick entry</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">Fast form flow</p>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur">
                <p className="text-sm font-medium text-slate-500">Clear list</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">Readable cards</p>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur">
                <p className="text-sm font-medium text-slate-500">Local save</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">Keeps your entries</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:p-6">
            <Form />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
