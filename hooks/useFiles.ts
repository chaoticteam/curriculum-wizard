'use client'

import {usePathname, useRouter} from "next/navigation"
import { useCallback, useEffect, useState } from "react";

export function useFiles(){
    const router = useRouter();
    const pathname = usePathname()
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
        router.push(`${pathname}/edit/?name=${name}`,{scroll:false})
    },[router]);
    const handleSave = useCallback((nameOld:string,name:string)=>{
        localStorage.removeItem(nameOld);
        const newState = state?.map(item=>item==nameOld?name:item);
        localStorage.setItem(name,"{}");
        setState(newState);
    },[state,setState]);
    const handleNew = useCallback(()=>{
        const regex = /untitled-(\d+)/;
        let value = 1;
        state?.forEach(item=>{
            const result = regex.exec(item)||[];
            const group = parseInt(result[1])+1;
            value = group>value?group:value;
        })
        const name = `untitled-${value}`;
        localStorage.setItem(name,"{}");
        setState([...state||[],name])
    },[state,setState])
    return {
        state,
        handleDeleteFile,
        handleSave,
        handleNew,
        handlePush
    }
}