//结果页面
'use client';
//result.html汇总组件，用于接收参数，并将各个组件汇总

import { Suspense } from 'react';//异步加载，搭配react.lazy使用，在loading时，先加载鱼骨架组件
const DomainTable = React.lazy(() => import('@/app/ui/result/DomainTable'));
const TopLevelDomainQueryResults = React.lazy(() => import('@/app/ui/result/TopLevelDomainQueryResults'));
import BackButton from '@/app/ui/result/BackButton';
import ResultTittle from '@/app/ui/result//ResultTittle';
import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { SkeletonTable } from '@/app/ui/result/skeletons-for-result';
import { SkeletonTopLevelDomainQueryResults } from '@/app/ui/result/skeletons-for-result';


export default function Page() {
  const [uniqueId, setUniqueId] = useState<string | null>(null)//允许接收string和null类型
  const [user_domain, setUserDomain] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const id = searchParams.get('user_domain')
      if (id !== null) {
        console.log('result get uniqueId:', id)
        setUniqueId(id);//初始化uniqueId
        // 调用 fetchData 函数以获取 user_domain 数据
        fetchData(id);
      }
    } else {
      console.error('No search parameters found');
    }
  }, [searchParams]); // 当参数发生变化时，重新进行获取，并渲染

  const fetchData = async (id:any) => {
    try {
      const response = await fetch(`https://search-nextjs-one.vercel.app/api/sent-right-domain?user_domain=${id}`, { cache: 'force-cache' });
      const data = await response.json();//从服务端下载查询的客户数据

      // 打印Cache-Control头部，了解缓存行为
      const cacheControl = response.headers.get('Cache-Control');
      console.log('Cache-Control:', cacheControl);
      if (cacheControl && !cacheControl.includes('no-cache') && !cacheControl.includes('no-store')) {
        console.log('服务端允许缓存');
      } else {
        console.log('服务端禁止缓存');
      }
      // 打印其他头部信息，以获取更多的缓存信息
      console.log('响应头部:', response.headers);
      setUserDomain(data); // 使用 useState 设置 user_domain

    } catch (error) {
      console.error('Fetching data failed:', error);
    }
  };

  return (
    <div>
      <div className=" bg-gray-50 font-[sans-serif] my-4">
        <div className="max-w-7xl mx-auto">
          <ResultTittle />
          <section className="grid grid-cols-1 md:grid-cols-4 gap-1">
            {/* The domain name is:s {user_domain} */}
            <Suspense fallback={<SkeletonTable />}>
              {user_domain && <DomainTable user_domain={user_domain} />}
            </Suspense>
            <Suspense fallback={<SkeletonTopLevelDomainQueryResults />}>
              <TopLevelDomainQueryResults />
            </Suspense>
          </section>
          <BackButton />
        </div>
      </div>
    </div>

  );
}


