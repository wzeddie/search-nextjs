//中间层组件，用于过渡的，因为page是服务器组件，不好直接加载客户的useRouter
"use client"; // 声明这是一个客户端组件
import RecentlySearched from './RecentlySearched';
import DomainSearchForm from './DomainSearchForm';


export default function ClientWrapper({ recentDomains }) {

  return  (
    <div> 
      <DomainSearchForm />
      <RecentlySearched recentDomains={recentDomains} />
    </div>
  );
}
