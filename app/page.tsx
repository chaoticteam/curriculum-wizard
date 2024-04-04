'use client'
export const dynamic = "force-static";
import Form from "form-with-state";
import {useRouter} from "next/navigation"
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

export default function Page(){
    const router = useRouter();
    // const getStateDefaultValue = useCallback(()=>{
    //     if (typeof window != undefined){
    //         const files = window.localStorage.getItem("files") || "[]";
    //         const filesArray:[] = JSON.parse(files);
    //         return filesArray;
    //     }
    //     return []
    // },[])
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
        router.push(`/edit/?name=${name}`,{scroll:false})
    },[router]);
    const handleOnSubmit = useCallback((name:string)=>{
        setState([...state||[],name]);
        localStorage.setItem(name,"{}");
        handlePush(name)
    },[state,setState,handlePush]);
    return (
        <Container>
            <h1>Curriculum Wizard</h1>
            <div className="body">
                <Card style={{cursor:"default"}}>
                    <div>
                        <Form initialState={{}} onSubmit={(data)=>handleOnSubmit(data.cvName)} >
                            <Form.TextField name="cvName" label="name" required />
                            <Form.Submit name="send" label="new file" />
                        </Form>
                    </div>
                </Card>
            {state?.map((item,i)=>(
                <Card key={i}>
                    <div onClick={()=>handlePush(item)}>
                        {item}
                    </div>
                    <Span onClick={(e)=>handleDeleteFile(item)}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" ><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg></Span>
                </Card>))}
            </div>
        </Container>
    )
}

const Container = styled.div`
& .body {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
`;
const Card = styled.div`
position:relative;
cursor: pointer;
& form {
    display: grid;
    grid-template-areas:
    "cvName"
    "send";
    grid-gap: 1rem;
}
& div{
    display:flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 300px;
    margin: 1rem;
    padding: 1rem;
    box-shadow: rgba(100, 100, 111, 0.5) 0 .5rem 1rem 0;
    text-transform: capitalize;
}
`;
const Span = styled.span`
position: absolute;
top: 1.5rem;
right: 1.5rem;
color: red;
border-radius: 1rem;
transition: 0.3s ease;
height: 1.5rem;
width: 1.5rem;
padding: .25rem;

&:hover {
    transform: scale(150%);
}
`;