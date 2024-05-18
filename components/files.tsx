'use client'
import styled from "styled-components";
import Form from "form-with-state";
import { useFiles } from "@/hooks/useFiles";
import { ITranslades } from "@/app/[lang]/dictionaries";
import { useState } from "react";

interface iprops{
    dict:ITranslades;
}
export function Files({dict}:iprops){
    const {state,handleNew,handleDeleteFile,handlePush,handleSave,handleDuplicate} = useFiles();
    return (
        <Container>
            <h1 style={{textTransform: "capitalize"}}>{dict.page.label}</h1>
        <div className="body">
            <Card onClick={handleNew}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6M4 6V5a1 1 0 0 1 1-1h1m5 0h2m5 0h1a1 1 0 0 1 1 1v1m0 5v2m0 5v1a1 1 0 0 1-1 1h-1m-5 0h-2m-5 0H5a1 1 0 0 1-1-1v-1m0-5v-2m0-5"/></svg>
                </div>
            </Card>
        {state?.map((item,i)=>{
            return (
                <Card key={i}>
                    <CardContent dict={dict} fileName={item} handleDeleteFile={handleDeleteFile} handlePush={handlePush} handleSave={handleSave} handleDuplicate={handleDuplicate} />
                </Card>)
        })}
        </div>
        </Container>
    )
}
interface CardContentProps{
    fileName:string;
    dict:ITranslades;
    handleDeleteFile:(key:string)=>void;
    handleSave:(nameOld:string,name:string)=>void
    handlePush:(name:string)=>void;
    handleDuplicate:(name:string)=>void;
}
const CardContent:React.FC<CardContentProps> = ({fileName,dict,handleDeleteFile,handlePush,handleSave,handleDuplicate})=>{
    const [status,setStatus] = useState<"show"|"edit">("show");
    return (<>
        <div onClick={()=>status=="show"&&handlePush(fileName)}>
        {status=="show"?fileName:<Form initialState={{cvName:fileName}} onSubmit={(data)=>{handleSave(fileName,data.cvName);setStatus("show")}} >
            <Form.TextField name="cvName" label={dict.page.form.textfield} required />
            <Form.Submit name="send" label={dict.page.form.submit} />
        </Form>}
        </div>
        <Span style={{display:status=="edit"?"none":"initial"}} className="edit" onClick={(e)=>setStatus("edit")}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/></svg></Span>
        <Span style={{display:status=="edit"?"none":"initial"}} className="duplicate" onClick={()=>handleDuplicate(fileName)}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M10.5 3a.75.75 0 0 1 .75.75v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0v-1h-1a.75.75 0 0 1 0-1.5h1v-1A.75.75 0 0 1 10.5 3"/><path fill="currentColor" d="M6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25v-7.5C5 .784 5.784 0 6.75 0M6.5 1.75v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25h-7.5a.25.25 0 0 0-.25.25"/><path fill="currentColor" d="M1.75 5A1.75 1.75 0 0 0 0 6.75v7.5C0 15.216.784 16 1.75 16h7.5A1.75 1.75 0 0 0 11 14.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.25.25 0 0 1-.25.25h-7.5a.25.25 0 0 1-.25-.25v-7.5a.25.25 0 0 1 .25-.25h1.5a.75.75 0 0 0 0-1.5z"/></svg></Span>
        <Span className="delete" onClick={(e)=>handleDeleteFile(fileName)}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" ><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg></Span>
    </>)
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
border-radius: 1rem;
transition: 0.3s ease;
height: 1.5rem;
width: 1.5rem;
padding: .25rem;

&.delete {
    right: 1.5rem;
    color: red;
}
&.duplicate {
    right: 3rem;
    color: yellow;
}
&.edit {
    right: 4.5rem;
    color: #00ff6a;
}

&:hover {
    transform: scale(150%);
}
`;