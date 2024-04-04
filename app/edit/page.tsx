'use client'
export const dynamic = "force-static";
import React, { useCallback, useEffect, useState } from "react";
import {CurriculumTemplate, IContentCV, IExperince, IFormation, ILanguage, ISkills} from "@/components";
import styled from "styled-components";
import Form from "form-with-state";
import {redirect} from "next/navigation"
import { PDFViewer } from "@react-pdf/renderer";
import { useSearchParams } from 'next/navigation';
const dateFormat: Intl.DateTimeFormatOptions = {
  month:"long",
  year:"numeric"
}
export default function Curriculum(){
  const searchParams = useSearchParams();
  const name = searchParams.get("name")||"";
  const [profile,setProfile]=useState<IContentCV>();
  useEffect(()=>{
    if (!name) redirect("/not-found")
  },[])
  useEffect(()=>{
    const item =localStorage.getItem(name)
    if (!!item){
      const json:IContentCV= JSON.parse(item,(key,value)=>{
        switch (key) {
          case "dateBorn":
            return new Date(value);
          case "formations":
            return value.map((element:IFormation) => {
              return {
                ...element,
                dateStart:new Date(element.dateStart),
                dateEnd:!!element.dateEnd?new Date(element.dateEnd):undefined,
              }
            });
          case "experince":
            return value.map((element:IExperince)=>{
              return {
                ...element,
                dateStart:new Date(element.dateStart),
                dateEnd:!!element.dateEnd?new Date(element.dateEnd):undefined,
              }
            })
          default:
            return value;
        }
      })
      setProfile(json);
    }
    else{
      redirect("/not-found");
    }
  },[setProfile])
  useEffect(()=>{
    if (!profile) return;
    const item = JSON.stringify(profile);
    localStorage.setItem(name,item);
  },[profile])

  const handleOnSubmitPersonalDetails= useCallback(async(data:any)=>{
    setProfile({...profile,...data});
  },[setProfile])
  const handleOnSubmitFormations= useCallback(async(data:any)=>{
    if (!profile) return;
    const formations: IFormation[]=[
      ...profile.formations||[],
    ];
    formations.push(data)
    setProfile({...profile,formations});
  },[profile,setProfile]);
  const handleRemoveFormation= useCallback(async(index:number)=>{
    const formations =profile?.formations?.filter((item,i)=>i!=index);
    setProfile({...profile,formations});
  },[profile,setProfile]);
  const handleOnSubmitExperience= useCallback(async(data:any)=>{
    if (!profile) return;
    const experince: IExperince[]=[
      ...profile.experince||[],
    ];
    experince.push(data)
    setProfile({...profile,experince});
  },[profile,setProfile]);
  const handleRemoveExperience= useCallback(async(index:number)=>{
    const experince =profile?.experince?.filter((item,i)=>i!=index);
    setProfile({...profile,experince});
  },[profile,setProfile]);
  const handleOnSubmitSkill= useCallback(async(data:any)=>{
    if (!profile) return;
    const skills: ISkills[]=[
      ...profile.skills||[],
    ];
    skills.push(data)
    setProfile({...profile,skills});
  },[profile,setProfile]);
  const handleRemoveSkill= useCallback(async(index:number)=>{
    const skills =profile?.skills?.filter((item,i)=>i!=index);
    setProfile({...profile,skills});
  },[profile,setProfile]);
  const handleOnSubmitLanguage= useCallback(async(data:any)=>{
    if (!profile) return;
    const languages: ILanguage[]=[
      ...profile.languages||[],
    ];
    languages.push(data)
    setProfile({...profile,languages});
  },[profile,setProfile]);
  const handleRemoveLanguage= useCallback(async(index:number)=>{
    const languages =profile?.languages?.filter((item,i)=>i!=index);
    setProfile({...profile,languages});
  },[profile,setProfile]);
  const handleOnSubmitHobbie= useCallback(async(data:any)=>{
    if (!profile) return;
    const hobbies: string[]=[
      ...profile.hobbies||[],
    ];
    hobbies.push(data.hobbie)
    setProfile({...profile,hobbies});
  },[profile,setProfile]);
  const handleRemoveHobbie= useCallback(async(index:number)=>{
    const hobbies =profile?.hobbies?.filter((item,i)=>i!=index);
    setProfile({...profile,hobbies});
  },[profile,setProfile]);
  return (
    <Layaut>
      <div>
        <Form.Container id="personal-details" label='Personal details'>
          <Form initialState={profile||{}} className="personal-details" persistData onSubmit={(data)=>handleOnSubmitPersonalDetails(data)}>
            <Form.TextField name="firstName" label="first name" />
            <Form.TextField name="lastName" label="last name" />
            <Form.TextField name="email" label="E-Mail" />
            <Form.TextField name="phoneNumber" label="telephone" />
            <Form.DatePickerFull name="dateBorn" label="date born"/>
            <Form.FileImage name="photo" type="dataUrl" />
            <Form.TextArea name="bio" label="profile" />
            <Form.Submit name="submit" label="save" />
          </Form>
        </Form.Container>
        <Form.Container id="formations" label='Formations'>
          <>
          {profile?.formations?.map(({title,institution,address,dateStart,dateEnd,description},i)=>(
            <Card key={i}>
              <h4>{title}</h4>
              <p className="sub-title">
                {institution}{address?`, ${address}`:''}
              </p>
              <p>
                {description}
              </p>
              <span>
                {dateStart.toLocaleDateString("en-US",dateFormat)}{dateEnd?` - ${dateEnd.toLocaleDateString("en-US",dateFormat)}`:''}
                <a onClick={()=>handleRemoveFormation(i)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zm0 5h2v9H9zm4 0h2v9h-2z"/></svg>
                </a>
                </span>
            </Card>
            ))}
          </>
          <Form initialState={{}} className="formations" onSubmit={(data)=>handleOnSubmitFormations(data)}>
            <Form.TextField name="title" required  />
            <Form.TextField name="institution" required  />
            <Form.TextField name="address" />
            <Form.DatePicker name="dateStart" label="start" required />
            <Form.DatePicker name="dateEnd" label="end" />
            <Form.TextArea name="description" />
            <Form.Submit name="submit" label="save" />
          </Form>
        </Form.Container>
        <Form.Container id="experince" label='Experince'>
          <>
          {profile?.experince?.map(({jobName,company,address,dateStart,dateEnd,description},i)=>(
            <Card key={i}>
              <h4>{jobName}</h4>
              <p className="sub-title">
                {company}{address?`, ${address}`:''}
              </p>
              {description?.split("\n").map((line,i)=><p key={i}>{line}</p>)}
              <span>
                {dateStart.toLocaleDateString("en-US",dateFormat)}{dateEnd?` - ${dateEnd.toLocaleDateString("en-US",dateFormat)}`:''}
                <a onClick={()=>handleRemoveExperience(i)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zm0 5h2v9H9zm4 0h2v9h-2z"/></svg>
                </a>
                </span>
            </Card>
            ))}
          </>
          <Form initialState={{}} className="experince" onSubmit={(data)=>handleOnSubmitExperience(data)}>
            <Form.TextField name="jobName" label="job name" required  />
            <Form.TextField name="company" required  />
            <Form.TextField name="address" />
            <Form.DatePicker name="dateStart" label="start" required />
            <Form.DatePicker name="dateEnd" label="end" />
            <Form.TextArea name="description" />
            <Form.Submit name="submit" label="save" />
          </Form>
        </Form.Container>
        <Form.Container id="skills" label='Skills'>
          <>
          {profile?.skills?.map(({name,level},i)=>(
            <Card key={i}>
              <h4>{name}</h4>
              <LevelBar $level={level} />
              <span>
                <a onClick={()=>handleRemoveSkill(i)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zm0 5h2v9H9zm4 0h2v9h-2z"/></svg>
                </a>
                </span>
            </Card>
            ))}
          </>
          <Form initialState={{}} className="skills" onSubmit={(data)=>handleOnSubmitSkill(data)}>
            <Form.TextField name="name" label="skill" required  />
            <Form.RangeField min={1} max={5} name="level" required  />
            <Form.Submit name="submit" label="save" />
          </Form>
        </Form.Container>
        <Form.Container id="languages" label='Languages'>
          <>
          {profile?.languages?.map(({name,level},i)=>(
            <Card key={i}>
              <h4>{name}</h4>
              <LevelBar $level={level} />
              <span>
                <a onClick={()=>handleRemoveLanguage(i)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zm0 5h2v9H9zm4 0h2v9h-2z"/></svg>
                </a>
                </span>
            </Card>
            ))}
          </>
          <Form initialState={{}} className="languages" onSubmit={(data)=>handleOnSubmitLanguage(data)}>
            <Form.TextField name="name" label="language" required  />
            <Form.RangeField min={1} max={5} name="level" required  />
            <Form.Submit name="submit" label="save" />
          </Form>
        </Form.Container>
        <Form.Container id="hobbies" label='Hobbies'>
          <>
          {profile?.hobbies?.map((name,i)=>(
            <Card key={i}>
              <h4>{name}</h4>
              <span>
                <a onClick={()=>handleRemoveHobbie(i)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zm0 5h2v9H9zm4 0h2v9h-2z"/></svg>
                </a>
                </span>
            </Card>
            ))}
          </>
          <Form initialState={{}} className="hobbies" onSubmit={(data)=>handleOnSubmitHobbie(data)}>
            <Form.TextField name="hobbie" label="hobbie" required  />
            <Form.Submit name="submit" label="save" />
          </Form>
        </Form.Container>
      </div>
      <PDFViewer style={{height:"100%",width:"100%"}}>
        <CurriculumTemplate profile={profile} />
      </PDFViewer>

    </Layaut>
  )
}
const LevelBar = styled.div<{$level:1|2|3|4|5}>`
  position  : relative;
  border-bottom: .4rem solid #a1a1a1;
  &:after {
    position: absolute;
    bottom: -.4rem;
    content: '';
    z-index: 2;
    width: ${props=>`${props.$level*20}%`};
    border-bottom: .4rem solid #000;
  }
`
const Layaut = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
height: 100vh;
padding: 0 1rem;
& .personal-details{
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
    "photo firstName lastName"
    "photo phoneNumber dateBorn"
    "email email email"
    "bio bio bio"
    "auto auto submit";
}
& .formations{
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
    "title institution institution"
    "address address address"
    "dateStart dateEnd dateEnd"
    "description description description"
    "submit submit submit";
}
& .experince {
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
    "jobName company company"
    "address address address"
    "dateStart dateEnd dateEnd"
    "description description description"
    "submit submit submit";
  }
& .skills {
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
  "name name"
  "level level"
  "auto submit";
}
& .languages {
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
  "name name"
  "level level"
  "auto submit";
}
& .hobbies {
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
  "hobbie hobbie"
  "auto submit";
}
`
const Card = styled.div`
  position: relative;
  margin: 2rem 0;
  padding: 1rem !important;
	box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
  & .sub-title {
    color: #4d4d4d;
  }
  & span {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
  & span a {
    margin-left: 1rem;
    color: red;
    cursor: pointer;
  }
`