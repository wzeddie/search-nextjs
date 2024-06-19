//入口页面
import DomainSearchForm from '@/app/ui/home/DomainSearchForm';//@项目的根目录，需要在ts配置文件中提前配置好
import RecentlySearched from '@/app/ui/home/RecentlySearched';
export default function Page() {

  return (
    <section className="container bg-gray-50">
      <DomainSearchForm />
      <RecentlySearched />
    </section>

  )
}


