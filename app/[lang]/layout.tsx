import {Footer,Body} from "@/components";
import { Metadata } from "next";
import type { Locale } from "./i18n-config";
import { getDictionary } from "./dictionaries";


export const metadata: Metadata = {
  title: "Curriculum wizard",
  description: "this is a repository for create curriculums",
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export default async function RootLayout({
  children,
  params:{lang}
}: Readonly<{
  children: React.ReactNode;
  params:{lang:Locale}
}>) {
  const dict = await getDictionary(lang);
  return (
    <html lang={lang}>
      <Body>
          <div className="content">
            {children}
          </div>
          <Footer dict={dict} />
      </Body>
    </html>
  );
}
