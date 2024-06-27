//结果页面
'use client';
//result.html汇总组件，用于接收参数，并将各个组件汇总
import DomainTable from '@/app/ui/result/DomainTable';
import TopLevelDomainQueryResults from '@/app/ui/result/TopLevelDomainQueryResults';
import BackButton from '@/app/ui/result/BackButton';
import ResultTittle from '@/app/ui/result//ResultTittle';
import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';


export default function Page() {
  const [uniqueId, setUniqueId] = useState(null);
  const [user_domain, setUserDomain] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('user_domain');
    console.log('result get uniqueId:', id)

    setUniqueId(id);
    // 调用 fetchData 函数以获取 user_domain 数据
    fetchData(id);
  }, []); // 空依赖数组意味着这个 effect 只在组件挂载时运行一次

  const fetchData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/sent-right-domain?user_domain=${id}`);
      const data = await response.json();

      setUserDomain(data); // 使用 useState 设置 user_domain

    } catch (error) {
      console.error('Fetching data failed:', error);
    }
  };

  // const searchParams = useSearchParams();
  // const uniqueId = searchParams.get('user_domain');//在路由中获取参数
  // console.log('result get uniqueId:', uniqueId)
  // var user_domain = null
  // const fetchData = async () => {
  //   const response = await fetch(`http://localhost:3000/api/sent-right-domain?user_domain=${uniqueId}`);//不能传递全局变量
  //   user_domain = await response.json();
  //   console.log('result get domainname:', user_domain)

  // }
  // fetchData()

  return (
    <div>
      <div className=" bg-gray-50 font-[sans-serif] my-4">
        <div className="max-w-7xl mx-auto">
          <ResultTittle />
          <section className="grid grid-cols-1 md:grid-cols-4 gap-1">
            {/* The domain name is:s {user_domain} */}

            {user_domain && <DomainTable user_domain={user_domain} />}
            {/* <TopLevelDomainQueryResults user_domain={user_domain} /> */}
          </section>
          <BackButton />
        </div>
      </div>
    </div>

  );
}


