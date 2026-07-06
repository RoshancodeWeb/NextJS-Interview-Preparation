const hydrationExampleCode = `// Server sends HTML first
<div>
  <button>Count: 0</button>
</div>

// Then React runs in the browser
// and attaches the onClick behavior to this button.`

const mismatchCode = `const [formValues, setFormValues] = useState<FormValue[]>(() => {
  if (typeof window === 'undefined') {
    return []
  }

  const savedFormValues = localStorage.getItem('formValues')

  if (savedFormValues) {
    return JSON.parse(savedFormValues)
  }

  return []
})`

const mismatchFlowCode = `// On server
formValues = []

// On browser first render
formValues = [
  { personName: 'Ali', personTask: 'Build Navbar' }
]

// Problem:
// Server HTML and browser React output are different.`

const overwriteBugCode = `const [formValues, setFormValues] = useState<FormValue[]>([])

useEffect(() => {
  localStorage.setItem('formValues', JSON.stringify(formValues))
}, [formValues])

useEffect(() => {
  const savedFormValues = localStorage.getItem('formValues')

  if (savedFormValues) {
    setFormValues(JSON.parse(savedFormValues))
  }
}, [])`

const solutionCode = `const [formValues, setFormValues] = useState<FormValue[]>([])
const [isStorageLoaded, setIsStorageLoaded] = useState(false)

useEffect(() => {
  const savedFormValues = localStorage.getItem('formValues')

  if (savedFormValues) {
    setFormValues(JSON.parse(savedFormValues))
  }

  setIsStorageLoaded(true)
}, [])

useEffect(() => {
  if (!isStorageLoaded) return

  localStorage.setItem('formValues', JSON.stringify(formValues))
}, [formValues, isStorageLoaded])`

const fullFormCode = `'use client'

import React, { useEffect, useState } from 'react'
import TaskList from './TaskList'

export type FormValue = {
  personName: string
  personTask: string
}

const Form = () => {
  const [formValue, setFormValue] = useState<FormValue>({
    personName: '',
    personTask: '',
  })

  const [formValues, setFormValues] = useState<FormValue[]>([])
  const [isStorageLoaded, setIsStorageLoaded] = useState(false)

  useEffect(() => {
    const savedFormValues = localStorage.getItem('formValues')

    if (savedFormValues) {
      setFormValues(JSON.parse(savedFormValues))
    }

    setIsStorageLoaded(true)
  }, [])

  useEffect(() => {
    if (!isStorageLoaded) return

    localStorage.setItem('formValues', JSON.stringify(formValues))
  }, [formValues, isStorageLoaded])

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setFormValues((prev) => [...prev, formValue])

    setFormValue({
      personName: '',
      personTask: '',
    })
  }

  return (
    <div>
      <form
        className="flex flex-col px-2 gap-2 w-fit"
        onSubmit={handleSubmission}
      >
        <input
          name="personName"
          placeholder="Enter The Name"
          type="text"
          className="border-2 border-black rounded-2 px-2"
          value={formValue.personName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormValue({
              ...formValue,
              personName: e.target.value,
            })
          }}
        />

        <input
          name="personTask"
          placeholder="Enter The Task You Are Assigned"
          type="text"
          className="border-2 border-black rounded-2 px-2"
          value={formValue.personTask}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormValue({
              ...formValue,
              personTask: e.target.value,
            })
          }}
        />

        <input
          type="submit"
          value="Submit"
          className="bg-black text-white w-fit px-2 py-2 hover:bg-black/85 cursor-pointer"
        />
      </form>

      <TaskList formValues={formValues} />
    </div>
  )
}

export default Form`

const timeline = [
  {
    title: '1. Server creates HTML',
    description:
      'Next.js first prepares HTML on the server. This helps the page appear quickly in the browser.',
  },
  {
    title: '2. Browser receives HTML',
    description:
      'The user sees the page, but at this moment the React interactivity may not be fully attached yet.',
  },
  {
    title: '3. React hydrates the page',
    description:
      'React runs in the browser and connects event handlers like onClick, onChange, and onSubmit.',
  },
  {
    title: '4. Page becomes interactive',
    description:
      'After hydration, your inputs, buttons, forms, and state updates work normally.',
  },
]

