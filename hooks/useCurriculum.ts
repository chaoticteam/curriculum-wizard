'use client'
import { IContentCV, IExperince, IFormation, ILanguage, ISkills } from "@/components";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";


export function useCurriculum(){
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
  const handleOnSubmitSocialMedia= useCallback(async(data:any)=>{
    setProfile({...profile,socialMedia:data});
  },[profile,setProfile])
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
  const handleOnSubmitDocumentSettings = useCallback((data:any)=>{
    if (!profile) return;
    setProfile({...profile,document:data})
  },[profile,setProfile])

  return {
    profile,
    handleOnSubmitPersonalDetails,
    handleOnSubmitSocialMedia,
    handleOnSubmitFormations,
    handleRemoveFormation,
    handleOnSubmitExperience,
    handleRemoveExperience,
    handleOnSubmitSkill,
    handleRemoveSkill,
    handleOnSubmitLanguage,
    handleRemoveLanguage,
    handleOnSubmitHobbie,
    handleRemoveHobbie,
    handleOnSubmitDocumentSettings,
  }
}