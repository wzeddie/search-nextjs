//app/api/getdomain，用于单个页面调用,未启用
const { getapi } = require('@/app/lib/connectToDB');//导入第三方api查询模块
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