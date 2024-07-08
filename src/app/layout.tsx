import '@/app/global.css';//网页CSS
import { Metadata } from 'next';//网页元数据
//import { inter } from '@/app/ui/fonts'; 导入google字体
import Header from './ui/header.js';//页眉
import Footer from './ui/footer.js';//页脚
//标准格式，children对应page页面默认组件
export const metadata: Metadata = {
  title: {
    template: '%s | Lean Domain Search: Find Short, Available Domain Names',
    default: 'Lean Domain Search: Find Short, Available Domain Names',
  },
  description: 'Discover the perfect domain name for your website with Lean Domain Search. Our intuitive platform helps you find short, memorable, and available domain names quickly and easily. Start your online journey today!',
  metadataBase: new URL('http://lean-domain.online'),
  googleAdsenseAccount:'ca-pub-7801648526886850',
  keywords:'Lean Domain Search, domain name generator, find domain names, unique domain names, domain search tool, domain availability, domain suggestions, domain brainstorming, domain name ideas, domain name search'

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



