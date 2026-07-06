"use client"

import { createContext, useContext, useEffect, useState } from "react"


type FormValue = {
    personName: string
    personTask: string
}

type FormContextType = {
    formValue: FormValue,
    formValues: FormValue[],
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>,
    addFormValue: (value: FormValue) => void,
    clearFormValue: () => void
}


const FormContext = createContext<FormContextType | null>(null);

export const FormContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [formValue, setFormValue] = useState<FormValue>({ personName: '', personTask: '' });
    const [isStorageLoaded, setStorageLoaded] = useState(false);
    const [formValues, setFormValues] = useState<FormValue[]>([]);

    useEffect(() => {
        const savedFormValues = localStorage.getItem("formValues");
        if (savedFormValues) {
            setFormValues(JSON.parse(savedFormValues));
        }
        setStorageLoaded(true);
    }, []);

    const addFormValue = (value: FormValue) => {
        setFormValues((prev) => [...prev, value]);
    }

    const clearFormValue=()=>{
        setFormValue({personName:'',personTask:''});
    }

    useEffect(()=>{
      if(isStorageLoaded){
        localStorage.setItem("formValues",JSON.stringify(formValues));
      }

    },[formValues,isStorageLoaded]);


    return <FormContext.Provider value={{formValue,formValues,setFormValue,addFormValue,clearFormValue}}>
        {children}
    </FormContext.Provider>
}

export const useFormContext=()=>{
    const context=useContext(FormContext);

    if (!context) {
    throw new Error('useFormContext must be used inside FormProvider')
    }

    return context;
}