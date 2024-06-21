// pages/api/submit-form.js
const { getapi } = require('@/app/lib/getapi');//导入第三方api查询模块

export default async function handler(req, res) {
  if (req.method === 'POST') {
    //Next.js 会自动解析 JSON、FormData 等格式的请求体
    const { name } = req.body;//nextjs可以直接获取input元素的name，不用req.on进行
    console.log('get input domainname:', name);
    //将获取的name分别传送给result相关的两个2组件。
    res.setHeader('Location', `/result?domainname=${encodeURIComponent(name)}`);
    res.status(302).end()
  
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(); // 405 Method Not Allowed
  }
};

