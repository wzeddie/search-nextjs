//入口页面
'use client'
import DomainSearchForm from '@/app/ui/home/DomainSearchForm';//@项目的根目录
export default function Page() {
  const initialDomains = ['test1','test2','test3']; 

  return (
    <DomainSearchForm initialDomains={initialDomains} />
  )
}


