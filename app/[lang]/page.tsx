import { getDictionary } from './dictionaries'
import { Files } from "@/components/files";
import { Locale } from './i18n-config';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'es' }]
}
export default async function Page({params:{lang}}:{params:{lang:Locale}}){
    const dict = await getDictionary(lang);
    return (
        <Files dict={dict} lang={lang} />
    )
}

