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
    fontSize:"24pt",
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
    fontWeight:"extrabold",
    marginVertical:"6pt"
  },
  h5:{
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
    formations,
    experince,
    skills,
    languages,
    hobbies,
  } = profile;
  const {size,background,color} = profile.document||{};
  const showSideBar=!!dateBorn||skills?.length||languages?.length||hobbies?.length;
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
            <View style={styles.row}>
              {email&&<><Email color={color} /><Text style={styles["h5-among"]}>{email}</Text></>}
              {phoneNumber&&<><Telephone color={color} /><Text style={styles["h5-among"]}>{phoneNumber}</Text></>}
            </View>
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
            {dateBorn&&<View style={{...styles.sideBarChild,borderBottom:`1pt solid ${color}`}}>
              <Text style={styles.h3}>{dict.curriculum.containers.details}</Text>
              <Text style={styles.h5}>{dict.curriculum.formDetails.dateBorn}</Text>
              <Text>{dateBorn.toLocaleDateString("en-US", {day:"2-digit",month:"long",year:"numeric"})}</Text>
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
}
const Email =({color}:ISvgProps)=>{
  return (
    <Svg width="12pt" height="12pt" viewBox="0 0 24 24"><Path fill={color||"currentColor"} d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/></Svg>
  )
}
const Telephone =({color}:ISvgProps)=>{
  return (
    <Svg width="12pt" height="12pt" viewBox="0 0 16 16">
      <Path fill={color||"currentColor"} fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42a18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
    </Svg>
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
