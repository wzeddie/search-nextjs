import '@/app/global.css';//网页CSS
import { Metadata } from 'next';//网页元数据
//import { inter } from '@/app/ui/fonts'; 导入google字体
import Header from './ui/header.js';//页眉
import Footer from './ui/footer.js';//页脚
export const metadata: Metadata = {
  title: {
    template: '%s | Search Domain',
    default: 'Search Domain',
  },
  description: 'Enter the domain name you wish to query.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <main>
      <Header />
        {children}
        <Footer />
        </main>
        </body>
    </html>
  )
}

 

