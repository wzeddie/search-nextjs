import '@/app/global.css';//网页CSS
import { Metadata } from 'next';//网页元数据
import Head from 'next/head';
import Script from "next/script"
//import { inter } from '@/app/ui/fonts'; 导入google字体
import Header from './ui/header.js';//页眉
import Footer from './ui/footer.js';//页脚
import MyHead from './ui/MyHead.js';//head组件

//标准格式，children对应page页面默认组件
interface ExtendedMetadata extends Metadata {
  title: {
    template: string;
    default: string;
  };
  description: string;
  metadataBase: URL;
  googleAdsenseAccount: string; // 新增属性
  keywords: string;
  // scripts:string[];
}
export const metadata: ExtendedMetadata = {
  title: {
    template: '%s | Lean Domain Search: Find Short, Available Domain Names',
    default: 'Lean Domain Search: Find Short, Available Domain Names',
  },
  description: 'Discover the perfect domain name for your website with Lean Domain Search. Our intuitive platform helps you find short, memorable, and available domain names quickly and easily. Start your online journey today!',
  metadataBase: new URL('http://lean-domain.online'),
  googleAdsenseAccount: 'ca-pub-7801648526886850',
  keywords: 'Lean Domain Search, domain name generator, find domain names, unique domain names, domain search tool, domain availability, domain suggestions, domain brainstorming, domain name ideas, domain name search',

};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* google广告的自动布放位置，植入的代码。*/}
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7801648526886850"
        crossOrigin="anonymous" />
      {/* <!-- 由 Google 结构化数据标记助手生成的 JSON-LD 标记。 需要用转移符号进行处理--> */}
      <Script type="application/ld+json" id="my123">
        {`{
            "@context": "http://schema.org",
          "@type": "SoftwareApplication",
          "name": "Lean Domain Search",
          "url": "https://www.lean-domain.online/"
  }`}
      </Script>
      {/* <MyHead /> */}
      <body>
        <main>
          <Header />
          {children}
          <Footer />
        </main>
        {/* 添加添加流量统计代码,analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VTSECLCSQG" />
        <Script id="show-banner">
          {` (window.dataLayer = window.dataLayer || []).push(function() {
            window.gtag = function(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VTSECLCSQG');
          });`}
        </Script>
      </body>
    </html>
  )
}



