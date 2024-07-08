//入口页面
//next13版本之前，要通过getServerSideProps 和 getStaticProps。来实现获取数据返回给组件。
//nextJS的13版本之后的特性，app 目录中的页面默认是 React 服务器组件。服务器组件可以直接进行服务器端数据获取操作，这使得代码更加简洁。


import dynamic from 'next/dynamic';
import Loading from './loading'; // 动态导入loading的加载组件

const ClientWrapper = dynamic(() => import('./ui/home/ClientWrapper'), {
  ssr: false,
  loading: () => <Loading /> // 显示加载组件
});

import { getTreeData } from '@/app/lib/getTreeData'; // 导入获取数据模块。

 
export default async function Page() {
  const recentDomains = await getTreeData();//服务端组件，直接可以数据。
  return (
    <section className="container bg-gray-50"> 
      <ClientWrapper recentDomains={recentDomains} /> 
    </section>
  )
}


