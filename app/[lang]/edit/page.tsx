import { EditorFile } from "@/components/editorFile";
import { getDictionary } from "../dictionaries";
import { Locale } from "../i18n-config";

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}
export default async function Curriculum({params:{lang}}:{params:{lang:Locale}}){
  const dict = await getDictionary(lang)
  return (
    <EditorFile dict={dict} />
  )
}
