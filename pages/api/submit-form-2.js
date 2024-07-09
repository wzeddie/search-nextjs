//api功能发起远程api查询，获取数据后，保存到全局变量中
const { getapi } = require('@/app/lib/get_domain_api');//导入第三方api查询模块
const { addToMongoDB } = require('@/app/lib/addToMongoDB');//导入插入数据库模块
global.tempStorage = global.tempStorage || {};//全局变量用于存储domain详情
global.tempUser_domain = global.tempUser_domain || {};//全局变量用于存储用户输入的域名

export default async function handler(req, res) {
  // 设置 CORS 头信息
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有域名访问
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 允许的方法
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的头信息

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  res.setHeader('Cache-Control', 'public, max-age=3600');//设置响应头服务端缓存机制。

  if (req.method === 'POST') {
    const { user_domain } = req.body;
    console.log('api-received domainname:', user_domain);
    global.tempUser_domain=user_domain
    const domainParts = user_domain.split('.');//要求格式为www.xxx.com这样
    const suffix = domainParts[2];
    const wwwname = domainParts[1];
    const safeData = await getapi(wwwname, suffix);//向第三方发起查询数据
    //这里要增加判断sefedata是否有有效
    await addToMongoDB(safeData)//将得到的数据添加到数据库
    //res.status(200).json( safeData);//下发数据JSON.stringify(
    //生成唯一标识
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    //console.log('created the uniqueId ',uniqueId)
    // const encodedId = encodeURIComponent(JSON.stringify(safeData));
    global.tempStorage[uniqueId]=safeData ;
    console.log('saved the tempStorage[uniqueId] ',uniqueId,tempUser_domain )
    res.writeHead(302, { Location: `https://lean-domain.online/result?user_domain=${uniqueId}` });//告诉客户端重定向到结果页面
    res.end();

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(); // 405 Method Not Allowed
  }
};