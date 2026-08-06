"use client"
import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner';

export type Gender = "male" | "female" | "none";

export type Role = "admin" | "user";

export interface FormValues {
    name: string,
    task: string,
    role: Role,
    gender: Gender,
    addons: {
        overtime: boolean,
        lunch: boolean,
        coffee: boolean
    }
}

interface Tasks extends FormValues{
    _id:string,
    createdAt:string,
    updatedAt:string
}

interface TaskContextType {
    taskList: Tasks[],
    addTask: (task: FormValues) => Promise<void>,
    deleteTask:(taskId:string)=>Promise<string>,
    isLoading:boolean
}

interface ApiError{
    message:string,
    errors?:string[],
    success:false
}



const TaskContext = createContext<TaskContextType | null>(null);


const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [taskList, setTaskList] = useState<Tasks[]>([]);
    const [isLoading,setIsLoading]=useState(true);

    const loadAllTasks=useCallback(async()=>{

        try {
            const tasks=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/tasks/`);
            setTaskList(tasks.data.data);

        } catch (error) {
            if(axios.isAxiosError<ApiError>(error)){
                if(error?.response)
                  {
                    const data=error?.response?.data;
                    toast.error(data.message);
                    return;
                  }


               toast.error("Cannot reach the server. Is it running?");
               return;
            }

            toast.error(error instanceof Error ? error?.message : "Could Not Load Tasks");
            
        }finally{
            setIsLoading(false);
        }
        
    },[]);
    
    useEffect(() => {

       


        loadAllTasks();
    
     
    }, []);

    const deleteTask=useCallback(async(taskId:string)=>{
        try {
            const response=await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/tasks/${taskId}`);
            setTaskList((prev) => prev.filter((task) => task._id !== taskId));
            return response?.data?.message;
        } catch (error) {
            if(axios.isAxiosError<ApiError>(error)){
                if(error?.response){
                    const data=error?.response?.data;
                    throw new Error(data.message);
                }

                throw new Error("Cannot reach the server. Is it running?");

            }

            throw error;
            
        }
    },[]);
    

    const addTask = useCallback(async (task: FormValues) => {

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/tasks/`, task);

            setTaskList((prev => [...prev, response.data.data]));

        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                if (error.response) {
                    const data=error.response.data;
                    console.log(error.response);                                                   //No Need Of It But You Can Add It
                    throw new Error(data?.errors?.length ? data.errors.join(", "):data?.message ?? "Something Went Wrong")
                }


                // The request went out but nothing came back
                throw new Error("Cannot reach the server. Is it running?");


            }

            // Not an axios error — a bug in our own code
            throw error;
        }


    }, []);

    const value = useMemo(() => ({ taskList,addTask,deleteTask,isLoading }), [taskList, addTask,isLoading,deleteTask]);

    return (
        <TaskContext value={value}>
            {children}
        </TaskContext>
    )
}

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("Task Context Must be used with in task provider");
    }
    return context;

}


export default TaskProvider
