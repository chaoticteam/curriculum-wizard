import "./globals.css";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Curriculum wizard",
  description: "this is a repository for create curriculums",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <div className="background-site"></div>
          {children}
      </body>
    </html>
  );
}
