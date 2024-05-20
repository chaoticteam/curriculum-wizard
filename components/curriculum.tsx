import React from 'react';
import { Page, Text, View,Image , Document, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import { PageSize } from '@react-pdf/types';
import { ITranslades } from '@/app/[lang]/dictionaries';
export interface IContentCV{
  firstName?:string;
  lastName?:string;
  email?:string;
  phoneNumber?:string;
  bio?:string;
  photo?:string;
  dateBorn?: Date;
  socialMedia?:ISocial;
  formations?:IFormation[];
  experince?:IExperince[];
  skills?:ISkills[];
  languages?:ILanguage[];
  hobbies?:string[];
  document?: {
    size: PageSize;
    color?:string;
    background?:string;
  }
}
export interface IFormation{
 title:string;
 institution: string;
 address?: string;
 dateStart: Date;
 dateEnd?: Date;
 description?: string;
}
export interface IExperince{
 jobName:string;
 company: string;
 address?: string;
 dateStart: Date;
 dateEnd?: Date;
 description?: string;
}
export interface ISkills{
  name:string;
  level:1|2|3|4|5;
}
export interface ILanguage{
  name:string;
  level:1|2|3|4|5;
}
export interface ISocial {
  github?: string;
  gitlab?: string;
  linkedin?:string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}
interface IProps{
  profile?: IContentCV,
  dict:ITranslades,
}
// Create styles
const styles = StyleSheet.create({
  page: {
    position: 'relative',
    flexDirection: 'column',
    fontSize:"12pt",
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor:"red",
    flexGrow: 1
  },
  header:{
    position: 'relative',
    display: "flex",
    flexDirection:"row",
    alignItems:"center",
    height:"15%",
  },
  body:{
    position: 'relative',
    padding:"12pt",
    display:"flex",
    flexDirection:"row",
    height:"85%"
  },
  background:{
    objectFit: "cover",
    position:"absolute",
    height:"100%",
    width:"100%",
    zIndex:-1,
    opacity:.4,
  },
  h1:{
    textTransform:'capitalize',
    fontSize:"32pt",
    fontWeight:"extrabold",
    marginVertical:"6pt"
  },
  h2:{
    textTransform:'capitalize',
    fontSize:"18pt",
    fontWeight:"extrabold",
    marginVertical:"6pt"
  },
  h3:{
    textTransform:'capitalize',
    fontSize:"16pt",
    fontWeight:"extrabold",
    marginVertical:"6pt"
  },
  h4:{
    textTransform:'capitalize',
    fontSize:"14pt",
    fontWeight:"heavy",
    marginVertical:"6pt"
  },
  h5:{
    textTransform:"capitalize",
    fontWeight:"extrabold",
  },
  "h5-among":{
    fontWeight:"extrabold",
    marginHorizontal:"6pt"
  },
  row:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
  },
  content:{
    width:"100%",
    marginRight:6,
  },
  sideBar:{
    width:"3in",
    padding:"12pt",
  },
  sideBarChild:{
    paddingVertical:12,
    width:"100%",
    gap:"5pt 0"
  }
});

