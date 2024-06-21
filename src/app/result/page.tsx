//结果页面
'use client';
//result.html汇总组件，用于接收参数，并将各个组件汇总
import { usePathname, useSearchParams } from 'next/navigation';
import DomainTable from '@/app/ui/result/DomainTable';
import TopLevelDomainQueryResults from '@/app/ui/result/TopLevelDomainQueryResults';

import BackButton from '@/app/ui/result/BackButton';
import ResultTittle from '@/app/ui/result//ResultTittle';
//在 Next.js 中，如果你使用的是 Page 组件的函数组件形式，并希望从 URL 中接收参数，你应该使用 Next.js 的 useRouter 钩子来访问路由参数，而不是通过函数组件的 props 来接收。


export default function Page() {
  // 使用 usePathname 钩子获取当前路径
  const pathname = usePathname();
  // 使用 useSearchParams 钩子获取查询参数
  const searchParams = useSearchParams();
  const domainname = searchParams.get('domainname') || ''; // 获取 domainname 参数
  //console.log('result get domainname:', domainname)
  return (
    <div>
      <div className=" bg-gray-50 font-[sans-serif] my-4">
        <div className="max-w-7xl mx-auto">
          <ResultTittle />
          <section className="grid grid-cols-1 md:grid-cols-4 gap-1">

          <DomainTable domainname={domainname} />
          <TopLevelDomainQueryResults domainname={domainname}/>

          </section>
          
          <BackButton />
        </div>
      </div>
    </div>

  );
}


