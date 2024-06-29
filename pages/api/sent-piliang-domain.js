//下发批量数据的api接口
const { piliang_getapi } = require('@/app/lib/piliang_get_domain_api');//导入第三方api查询模块
//从全局变量中获取目前
export default async function handler(req, res) {
    const user_domain = global.tempUser_domain//确保每次请求都能获取变量
    console.log('sent-piliang-domain，get userdomain:',user_domain)

    const domainParts = user_domain.split('.');
    const suffix = domainParts[2];
    const wwwname = domainParts[1];
    const results = await piliang_getapi(wwwname, suffix)
    res.status(200).json(results);
}