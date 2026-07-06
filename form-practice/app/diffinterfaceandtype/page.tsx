const examples = [
  {
    title: '1. Object Shape',
    description:
      'Both type and interface can describe the structure of an object. This is the most common use case.',
    typeCode: `type FormValue = {
  personName: string
  personTask: string
}`,
    interfaceCode: `interface FormValue {
  personName: string
  personTask: string
}`,
    result:
      'For simple objects like form values, user data, product data, etc., both are almost the same.',
  },
  {
    title: '2. React Props',
    description:
      'Both can be used for React component props. Many developers use type for props, but interface is also correct.',
    typeCode: `type ButtonProps = {
  text: string
  disabled: boolean
}

const Button = ({ text, disabled }: ButtonProps) => {
  return <button disabled={disabled}>{text}</button>
}`,
    interfaceCode: `interface ButtonProps {
  text: string
  disabled: boolean
}

const Button = ({ text, disabled }: ButtonProps) => {
  return <button disabled={disabled}>{text}</button>
}`,
    result:
      'Both are valid. In React projects, type is very common for props because it also works nicely with unions.',
  },
  {
    title: '3. Union Types',
    description:
      'This is where type becomes more powerful. A union means a value can be one of multiple allowed values.',
    typeCode: `type Status = 'pending' | 'completed' | 'failed'

const status: Status = 'pending'`,
    interfaceCode: `// Interface cannot directly create this:
interface Status {
  // Not suitable for:
  // 'pending' | 'completed' | 'failed'
}`,
    result:
      'Use type when you need fixed values like status, role, button variant, theme, size, etc.',
  },
  {
    title: '4. Button Variants',
    description:
      'This is very common in real React projects. You can restrict a button to only allowed design variants.',
    typeCode: `type ButtonVariant = 'primary' | 'secondary' | 'danger'

type ButtonProps = {
  variant: ButtonVariant
  text: string
}

const Button = ({ variant, text }: ButtonProps) => {
  return <button>{text}</button>
}`,
    interfaceCode: `interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger'
  text: string
}`,
    result:
      'Interface can use union inside a property, but type is better when the union itself needs a name.',
  },
  {
    title: '5. Arrays',
    description:
      'Both can describe objects that contain arrays. But type can also directly describe an array type.',
    typeCode: `type FormValue = {
  personName: string
  personTask: string
}

type FormValues = FormValue[]`,
    interfaceCode: `interface FormValue {
  personName: string
  personTask: string
}

// You usually do this:
const formValues: FormValue[] = []`,
    result:
      'For useState arrays, both are okay. Example: useState<FormValue[]>([])',
  },
  {
    title: '6. Function Types',
    description:
      'Both can describe a function, but type is usually cleaner for function types.',
    typeCode: `type AddFunction = (a: number, b: number) => number

const add: AddFunction = (a, b) => {
  return a + b
}`,
    interfaceCode: `interface AddFunction {
  (a: number, b: number): number
}

const add: AddFunction = (a, b) => {
  return a + b
}`,
    result:
      'For function types, type is usually easier to read.',
  },
  {
    title: '7. Extending / Reusing',
    description:
      'Both can extend another object shape. Interface uses extends. Type uses intersection &.',
    typeCode: `type Person = {
  name: string
}

type Employee = Person & {
  salary: number
}`,
    interfaceCode: `interface Person {
  name: string
}

interface Employee extends Person {
  salary: number
}`,
    result:
      'Interface feels cleaner when you are building object inheritance-like structures.',
  },
  {
    title: '8. Declaration Merging',
    description:
      'Interface has one special ability: it can be declared multiple times and TypeScript will merge it.',
    typeCode: `type User = {
  name: string
}

// Error:
// type User = {
//   age: number
// }`,
    interfaceCode: `interface User {
  name: string
}

interface User {
  age: number
}

// Final User becomes:
// {
//   name: string
//   age: number
// }`,
    result:
      'This is useful when extending library types or global types. Type cannot do this.',
  },
  {
    title: '9. Tuples',
    description:
      'A tuple is an array with a fixed number of items and fixed positions. Type is better here.',
    typeCode: `type Coordinates = [number, number]

const location: Coordinates = [24.86, 67.01]`,
    interfaceCode: `// Interface is not normally used for tuples.`,
    result:
      'Use type for tuples.',
  },
  {
    title: '10. Direct useState Typing',
    description:
      'You can define the type directly inside useState without creating a separate type name.',
    typeCode: `const [formValue, setFormValue] = useState<{
  personName: string
  personTask: string
}>({
  personName: '',
  personTask: '',
})`,
    interfaceCode: `interface FormValue {
  personName: string
  personTask: string
}

const [formValue, setFormValue] = useState<FormValue>({
  personName: '',
  personTask: '',
})`,
    result:
      'Direct typing works, but separate type/interface is cleaner when the shape is reused.',
  },
]

const comparisonRows = [
  {
    feature: 'Object shape',
    typeValue: 'Yes',
    interfaceValue: 'Yes',
  },
  {
    feature: 'React props',
    typeValue: 'Yes',
    interfaceValue: 'Yes',
  },
  {
    feature: 'React state',
    typeValue: 'Yes',
    interfaceValue: 'Yes',
  },
  {
    feature: 'Union values',
    typeValue: 'Best choice',
    interfaceValue: 'Not directly',
  },
  {
    feature: 'Function type',
    typeValue: 'Cleaner',
    interfaceValue: 'Possible',
  },
  {
    feature: 'Tuples',
    typeValue: 'Best choice',
    interfaceValue: 'Not preferred',
  },
  {
    feature: 'Extend object',
    typeValue: 'Using &',
    interfaceValue: 'Using extends',
  },
  {
    feature: 'Declaration merging',
    typeValue: 'No',
    interfaceValue: 'Yes',
  },
  {
    feature: 'Reopening same name',
    typeValue: 'No',
    interfaceValue: 'Yes',
  },
]

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/50 p-5 text-sm leading-7 text-gray-200 shadow-inner">
      <code>{code}</code>
    </pre>
  )
}

