"use client"
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type Gender= "male" | "female" | "none";

export type Role= "admin" | "user";

export interface FormValues {
    name:string,
    task:string,
    role:Role,
    gender:Gender,
    addons:{
       overtime:boolean,
       lunch:boolean,
       coffee:boolean
    }
}

interface TaskContextType {
    taskList:FormValues[],
    addTask:(task:FormValues)=>void
}

const TaskContext=createContext<TaskContextType| null>(null);


const TaskProvider = ({children}:{children:React.ReactNode}) => {
  const [taskList, setTaskList] = useState<FormValues[]>([]);

  const addTask=useCallback((task:FormValues)=>{

    setTaskList((prev=>[...prev,task]));

  },[]);

  const value=useMemo(()=>({taskList,addTask}),[taskList,addTask]);

  return (
    <TaskContext value={value}>
        {children}
    </TaskContext>
  )
}

export const useTaskContext=()=>{
    const context=useContext(TaskContext);
    if(!context){
        throw new Error("Task Context Must be used with in task provider");
    }
    return context;

}


export default TaskProvider
