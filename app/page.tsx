import { redirect } from "next/navigation";
import { i18n } from "./[lang]/i18n-config";

export default function RootPage(){
    const lang = i18n.defaultLocale
    redirect(`/${lang}`)
}