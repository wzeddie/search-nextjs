import Head from 'next/head';
// import Script from 'next/script' head组件中不能用此

// 创建自定义 Head 组件，为什么不能到layout中导入，无法生效。奇怪。
//在page导入，会提示语法错误
const MyHead = () => {
  return (
    <Head>
      {/* <Script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7801648526886850" 
        crossOrigin="anonymous" 
      />
      <Script 
        type="application/ld+json" 
        children={{
          "@context": "http://schema.org", 
          "@type": "SoftwareApplication",
          "name": "Lean Domain Search",
          "url": "https://www.lean-domain.online/"
        }}
      />
      <Script 
        async 
        src="https://www.googletagmanager.com/gtag/js?id=G-VTSECLCSQG" 
      />
      <Script id="show-banner">
        {` (window.dataLayer = window.dataLayer || []).push(function() {
            window.gtag = function(){window.dataLayer.push(arguments);};
            gtag('js', new Date());
            gtag('config', 'G-VTSECLCSQG');
          });`}
      </Script> */}
    </Head>
  );
};
export default MyHead;