const solutionSteps = [
  {
    title: 'Start with safe state',
    description:
      'Use an empty array first so the server and browser initial output are the same.',
  },
  {
    title: 'Read localStorage in useEffect',
    description:
      'useEffect only runs in the browser after hydration, so localStorage is safe there.',
  },
  {
    title: 'Use isStorageLoaded',
    description:
      'This prevents saving an empty array before the old localStorage data has been loaded.',
  },
  {
    title: 'Save only after loading',
    description:
      'After localStorage has been read once, then save future changes normally.',
  },
]

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/70 p-5 text-sm leading-7 text-gray-200">
      <code>{code}</code>
    </pre>
  )
}

function InfoCard({
  title,
  description,
  tone = 'purple',
}: {
  title: string
  description: string
  tone?: 'purple' | 'indigo' | 'pink' | 'red' | 'green' | 'yellow'
}) {
  const styles = {
    purple: 'border-purple-400/20 bg-purple-400/10 text-purple-200',
    indigo: 'border-indigo-400/20 bg-indigo-400/10 text-indigo-200',
    pink: 'border-pink-400/20 bg-pink-400/10 text-pink-200',
    red: 'border-red-400/20 bg-red-400/10 text-red-200',
    green: 'border-green-400/20 bg-green-400/10 text-green-200',
    yellow: 'border-yellow-400/20 bg-yellow-400/10 text-yellow-200',
  }

  return (
    <div className={`rounded-3xl border p-6 ${styles[tone]}`}>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-gray-300">{description}</p>
    </div>
  )
}

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description: string
}) {
  return (
    <div className="mb-8">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-300">
        {label}
      </p>

      <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
        {title}
      </h2>

      <p className="mt-4 max-w-4xl text-base leading-8 text-gray-300 md:text-lg">
        {description}
      </p>
    </div>
  )
}

