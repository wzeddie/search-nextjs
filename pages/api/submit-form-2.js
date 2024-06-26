const { getapi } = require('@/app/lib/get_domain_api');//导入第三方api查询模块
const { addToMongoDB } = require('@/app/lib/addToMongoDB');//导入插入数据库模块

export default async function handler(req, res) {
  if (req.method === 'POST') {
    //打印接收的格式
    //console.log('req.body：', req.body);  
    const { user_domain } = req.body;
    console.log('api-received domainname:', user_domain);
    const domainParts = user_domain.split('.');
    const suffix = domainParts[2];
    const wwwname = domainParts[1];
    //console.log(wwwname, suffix);
    const safeData = await getapi(wwwname, suffix);//向第三方发起查询数据
    //console.log(safeData)
    //这里要增加判断sefedata是否有有效
    //await addToMongoDB(safeData)//将得到的数据添加到数据库
    res.status(200).json( safeData);//下发数据
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(); // 405 Method Not Allowed
  }
};