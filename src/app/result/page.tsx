//结果页面
'use client';
//result.html汇总组件，用于接收参数，并将各个组件汇总
import { usePathname, useSearchParams } from 'next/navigation';//负责从客户端url中获取参数
import DomainTable from '@/app/ui/result/DomainTable';
import TopLevelDomainQueryResults from '@/app/ui/result/TopLevelDomainQueryResults';
import BackButton from '@/app/ui/result/BackButton';
import ResultTittle from '@/app/ui/result//ResultTittle';


export default function Page() {
  // 获取当前路径
  // const pathname = usePathname();
  // 获取查询参数
  const searchParams = useSearchParams();
  const domainname = searchParams.get('domainname') || ''; // 获取 domainname 参数，在api中定义的
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


