'use client'

import {useRouter} from "next/navigation"
import { useCallback, useEffect, useState } from "react";

export function useFiles(lang:string){

    const router = useRouter();
    const [state,setState] = useState<string[]>();
    useEffect(()=>{
        const files = window.localStorage.getItem("files") || "[]";
        setState(JSON.parse(files))
    },[])
    useEffect(()=>{
        if (!state) return;
        localStorage.setItem("files",JSON.stringify(state));
    },[state]);
    const handleDeleteFile = useCallback((key:string)=>{
        localStorage.removeItem(key);
        const newState = state?.filter(item=>item!=key)
        setState(newState);
    },[state,setState]);
    const handlePush=useCallback((name:string)=>{
        router.push(`${lang}/edit/?name=${name}`,{scroll:false})
    },[router]);
    const handleOnSubmit = useCallback((name:string)=>{
        setState([...state||[],name]);
        localStorage.setItem(name,"{}");
    },[state,setState]);
    return {
        state,
        handleDeleteFile,
        handleOnSubmit,
        handlePush
    }
}