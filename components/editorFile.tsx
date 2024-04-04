'use client'
import { PDFViewer } from "@react-pdf/renderer"
import styled from "styled-components"
import { CurriculumTemplate } from "./curriculum"
import { useCurriculum } from "@/hooks/useCurriculum"
import { ITranslades } from "@/app/[lang]/dictionaries"
import Form from "form-with-state"
const dateFormat: Intl.DateTimeFormatOptions = {
  month:"long",
  year:"numeric"
}
export function EditorFile({dict}:{dict:ITranslades}){
  const {
    profile,
    handleOnSubmitExperience,
    handleOnSubmitFormations,
    handleOnSubmitHobbie,
    handleOnSubmitLanguage,
    handleOnSubmitPersonalDetails,
    handleOnSubmitSkill,
    handleRemoveExperience,
    handleRemoveFormation,
    handleRemoveHobbie,
    handleRemoveLanguage,
    handleRemoveSkill,
    handleOnSubmitDocumentSettings,
  } = useCurriculum()
  return (
      <Layaut>
        <div>
          <Form.Container style={{textTransform:"capitalize"}} id="personal-details" label={dict.curriculum.containers.details}>
            <Form initialState={profile||{}} className="personal-details" persistData onSubmit={(data)=>handleOnSubmitPersonalDetails(data)}>
              <Form.TextField name="firstName" label={dict.curriculum.formDetails.firstName} />
              <Form.TextField name="lastName" label={dict.curriculum.formDetails.lastName} />
              <Form.TextField name="email" label={dict.curriculum.formDetails.email} />
              <Form.TextField name="phoneNumber" label={dict.curriculum.formDetails.telephone} />
              <Form.DatePickerFull name="dateBorn" label={dict.curriculum.formDetails.dateBorn} />
              <Form.FileImage name="photo" type="dataUrl" />
              <Form.TextArea name="bio" label={dict.curriculum.formDetails.bio} />
              <Form.Submit name="submit" label={dict.curriculum.formSubmit} />
            </Form>
          </Form.Container>
          <Form.Container style={{textTransform:"capitalize"}} id="formations" label={dict.curriculum.containers.formations}>
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
              <Form.TextField name="title" required  label={dict.curriculum.formFormations.title} />
              <Form.TextField name="institution" required  label={dict.curriculum.formFormations.institution} />
              <Form.TextField name="address" label={dict.curriculum.formFormations.address} />
              <Form.DatePicker name="dateStart" required label={dict.curriculum.formFormations.dateStart} />
              <Form.DatePicker name="dateEnd" label={dict.curriculum.formFormations.dateEnd} />
              <Form.TextArea name="description" label={dict.curriculum.formFormations.description} />
              <Form.Submit name="submit" label={dict.curriculum.formSubmit} />
            </Form>
          </Form.Container>
          <Form.Container style={{textTransform:"capitalize"}} id="experince" label={dict.curriculum.containers.experience}>
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
              <Form.TextField name="jobName" label={dict.curriculum.formExperience.jobName} required  />
              <Form.TextField name="company" required label={dict.curriculum.formExperience.company}  />
              <Form.TextField name="address" label={dict.curriculum.formExperience.address} />
              <Form.DatePicker name="dateStart" label={dict.curriculum.formExperience.dateStart} required />
              <Form.DatePicker name="dateEnd" label={dict.curriculum.formExperience.dateEnd}/>
              <Form.TextArea name="description" />
              <Form.Submit name="submit" label={dict.curriculum.formSubmit} />
            </Form>
          </Form.Container>
          <Form.Container style={{textTransform:"capitalize"}} id="skills" label={dict.curriculum.containers.skills}>
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
              <Form.TextField name="name" label={dict.curriculum.formSkills.name} required  />
              <Form.RangeField min={1} max={5} name="level" required  />
              <Form.Submit name="submit" label={dict.curriculum.formSubmit} />
            </Form>
          </Form.Container>
          <Form.Container style={{textTransform:"capitalize"}} id="languages" label={dict.curriculum.containers.langs}>
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
              <Form.TextField name="name" label={dict.curriculum.formLangs.name} required  />
              <Form.RangeField min={1} max={5} name="level" required  />
              <Form.Submit name="submit" label={dict.curriculum.formSubmit} />
            </Form>
          </Form.Container>
          <Form.Container style={{textTransform:"capitalize"}} id="hobbies" label={dict.curriculum.containers.hobbies}>
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
              <Form.TextField name="hobbie" label={dict.curriculum.formHobbies.textField} required  />
              <Form.Submit name="submit" label={dict.curriculum.formSubmit} />
            </Form>
          </Form.Container>
          <Form.Container style={{textTransform:"capitalize"}} id="document" label={dict.curriculum.containers.document}>
            <Form initialState={profile?.document||{}} className="document" onSubmit={(data)=>handleOnSubmitDocumentSettings(data)}>
              <Form.SelectField name="size" label={dict.curriculum.formDocument.size} required >
                <option value="A4">A4</option>
                <option value="letter">{dict.curriculum.formDocument.letter}</option>
              </Form.SelectField>
              <Form.Submit name="submit" label={dict.curriculum.formSubmit} />
            </Form>
          </Form.Container>
        </div>
        <PDFViewer style={{height:"100%",width:"100%"}}>
          <CurriculumTemplate profile={profile} dict={dict} />
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
height: 90vh;
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
    "auto auto submit";
}
& .experince {
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
    "jobName company company"
    "address address address"
    "dateStart dateEnd dateEnd"
    "description description description"
    "auto auto submit";
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
& .document {
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
  "size size"
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