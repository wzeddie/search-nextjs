//api功能发起远程api查询，获取数据后，保存到全局变量中
const { getapi } = require('@/app/lib/get_domain_api');//导入第三方api查询模块
const { addToMongoDB } = require('@/app/lib/addToMongoDB');//导入插入数据库模块
global.tempStorage = global.tempStorage || {};
global.tempUser_domain = global.tempUser_domain || {};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=3600');//设置响应头服务端缓存机制。

  if (req.method === 'POST') {
    const { user_domain } = req.body;
    console.log('api-received domainname:', user_domain);
    global.tempUser_domain=user_domain
    const domainParts = user_domain.split('.');
    const suffix = domainParts[2];
    const wwwname = domainParts[1];
    const safeData = await getapi(wwwname, suffix);//向第三方发起查询数据
    //这里要增加判断sefedata是否有有效
    await addToMongoDB(safeData)//将得到的数据添加到数据库
    //res.status(200).json( safeData);//下发数据JSON.stringify(
    //生成唯一标识
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    //console.log('created the uniqueId ',uniqueId)
    const encodedId = encodeURIComponent(JSON.stringify(safeData));
    global.tempStorage[uniqueId]=safeData ;
    console.log('saved the tempStorage[uniqueId] ',uniqueId,tempUser_domain )
    res.writeHead(302, { Location: `http://localhost:3000/result?user_domain=${uniqueId}` });//告诉客户端重定向到结果页面
    res.end();

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(); // 405 Method Not Allowed
  }
};