// Create Document Component
export const CurriculumTemplate:React.FC<IProps> = ({profile,dict}) =>{
  if (!profile) return <></>
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    photo,
    bio,
    dateBorn,
    socialMedia,
    formations,
    experince,
    skills,
    languages,
    hobbies,
  } = profile;
  const {size,background,color} = profile.document||{};
  const showSideBar=!!dateBorn||skills?.length||languages?.length||hobbies?.length;
  const personalDetails=!!dateBorn||!!email||!!phoneNumber||!!socialMedia;
  return (
    <Document>
      <Page size={size} style={{...styles.page,color}} wrap>
        {background&&<Image fixed style={styles.background} src={background} />}
        <View style={styles.header}>
          {photo&&<Image src={photo} />}
          <View style={{marginLeft:"2%"}} >
            <Text style={styles.h1}>
            {!!firstName||!!lastName?`${firstName||""} ${lastName||""}`:"Curriculum Vitae"}
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.content}>
            {bio && <View>
              <Text style={styles.h2}>{dict.curriculum.formDetails.bio}</Text>
              {bio.split("\n").map((line,i)=><Text key={i}>{line}</Text>)}
            </View>}
            {formations?.length &&<View style={{...styles.sideBarChild,borderBottom:`1pt solid ${color}`}}>
              <Text style={styles.h3}>{dict.curriculum.containers.formations}</Text>
              {formations.map((item,i)=><View key={i} style={{position:"relative",marginVertical:"2%"}}>
                <View>
                  <Text style={styles.h4}>{item.title}</Text>
                  <Text>{item.institution}{item.address?`, ${item.address}`:''}</Text>
                  <Text>{item.description}</Text>
                </View>
                <Text style={{position:"absolute",top:0,right:2}}>{item.dateStart.toLocaleDateString("en-US",{month:"long",year:"numeric"})}{item.dateEnd&&"- "+item.dateEnd.toLocaleDateString("en-US",{month:"long",year:"numeric"})}</Text>

              </View>)}
            </View>}
            {experince?.length &&<View style={{...styles.sideBarChild,borderBottom:`1pt solid ${color}`}}>
              <Text style={styles.h3}>{dict.curriculum.containers.experience}</Text>
              {experince.map((item,i)=><View key={i} style={{position:"relative",marginVertical:"2%"}}>
                <View>
                  <Text style={styles.h4}>{item.jobName}</Text>
                  <Text>{item.company}</Text>
                  <Text>{item.description}</Text>

                </View>
                <Text style={{position:"absolute",top:0,right:2}}>{item.dateStart.toLocaleDateString("en-US",{month:"long",year:"numeric"})}{item.dateEnd&&"- "+item.dateEnd.toLocaleDateString("en-US",{month:"long",year:"numeric"})}</Text>
              </View>)}
            </View>}
          </View>
          {showSideBar&&<View style={{...styles.sideBar,borderLeft:`1pt solid ${color}`}}>
            {personalDetails&&<View style={{...styles.sideBarChild,borderBottom:`1pt solid ${color}`}}>
              <Text style={styles.h3}>{dict.curriculum.containers.details}</Text>
              {dateBorn&&<Born color={color} content={dateBorn?.toLocaleDateString("en-US", {day:"2-digit",month:"long",year:"numeric"})} />}
              {email&&<Email color={color} content={email} />}
              {socialMedia?.github&&<GitHub color={color} content={socialMedia.github} />}
              {socialMedia?.gitlab&&<GitLab content={socialMedia.gitlab} />}
              {socialMedia?.linkedin&&<Linkedin content={socialMedia.linkedin} />}
              {socialMedia?.twitter&&<Twitter content={socialMedia.twitter} />}
              {socialMedia?.facebook&&<Facebook content={socialMedia.facebook} />}
              {socialMedia?.instagram&&<Instagram content={socialMedia.instagram} />}
              {socialMedia?.youtube&&<Youtube content={socialMedia.youtube} />}
              {phoneNumber&&<Telephone color={color} content={phoneNumber} />}
            </View>}
            {skills?.length&&<View style={{...styles.sideBarChild,borderBottom:`1pt solid ${color}`}}>
              <Text style={styles.h3}>{dict.curriculum.containers.skills}</Text>
              {skills.map((skill,i)=>(
                <View key={i}>
                  <LevelBar color={color} label={skill.name} level={skill.level} />
                </View>
              ))}
            </View>}
            {languages?.length&&<View style={{...styles.sideBarChild,borderBottom:`1pt solid ${color}`}}>
              <Text style={styles.h3}>{dict.curriculum.containers.langs}</Text>
              {languages.map((lang,i)=>(
                <View key={i}>
                  <LevelBar color={color} label={lang.name} level={lang.level} />
                </View>
              ))}
            </View>}
            {hobbies?.length&&<View style={{...styles.sideBarChild,borderBottom:`1pt solid ${color}`}}>
              <Text style={styles.h3}>{dict.curriculum.containers.hobbies}</Text>
              {hobbies.map((skill,i)=>(
                <View key={i} style={styles.row}>
                  <Square /><Text style={styles["h5-among"]}>{skill}</Text>
                </View>
              ))}
            </View>}
          </View>}
        </View>
      </Page>
    </Document>
  )
};
interface ISvgProps {
  color?:string;
  content:string;
}
const Email =({color,content}:ISvgProps)=>{
  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:"flex-start",
      }}
      >
      <Svg style={{marginRight:'5pt'}} width="12pt" height="12pt" viewBox="0 0 24 24"><Path fill={color||"currentColor"} d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/></Svg>
      <Text>{content}</Text>
    </View>
  )
}
const Telephone =({color,content}:ISvgProps)=>{
  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:"flex-start",
      }}
      >
      <Svg style={{marginRight:'5pt'}} width="10pt" height="10pt" viewBox="0 0 16 16">
        <Path fill={color||"currentColor"} fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42a18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
      </Svg>
      <Text>{content}</Text>
    </View>
  )
}
const Born =({color,content}:ISvgProps)=>{
  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:"flex-start",
        gap:"0 5pt"
      }}
      >
      <Svg width="12pt" height="12pt" viewBox="0 0 24 24"><Path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><Path fill={color||"currentColor"} d="M12.6 2.2a1 1 0 0 0-1.2 0a7.925 7.925 0 0 0-1.147 1.073C9.73 3.862 9 4.855 9 6a3 3 0 0 0 3 3H6a3 3 0 0 0-3 3v2c0 1.236 1.411 1.942 2.4 1.2l.667-.5a1 1 0 0 1 1.2 0l.266.2a3 3 0 0 0 3.6 0l.267-.2a1 1 0 0 1 1.2 0l.267.2a3 3 0 0 0 3.6 0l.266-.2a1 1 0 0 1 1.2 0l.667.5c.989.742 2.4.036 2.4-1.2v-2a3 3 0 0 0-3-3h-6a3 3 0 0 0 3-3c0-1.145-.73-2.138-1.253-2.727c-.346-.39-.73-.76-1.147-1.073M4 17.415V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.585a1.477 1.477 0 0 1-1.4-.215l-.667-.5a1 1 0 0 0-1.2 0l-.266.2a3 3 0 0 1-3.6 0l-.267-.2a1 1 0 0 0-1.2 0l-.267.2a3 3 0 0 1-3.6 0l-.266-.2a1 1 0 0 0-1.2 0l-.667.5a1.477 1.477 0 0 1-1.4.215"/></Svg>
      <Text>{content}</Text>
    </View>
  )
}
const GitHub =({color,content}:ISvgProps)=>{
  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:"flex-start",
        gap:"0 5pt"
      }}
      >
      <Svg width="12pt" height="12pt" viewBox="0 0 24 24"><Path fill={color||"currentColor"} d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></Svg>
      <Text>{content}</Text>
    </View>
  )
}
const GitLab =({content}:ISvgProps)=>{
  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:"flex-start",
        gap:"0 5pt"
      }}
      >
        <Svg width="12pt" height="12pt" viewBox="0 0 128 128"><Path fill="#E24329" d="m124.755 51.382l-.177-.452L107.47 6.282a4.46 4.46 0 0 0-1.761-2.121a4.58 4.58 0 0 0-5.236.281a4.6 4.6 0 0 0-1.518 2.304L87.404 42.088H40.629L29.077 6.746a4.5 4.5 0 0 0-1.518-2.31a4.58 4.58 0 0 0-5.236-.281a4.5 4.5 0 0 0-1.761 2.121L3.422 50.904l-.17.452c-5.059 13.219-.763 28.192 10.537 36.716l.059.046l.157.111l26.061 19.516l12.893 9.758l7.854 5.93a5.28 5.28 0 0 0 6.388 0l7.854-5.93l12.893-9.758l26.218-19.634l.065-.052c11.273-8.526 15.562-23.472 10.524-36.677"/><Path fill="#FC6D26" d="m124.755 51.382l-.177-.452a57.8 57.8 0 0 0-23.005 10.341L64 89.682c12.795 9.68 23.934 18.09 23.934 18.09l26.218-19.634l.065-.052c11.291-8.527 15.586-23.488 10.538-36.704"/><Path fill="#FCA326" d="m40.066 107.771l12.893 9.758l7.854 5.93a5.28 5.28 0 0 0 6.388 0l7.854-5.93l12.893-9.758s-11.152-8.436-23.947-18.09a18379 18379 0 0 0-23.935 18.09"/><Path fill="#FC6D26" d="M26.42 61.271A57.7 57.7 0 0 0 3.422 50.904l-.17.452c-5.059 13.219-.763 28.192 10.537 36.716l.059.046l.157.111l26.061 19.516L64 89.655z"/></Svg>
      <Text>{content}</Text>
    </View>
  )
}
const Linkedin =({color,content}:ISvgProps)=>{
  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:"flex-start",
        gap:"0 5pt"
      }}
      >
        <Svg  width="12pt" height="12pt" viewBox="0 0 24 24"><Path fill={color||"currentColor"} d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/></Svg>
      <Text>{content}</Text>
    </View>
  )
}
const Twitter =({color,content}:ISvgProps)=>{
  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:"flex-start",
        gap:"0 5pt"
      }}
      >
        <Svg width="12pt" height="12pt" viewBox="0 0 24 24"><Path fill={color||"currentColor"} d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></Svg>
      <Text>{content}</Text>
    </View>
  )
}
const Facebook =({color,content}:ISvgProps)=>{
  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:"flex-start",
        gap:"0 5pt"
      }}
      >
        <Svg width="12pt" height="12pt" viewBox="0 0 24 24"><Path fill={color||"currentColor"} d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02"/></Svg>
      <Text>{content}</Text>
    </View>
  )
}
const Instagram =({color,content}:ISvgProps)=>{
  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:"flex-start",
        gap:"0 5pt"
      }}
      >
        <Svg width="12pt" height="12pt" viewBox="0 0 24 24"><Path fill={color||"currentColor"} d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></Svg>
      <Text>{content}</Text>
    </View>
  )
}
const Youtube =({color,content}:ISvgProps)=>{
  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:"flex-start",
        gap:"0 5pt"
      }}
      >
        <Svg width="12pt" height="12pt" viewBox="0 0 24 24"><Path fill={color||"currentColor"} d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"/></Svg>
      <Text>{content}</Text>
    </View>
  )
}
const Square=()=>{
  return (
    <Svg width="12pt" height="12pt" viewBox="0 0 24 24"><Path fill="currentColor" d="M3 21V3h18v18z"/></Svg>
  )
}

const LevelBar = ({color,label,level}:{color?:string,label:string,level:1|2|3|4|5})=>{
return (
  <View>
    <Text>{`${label}(${level*20}%)`}</Text>
    <View style={{
      position: "relative",
      borderBottom:"4pt solid #a1a1a1",
      marginVertical:6,
    }}>
      <View style={{
        position:"absolute",
        bottom:"-4pt",
        zIndex:2,
        width:`${level*20}%`,
        borderBottom:`4pt solid ${color||"#000"}`,
      }} />
    </View>
  </View>
)
}
