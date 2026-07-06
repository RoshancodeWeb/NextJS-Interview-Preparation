"use client"
import { useFormContext } from "@/app/context/FormContext"



const TaskList = () => {
  const {formValues}=useFormContext();
  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Task list</p>
          <h3 className="text-xl font-semibold text-slate-950">Saved entries</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {formValues.length} item{formValues.length === 1 ? "" : "s"}
        </span>
      </div>

      {formValues.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-slate-500">
          No tasks yet. Add the first one above to see it appear here.
        </div>
      ) : (
        <div className="space-y-3">
          {formValues.map((value,key)=><div key={key} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Task {key + 1}</p>
            <div className="mt-2 space-y-1">
              <p className="text-base font-semibold text-slate-950">{value.personName}</p>
              <p className="text-sm leading-6 text-slate-600">{value.personTask}</p>
            </div>
          </div>)}
        </div>
      )}
    </div>
  )
}

export default TaskList