export default function HydrationExplainedPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-5 py-10 text-white md:px-10">
      <section className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl">
          <div className="relative px-6 py-16 text-center md:px-12">
            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />

            <div className="relative z-10">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-purple-300">
                React + Next.js
              </p>

              <h1 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl">
                Hydration Explained
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
                Hydration is the process where React takes the HTML already
                rendered by the server and makes it interactive in the browser.
                Hydration mismatch happens when the server output and the first
                browser output are not the same.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <SectionHeader
            label="Step 1"
            title="What is hydration?"
            description="In Next.js, the server can send HTML to the browser first. This makes the page visible quickly. But plain HTML alone does not know how to handle React state, onClick, onChange, or onSubmit. Hydration is when React runs in the browser and attaches JavaScript behavior to that HTML."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard
              tone="indigo"
              title="Before hydration"
              description="The user can see the HTML content, but React behavior may not be fully attached yet."
            />

            <InfoCard
              tone="pink"
              title="After hydration"
              description="React connects event handlers and state logic. Now inputs, buttons, forms, and interactions work."
            />
          </div>

          <CodeBlock code={hydrationExampleCode} />

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="leading-8 text-gray-300">
              <span className="font-bold text-white">Simple meaning: </span>
              server gives the page structure, then React wakes it up in the
              browser.
            </p>
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <SectionHeader
            label="Step 2"
            title="Hydration timeline"
            description="This is the normal flow when a Next.js page with Client Components loads for the first time."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item, index) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-black/30 p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 text-xl font-black">
                  {index + 1}
                </div>

                <h3 className="text-xl font-bold text-white">{item.title}</h3>

                <p className="mt-3 leading-7 text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <SectionHeader
            label="Step 3"
            title="What is hydration mismatch?"
            description="A hydration mismatch happens when the HTML generated on the server is different from what React generates during the first render in the browser."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard
              tone="red"
              title="Server rendered"
              description="The server may render the UI with empty state because localStorage does not exist on the server."
            />

            <InfoCard
              tone="yellow"
              title="Browser rendered"
              description="The browser may render the UI with saved localStorage data because localStorage exists in the browser."
            />
          </div>

          <CodeBlock code={mismatchFlowCode} />

          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-5">
            <p className="leading-8 text-gray-300">
              <span className="font-bold text-red-200">Problem: </span>
              React expects the first browser render to match the server HTML.
              If they are different, React can show a hydration warning.
            </p>
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <SectionHeader
            label="Step 4"
            title="How localStorage causes this problem"
            description="This example looks useful because it tries to read localStorage immediately inside useState. But it can make the first server render and first browser render different."
          />

          <CodeBlock code={mismatchCode} />

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <InfoCard
              tone="red"
              title="On the server"
              description="window is undefined, so the state becomes an empty array: formValues = []."
            />

            <InfoCard
              tone="yellow"
              title="In the browser"
              description="window exists, localStorage exists, so the state may become saved data immediately."
            />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="leading-8 text-gray-300">
              <span className="font-bold text-white">Why mismatch happens: </span>
              the server first rendered an empty task list, but the browser
              first render may already contain saved tasks.
            </p>
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <SectionHeader
            label="Step 5"
            title="Another bug: localStorage gets overwritten"
            description="This was the second issue in your form. If you save formValues before loading old localStorage data, you can overwrite old data with an empty array."
          />

          <CodeBlock code={overwriteBugCode} />

          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-5">
            <h3 className="text-2xl font-bold text-red-200">
              What happens on refresh?
            </h3>

            <div className="mt-4 space-y-3 leading-7 text-gray-300">
              <p>1. Page refreshes.</p>
              <p>2. formValues starts as an empty array.</p>
              <p>3. First useEffect saves empty array to localStorage.</p>
              <p>4. Old localStorage data is overwritten.</p>
              <p>5. Second useEffect reads the already-empty localStorage.</p>
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-6 md:p-8">
          <SectionHeader
            label="Step 6"
            title="How to solve it properly"
            description="The solution is to make the first server render and first browser render the same. Start with an empty array, read localStorage after hydration inside useEffect, and only save after localStorage has been loaded."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {solutionSteps.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-black/30 p-5"
              >
                <h3 className="text-xl font-bold text-purple-200">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <CodeBlock code={solutionCode} />

          <div className="mt-6 rounded-2xl border border-green-400/20 bg-green-400/10 p-5">
            <p className="leading-8 text-gray-300">
              <span className="font-bold text-green-200">Why this works: </span>
              on the server and on the first browser render, formValues is [].
              So there is no mismatch. After hydration, useEffect reads
              localStorage and updates the UI safely.
            </p>
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <SectionHeader
            label="Step 7"
            title="Full fixed form code"
            description="This is your form with hydration-safe localStorage logic. It loads saved form values after hydration and prevents overwriting saved data on refresh."
          />

          <CodeBlock code={fullFormCode} />
        </section>

        <section className="mt-14 rounded-3xl bg-white p-6 text-black md:p-8">
          <h2 className="text-3xl font-black">Final Simple Summary</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-gray-100 p-5">
              <h3 className="text-xl font-bold">Hydration</h3>
              <p className="mt-3 leading-7 text-gray-700">
                React makes server-rendered HTML interactive in the browser.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-100 p-5">
              <h3 className="text-xl font-bold">Mismatch</h3>
              <p className="mt-3 leading-7 text-gray-700">
                It happens when server HTML and first browser render are
                different.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-100 p-5">
              <h3 className="text-xl font-bold">Solution</h3>
              <p className="mt-3 leading-7 text-gray-700">
                Keep first render same. Read localStorage later inside
                useEffect.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-black p-5 text-white">
            <p className="text-lg leading-8">
              Main rule: do not let browser-only data change the first render.
              Start safe, hydrate first, then read localStorage.
            </p>
          </div>
        </section>
      </section>
    </main>
  )
}