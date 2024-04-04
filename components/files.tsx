'use client'
import styled from "styled-components";
import Form from "form-with-state";
import { useFiles } from "@/hooks/useFiles";
import { ITranslades } from "@/app/[lang]/dictionaries";
import { Locale } from "@/app/[lang]/i18n-config";

interface iprops{
    dict:ITranslades;
    lang:Locale;
}
export function Files({dict,lang}:iprops){
    const {state,handleDeleteFile,handleOnSubmit,handlePush} = useFiles(lang);
    return (
        <Container>
            <h1 style={{textTransform: "capitalize"}}>{dict.page.label}</h1>
        <div className="body">
            <Card style={{cursor:"default"}}>
                <div>
                    <Form initialState={{}} onSubmit={(data)=>handleOnSubmit(data.cvName)} >
                        <Form.TextField name="cvName" label={dict.page.form.textfield} required />
                        <Form.Submit name="send" label={dict.page.form.submit} />
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