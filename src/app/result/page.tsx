//结果页面
'use client';
//result.html汇总组件，用于接收参数，并将各个组件汇总
import DomainTable from '@/app/ui/result/DomainTable';
import TopLevelDomainQueryResults from '@/app/ui/result/TopLevelDomainQueryResults';
import BackButton from '@/app/ui/result/BackButton';
import ResultTittle from '@/app/ui/result//ResultTittle';
//import React, { useState,useEffect  } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';


export default function Page() {

  const searchParams = useSearchParams();
  const user_domain = searchParams.get('user_domain') || 'default';//在路由中获取参数

  //console.log('result get domainname:', user_domain)
  return (
    <div>
      <div className=" bg-gray-50 font-[sans-serif] my-4">
        <div className="max-w-7xl mx-auto">
          <ResultTittle />
          <section className="grid grid-cols-1 md:grid-cols-4 gap-1">
            {/* The domain name is: {user_domain} */}

            <DomainTable user_domain={user_domain} />
            {/* <TopLevelDomainQueryResults user_domain={user_domain} /> */}
          </section>
          <BackButton />
        </div>
      </div>
    </div>

  );
}


