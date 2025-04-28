import './globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,401,500,501,700,701,900,901,1,2&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
       
        <title>FOREMS</title>
      </head>
      <body>
        {children}
        <SpeedInsights />
        
      </body>
    </html>
  );
}