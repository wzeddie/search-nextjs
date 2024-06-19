//最近的三个查询网址组件

import { dbGetTreeData } from '@/app/lib/data.ts';//导入数据库查询函数

export default  async function  RecentlySearched( ){
  const temptreedata = await dbGetTreeData();//从数据库获取数据域名+后缀形式
  console.log(temptreedata)
 const recentDomains= temptreedata
  const isClickable = true; // 控制链接可点击状态

  const onClick_a = (event, domain) => {
    event.preventDefault(); // 阻止链接默认的导航行为
    if (isClickable) { // 只有当链接是可点击状态时才处理点击事件
      setIsClickable(false); // 设置链接为不可点击状态
     // handleDomainClick(domain); // 调用父组件的函数
    }
  };
  return (
    <div className="flex items-center justify-between py-4">
      <p className="text-sm text-gray-500  mx-auto">
      Recently searched:
      {recentDomains.map((domain, index) => (
        <a 
        className="underline" href="#"
        key={index}
          href=""
          // onClick={(event) => onClick_a(event, domain)}
          style={{ 
            margin: '0 10px', 
            opacity: isClickable ? 1 : 0.5, // 当不可点击时，降低透明度
            color: isClickable ? 'black' : 'gray', // 设置不可点击时的文字颜色
            pointerEvents: isClickable ? 'auto' : 'none', // 设置不可点击时，禁用鼠标事件
           }}
          disabled={!isClickable}
        >
          {domain}
          </a>
          ))}
      </p>
    </div>
  );
};

