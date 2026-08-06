"use client"
import React, { useState } from 'react'
import { Gender, Role, FormValues, useTaskContext } from '@/app/context/TaskContext'
import { toast } from 'sonner'

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"

const optionClass =
  "cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm font-medium text-slate-600 transition hover:bg-slate-100 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-700 has-[:checked]:shadow-sm"

const addonClass =
  "flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-800"

const defaultValues: FormValues = {
  name: '',
  task: '',
  role: 'user',
  gender: 'none',
  addons: { overtime: false, lunch: false, coffee: false }
}

const Form = () => {

  const [formValues, setFormValues] = useState<FormValues>(defaultValues);

  const { addTask } = useTaskContext();
  const [isSubmitting, setisSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setisSubmitting(true);
      await addTask(formValues);
      toast.success("Task Added Successfully");

      setFormValues(defaultValues);

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }finally{
      setisSubmitting(false);
    }
  }

  return (
    <form className='flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8' onSubmit={handleSubmit}>

      <div className='grid gap-6 sm:grid-cols-2'>
        {/* Name  */}
        <div className='flex flex-col gap-1.5'>
          <label htmlFor="name" className='cursor-pointer text-sm font-medium text-slate-700'>Name</label>
          <input id="name" name="name" placeholder='Enter Your Name' type='text' value={formValues.name} onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))} className={inputClass} />
        </div>

        {/* Role */}
        <div className='flex flex-col gap-1.5'>
          <label htmlFor='role' className='cursor-pointer text-sm font-medium text-slate-700'>Role</label>
          <select id='role' name='role' value={formValues.role} onChange={(e) => setFormValues((prev) => ({ ...prev, role: e.target.value as Role }))} className={`${inputClass} cursor-pointer`}>
            <option value='user'>Normal User</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
      </div>

      {/* Task */}
      <div className='flex flex-col gap-1.5'>
        <label htmlFor='task' className='cursor-pointer text-sm font-medium text-slate-700'>Task</label>
        <input id="task" name='task' placeholder='Enter Your Task' type='text' value={formValues.task} onChange={(e) => setFormValues((prev) => ({ ...prev, task: e.target.value }))} className={inputClass} />
      </div>

      {/* Gender */}
      <div className='flex flex-col gap-2'>
        <h2 className='text-sm font-medium text-slate-700'>Select Gender</h2>
        <div className='grid grid-cols-3 gap-2'>
          <label htmlFor='male' className={optionClass}>
            <input type="radio" name="gender" id="male" checked={formValues.gender === "male"} value="male" onChange={(e) => setFormValues((prev) => ({ ...prev, gender: e.target.value as Gender }))} className='sr-only' />
            Male
          </label>
          <label htmlFor='female' className={optionClass}>
            <input type="radio" name="gender" id="female" checked={formValues.gender == "female"} value="female" onChange={(e) => setFormValues((prev) => ({ ...prev, gender: e.target.value as Gender }))} className='sr-only' />
            Female
          </label>
          <label htmlFor='none' className={optionClass}>
            <input type="radio" name="gender" id="none" value="none" checked={formValues.gender == "none"} onChange={(e) => setFormValues((prev) => ({ ...prev, gender: e.target.value as Gender }))} className='sr-only' />
            None
          </label>
        </div>
      </div>

      {/* Addons */}
      <div className='flex flex-col gap-2'>
        <h2 className='text-sm font-medium text-slate-700'>Select the addons please</h2>
        <div className='grid gap-2 sm:grid-cols-3'>
          <label htmlFor='overtime' className={addonClass}>
            <input id='overtime' type='checkbox' name="overtime" checked={formValues.addons.overtime} onChange={(e) => setFormValues((prev) => ({ ...prev, addons: { ...prev.addons, overtime: e.target.checked } }))} className='size-4 accent-indigo-600' />
            Overtime
          </label>
          <label htmlFor='lunch' className={addonClass}>
            <input id='lunch' type='checkbox' name="lunch" checked={formValues.addons.lunch} onChange={(e) => setFormValues((prev) => ({ ...prev, addons: { ...prev.addons, lunch: e.target.checked } }))} className='size-4 accent-indigo-600' />
            Lunch
          </label>
          <label htmlFor='coffee' className={addonClass}>
            <input id='coffee' type='checkbox' name="coffee" checked={formValues.addons.coffee} onChange={(e) => setFormValues((prev) => ({ ...prev, addons: { ...prev.addons, coffee: e.target.checked } }))} className='size-4 accent-indigo-600' />
            Coffee
          </label>
        </div>
      </div>

      <button type='submit' disabled={isSubmitting} className='w-full rounded-lg bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[.99] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
        {isSubmitting ? 'Adding…' : 'Add Task'}
      </button>

    </form>
  )
}

export default Form
