// pages/api/submit-form.js
//addToMongoDB插入数据库的操作必须要在服务端运行，api下的接口基本上为服务端。
//为什么不能在组件中插入数据库，提示dns报错
const { getapi } = require('@/app/lib/getapi');//导入第三方api查询模块
const { addToMongoDB } = require('@/app/lib/addToMongoDB');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    //Next.js 会自动解析 JSON、FormData 等格式的请求体
    const { name } = req.body;//nextjs可以直接获取input元素的name，不用req.on进行
    console.log('get input domainname:', name);
    //将获取的name分别传送给result相关的两个2组件。
    res.setHeader('Location', `/result?domainname=${encodeURIComponent(name)}`);
    res.status(302).end()
    const domainParts = name.split('.');
    const suffix = domainParts[2];
    const wwwname = domainParts[1];
    //console.log(wwwname, suffix);
    const safeData = await getapi(wwwname, suffix);//发起查询获得数据
    //console.log(safeData)
    await addToMongoDB(safeData)//添加到数据库

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(); // 405 Method Not Allowed
  }
};

