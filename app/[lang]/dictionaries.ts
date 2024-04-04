import 'server-only'
import type { Locale } from './i18n-config'

export interface ITranslades{
    page:{
        form:{
            textfield:string;
            submit:string;
        },
        label:string;
    },
    curriculum:{
        containers:{
            details:string,
            formations:string,
            experience:string,
            skills:string,
            langs:string,
            hobbies:string,
            document:string,
        },
        formDetails:{
            firstName:string,
            lastName: string,
            email:string,
            telephone:string,
            dateBorn:string,
            bio:string,
            submit:string
        },
        formFormations:{
            title: string,
            institution:string,
            address:string,
            dateStart:string,
            dateEnd:string,
            description:string
        },
        formExperience:{
            jobName: string,
            company:string,
            address:string,
            dateStart:string,
            dateEnd:string,
            description:string
        },
        formSkills:{
            level:string,
            name:string
        },
        formLangs:{
            level:string,
            name:string
        },
        formHobbies:{
            textField:string
        },
        formDocument:{
            size: string,
            letter:string,
        },
        formSubmit:string
    },
    footer:{
        lang:string,
        languages:{
            english:string,
            spanish:string
        }
    }
}


// We enumerate all dictionaries here for better linting and typescript support
// We also get the defalt import for cleaner types
const dictionaries: {[key: string]: () => Promise<ITranslades> } = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]()