export default function TypeVsInterfacePage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-5 py-10 text-white md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-14 rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-12 text-center shadow-2xl md:px-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-purple-300">
            TypeScript Guide
          </p>

          <h1 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl">
            type vs interface
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Both <span className="font-semibold text-white">type</span> and{' '}
            <span className="font-semibold text-white">interface</span> are used
            to describe the shape of data in TypeScript. They look similar, but
            they are useful in different situations.
          </p>
        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-indigo-400/20 bg-indigo-400/10 p-6">
            <h2 className="text-2xl font-bold text-indigo-200">type</h2>
            <p className="mt-3 leading-7 text-gray-300">
              A <span className="font-semibold text-white">type</span> is more
              flexible. It can describe objects, unions, arrays, functions,
              tuples, and combinations of multiple types.
            </p>
          </div>

          <div className="rounded-3xl border border-pink-400/20 bg-pink-400/10 p-6">
            <h2 className="text-2xl font-bold text-pink-200">interface</h2>
            <p className="mt-3 leading-7 text-gray-300">
              An <span className="font-semibold text-white">interface</span> is
              mainly used for object shapes. It is very clean for objects,
              classes, API data, props, and extendable structures.
            </p>
          </div>

          <div className="rounded-3xl border border-purple-400/20 bg-purple-400/10 p-6">
            <h2 className="text-2xl font-bold text-purple-200">Simple Rule</h2>
            <p className="mt-3 leading-7 text-gray-300">
              Use <span className="font-semibold text-white">interface</span>{' '}
              for object structures. Use{' '}
              <span className="font-semibold text-white">type</span> when you
              need more flexibility like unions, tuples, or function types.
            </p>
          </div>
        </div>

        <div className="mb-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="mb-6 text-3xl font-bold">
            Quick Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="py-4 pr-4">Feature</th>
                  <th className="py-4 pr-4">type</th>
                  <th className="py-4 pr-4">interface</th>
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-white/10">
                    <td className="py-4 pr-4 font-medium text-white">
                      {row.feature}
                    </td>
                    <td className="py-4 pr-4 text-indigo-200">
                      {row.typeValue}
                    </td>
                    <td className="py-4 pr-4 text-pink-200">
                      {row.interfaceValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          {examples.map((item) => (
            <section
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl md:p-8"
            >
              <h2 className="text-3xl font-bold">{item.title}</h2>

              <p className="mt-3 max-w-4xl leading-8 text-gray-300">
                {item.description}
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-indigo-400/20 bg-indigo-400/5 p-5">
                  <h3 className="text-xl font-bold text-indigo-200">
                    Using type
                  </h3>
                  <CodeBlock code={item.typeCode} />
                </div>

                <div className="rounded-3xl border border-pink-400/20 bg-pink-400/5 p-5">
                  <h3 className="text-xl font-bold text-pink-200">
                    Using interface
                  </h3>
                  <CodeBlock code={item.interfaceCode} />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="leading-8 text-gray-300">
                  <span className="font-bold text-white">Result: </span>
                  {item.result}
                </p>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-6 md:p-8">
          <h2 className="text-3xl font-bold">
            Best Choice for Your Form
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-gray-300">
            In your form example, you are storing an object with two string
            values: <span className="font-semibold text-white">personName</span>{' '}
            and <span className="font-semibold text-white">personTask</span>.
            Both <span className="font-semibold text-white">type</span> and{' '}
            <span className="font-semibold text-white">interface</span> are
            correct here.
          </p>

          <CodeBlock
            code={`type FormValue = {
  personName: string
  personTask: string
}

const [formValue, setFormValue] = useState<FormValue>({
  personName: '',
  personTask: '',
})

const [formValues, setFormValues] = useState<FormValue[]>([])`}
          />

          <p className="mt-5 leading-8 text-gray-300">
            I would personally use{' '}
            <span className="font-semibold text-white">type</span> here because
            React projects often need unions later, like form status, button
            variants, roles, themes, and sizes.
          </p>
        </section>

        <section className="mt-12 rounded-3xl bg-white p-6 text-black md:p-8">
          <h2 className="text-3xl font-black">
            Final Decision Guide
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-gray-100 p-5">
              <h3 className="text-xl font-bold">Use type when:</h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>You need union values like 'pending' | 'done'.</li>
                <li>You need button variants like 'primary' | 'danger'.</li>
                <li>You need function types.</li>
                <li>You need tuples like [number, number].</li>
                <li>You want a flexible React props/state type.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-gray-100 p-5">
              <h3 className="text-xl font-bold">Use interface when:</h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>You are only describing an object shape.</li>
                <li>You want to extend object structures using extends.</li>
                <li>You are working with classes.</li>
                <li>You need declaration merging.</li>
                <li>You are defining large object models or API objects.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-black p-5 text-white">
            <p className="text-lg leading-8">
              Beginner-friendly rule: if you are confused, use{' '}
              <span className="font-bold text-purple-300">type</span> in React
              components. Use{' '}
              <span className="font-bold text-pink-300">interface</span> when
              you specifically want clean object extension or declaration
              merging.
            </p>
          </div>
        </section>
      </section>
    </main>
  )
}