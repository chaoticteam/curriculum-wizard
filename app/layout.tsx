import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Curriculum wizard",
  description: "this is a repository for create curriculums",
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export default function RootLayout({
  children,
  params:{lang}
}: Readonly<{
  children: React.ReactNode;
  params:{lang:string}
}>) {
  return (
    <html lang={lang}>
      <body>
          {children}
      </body>
    </html>
  );
}
