//global.tempStorage[user_domain];node.js直接获取全局变量
export default async function getDataHandler(req, res) {
  if (req.method === 'GET') {
    const { user_domain } = req.query;
    console.log('sent-right-domain，get id:',user_domain)
   // console.log('senting the tempStorage[uniqueId] ',global.tempStorage[user_domain])

    if (tempStorage[user_domain]) {
      const data = tempStorage[user_domain];
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