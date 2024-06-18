import '@/app/global.css';//网页CSS
import { Metadata } from 'next';//网页元数据
//import { inter } from '@/app/ui/fonts'; 导入google字体
import Header from './ui/header.js';//页眉
import Footer from './ui/footer.js';//页脚
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
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

 

