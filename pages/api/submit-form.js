// pages/api/submit-form.js，原生表单处理，已启用
//api接口用于响应客户端发起的表单处理请求，input的name为name
//addToMongoDB插入数据库的操作必须要在服务端运行，api下的接口基本上为服务端。
//为什么不能在组件中插入数据库？提示dns报错——是因为客户端组件不运行直接操作数据库，只能是服务端的组件页面，比如page.js等

const { getapi } = require('@/app/lib/get_domain_api');//导入第三方api查询模块
const { addToMongoDB } = require('@/app/lib/addToMongoDB');//导入插入数据库模块

export default async function handler(req, res) {
  if (req.method === 'POST') {
    //Next.js 会自动解析 JSON、FormData 等格式的请求体
    const { name } = req.body;//nextjs可以直接获取input元素的name，不用像其他框架通过http的req.on获取
    console.log('received domainname:', name);
    //将获取的name分别传送给result相关的两个2组件。通过重定向功能
    res.setHeader('Location', `/result?domainname=${encodeURIComponent(name)}`);//将字符转换成适合在URL使用的格式，比如空格=%20
    res.status(302).end()
    const domainParts = name.split('.');
    const suffix = domainParts[2];
    const wwwname = domainParts[1];
    //console.log(wwwname, suffix);
    const safeData = await getapi(wwwname, suffix);//向第三方发起查询数据
    //console.log(safeData)
    await addToMongoDB(safeData)//将得到的数据添加到数据库
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(); // 405 Method Not Allowed
  }
};

