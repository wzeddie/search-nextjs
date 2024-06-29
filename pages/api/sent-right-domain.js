//global.tempStorage[user_domain];node.js直接获取全局变量
//给结果页提供下发全局变量的接口
//tempStorage[user_domain]包含域名详细信息
export default async function getDataHandler(req, res) {
    res.setHeader('Cache-Control', 'public, max-age=3600');//设置响应头服务端缓存机制。

  if (req.method === 'GET') {
    const { user_domain } = req.query;
    console.log('sent-right-domain，get id:',user_domain)
   // console.log('senting the tempStorage[uniqueId] ',global.tempStorage[user_domain])

    if (global.tempStorage[user_domain]) {
      const data = global.tempStorage[user_domain];
      //delete tempStorage[user_domain]; // 获取后删除，确保数据只能被获取一次
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end(); // 405 Method Not Allowed
  }
}
