//入口页面
//都没有调用通过 getServerSideProps 和 getStaticProps。为什么也能实现获取数据返回给组件。
//nextJS的13版本之后的特性，app 目录中的页面默认是 React 服务器组件。服务器组件可以直接进行服务器端数据获取操作，这使得代码更加简洁。
//import DomainSearchForm from '@/app/ui/home/DomainSearchForm';//@项目的根目录，需要在ts配置文件中提前配置好
//import RecentlySearched from '@/app/ui/home/RecentlySearched';
//import ClientWrapper from '@/app/ui/home/ClientWrapper'; // 导入新的客户端组件
import dynamic from 'next/dynamic';

const ClientWrapper = dynamic(() => import('./ui/home/ClientWrapper'), { ssr: false });//动态加载
import { getTreeData } from '@/app/lib/getTreeData'; // 从数据库中获取就近三条记录，并下发给组件。

export default async function Page() {
  const recentDomains = await getTreeData();
  return (
    <section className="container bg-gray-50">
      {/* <DomainSearchForm /> */}
      {/* <RecentlySearched recentDomains={recentDomains}/> */}
      <ClientWrapper recentDomains={recentDomains} /> 
      {/* 使用新的客户端组件 */}

    </section>

  )
}


