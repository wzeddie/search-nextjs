//入口页面
import DomainSearchForm from '@/app/ui/home/DomainSearchForm';//@项目的根目录，需要在ts配置文件中提前配置好
import RecentlySearched from '@/app/ui/home/RecentlySearched';
import { getTreeData } from '@/app/lib/getTreeData'; // 假设这是你的数据获取函数

export default async function Page() {
  const recentDomains = await getTreeData();
  return (
    <section className="container bg-gray-50">
      <DomainSearchForm />
      <RecentlySearched recentDomains={recentDomains}/>
    </section>

  )
}


