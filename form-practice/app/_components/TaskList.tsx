"use client"
import { Gender, useTaskContext } from '@/app/context/TaskContext'
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

type GenderFilter = Gender | "";

const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-white py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"

const TaskList = () => {

  const { taskList,isLoading,deleteTask } = useTaskContext();

  const [searchValue, setSearchValue] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("");

  // Holds the _id currently being deleted — not a boolean, so only that
  // one row shows a spinner instead of every row at once.
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isFiltering = searchValue.trim() !== "" || genderFilter !== "";

  const filteredArray = useMemo(
    () => taskList.filter((task) => {
      const matchesName = task.name.toLowerCase().trim()
        .includes(searchValue.toLowerCase().trim());
      const matchesGender = genderFilter === "" || task.gender === genderFilter;
      return matchesName && matchesGender;
    }),
    [taskList, searchValue, genderFilter]
  );

  const clearFilters = () => {
    setSearchValue("");
    setGenderFilter("");
  }


  const handleDeletion=async(taskId:string)=>{
     setDeletingId(taskId);
     try {
         const message=await deleteTask(taskId);
         toast.success(message);
     } catch (error) {
        toast.error(error instanceof Error ? error?.message :"Could Not Delete The Task");
     } finally {
        setDeletingId(null);
     }
  }

  return (
    <section className='flex flex-col gap-4'>

      {/* Heading + count */}
      <div className='flex items-center justify-between gap-3'>
        <h2 className='text-lg font-semibold text-slate-900'>Saved Tasks</h2>
        <span className='rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-slate-600'>
          {isLoading
            ? '—'
            : isFiltering
              ? `${filteredArray.length} of ${taskList.length}`
              : taskList.length}
        </span>
      </div>

      {/* Filter bar */}
      <div className='flex flex-col gap-2 sm:flex-row'>

        {/* Search by name */}
        <div className='relative flex-1'>
          <label htmlFor='search' className='sr-only'>Search by name</label>
          <svg
            className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400'
            viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
            strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'
          >
            <circle cx='11' cy='11' r='7' />
            <path d='m21 21-4.3-4.3' />
          </svg>
          <input
            id='search'
            type='text'
            placeholder='Search by name…'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={isLoading}
            className={`${fieldClass} pl-9 pr-3 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
          />
        </div>

        {/* Filter by gender */}
        <div className='relative sm:w-44'>
          <label htmlFor='genderFilter' className='sr-only'>Filter by gender</label>
          <select
            id='genderFilter'
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value as GenderFilter)}
            disabled={isLoading}
            className={`${fieldClass} cursor-pointer appearance-none pl-3 pr-9 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
          >
            <option value=''>All genders</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='none'>None</option>
          </select>
          <svg
            className='pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400'
            viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
            strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'
          >
            <path d='m6 9 6 6 6-6' />
          </svg>
        </div>

        {isFiltering && (
          <button
            type='button'
            onClick={clearFilters}
            className='shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900'
          >
            Clear
          </button>
        )}
      </div>

      {/* Results */}
      {isLoading ? (
        // Skeleton cards — same shape as a real row, so the layout doesn't jump
        <ul className='flex animate-pulse flex-col gap-3' aria-busy='true' aria-label='Loading tasks'>
          {[0, 1, 2].map((i) => (
            <li key={i} className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
              <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0 flex-1 space-y-2'>
                  <div className='h-4 w-2/5 rounded bg-slate-200' />
                  <div className='h-3 w-1/4 rounded bg-slate-100' />
                </div>
                <div className='flex shrink-0 items-center gap-2'>
                  <div className='h-6 w-14 rounded-full bg-slate-100' />
                  <div className='h-6 w-14 rounded-full bg-slate-100' />
                  <div className='size-7 rounded-lg bg-slate-100' />
                </div>
              </div>
              <div className='mt-3 flex gap-2'>
                <div className='h-6 w-16 rounded-md bg-slate-100' />
                <div className='h-6 w-16 rounded-md bg-slate-100' />
              </div>
            </li>
          ))}
        </ul>
      ) : filteredArray.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center'>
          {taskList.length === 0 ? (
            <p className='text-sm text-slate-500'>No tasks yet — submit the form to add your first one.</p>
          ) : (
            <>
              <p className='text-sm font-medium text-slate-700'>No tasks match your filters.</p>
              <button
                type='button'
                onClick={clearFilters}
                className='mt-2 text-sm font-semibold text-indigo-600 underline-offset-2 transition hover:underline'
              >
                Clear filters
              </button>
            </>
          )}
        </div>
      ) : (
        <ul className='flex flex-col gap-3'>
          {filteredArray.map((task) => (
            <li key={task._id} className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md ${deletingId === task._id ? 'pointer-events-none opacity-50' : ''}`}>
              <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                  <p className='truncate font-semibold text-slate-900'>{task.task || 'Untitled task'}</p>
                  <p className='text-sm text-slate-500'>by {task.name || 'Anonymous'}</p>
                </div>
                <div className='flex shrink-0 items-center gap-2'>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${task.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {task.role}
                  </span>
                  <span className='rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium capitalize text-indigo-700'>
                    {task.gender}
                  </span>

                  {/* Delete */}
                  <button
                    type='button'
                    aria-label={`Delete task: ${task.task || 'Untitled task'}`}
                    disabled={deletingId === task._id}
                    className='rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400'
                    onClick={()=>{handleDeletion(task._id)}}
                  >
                    {deletingId === task._id ? (
                      <svg
                        className='size-4 animate-spin' viewBox='0 0 24 24' fill='none'
                        stroke='currentColor' strokeWidth='2' strokeLinecap='round' aria-hidden='true'
                      >
                        <circle cx='12' cy='12' r='9' className='opacity-25' />
                        <path d='M21 12a9 9 0 0 0-9-9' />
                      </svg>
                    ) : (
                      <svg
                        className='size-4' viewBox='0 0 24 24' fill='none' stroke='currentColor'
                        strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'
                      >
                        <path d='M3 6h18' />
                        <path d='M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2' />
                        <path d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6' />
                        <path d='M10 11v6' />
                        <path d='M14 11v6' />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className='mt-3 flex flex-wrap gap-2'>
                {Object.entries(task.addons)
                  .filter(([, isOn]) => isOn)
                  .map(([addon]) => (
                    <span key={addon} className='rounded-md bg-slate-100 px-2 py-1 text-xs capitalize text-slate-600'>
                      {addon}
                    </span>
                  ))}
                {!Object.values(task.addons).some(Boolean) && (
                  <span className='text-xs italic text-slate-400'>No addons</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default TaskList
