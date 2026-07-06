"use client"
import React from 'react'
import TaskList from './TaskList'
import { useFormContext } from '@/app/context/FormContext'




const Form = () => {
    
    const {formValue,setFormValue,addFormValue,clearFormValue}=useFormContext();

    const handleSubmission = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        addFormValue(formValue);
        clearFormValue();
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">Add task</p>
                <h2 className="text-2xl font-semibold text-slate-950">Create a new entry</h2>
                <p className="text-sm leading-6 text-slate-500">Use the fields below to add a person and the task they need to complete.</p>
            </div>

            <form className='space-y-4' onSubmit={handleSubmission}>
                <div className="space-y-2">
                    <label htmlFor="personName" className="text-sm font-medium text-slate-700">Person name</label>
                    <input id='personName' name='personName' placeholder='Enter the name' type='text' className='w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100' value={formValue.personName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormValue({ ...formValue, personName: e.target.value }) }} />
                </div>
                <div className="space-y-2">
                    <label htmlFor="personTask" className="text-sm font-medium text-slate-700">Task description</label>
                    <input id='personTask' name='personTask' placeholder='Enter the task you are assigned' type='text' className='w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100' value={formValue.personTask} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormValue({ ...formValue, personTask: e.target.value }) }} />
                </div>
                <input type='submit' value="Add entry" className='inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99]' />
            </form>
            <TaskList />
        </div>

    )
}

export default Form
