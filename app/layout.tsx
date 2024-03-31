'use client'
import "./globals.css";

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
