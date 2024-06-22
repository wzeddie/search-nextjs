// pages/api/get-recent-domains.js
//除了在父组件（服务端组件）获取数据下发props给客户端外，也可以通过api的方式下发数据结果数据
//目前暂时用不到
import { getTreeData } from '@/app/lib/getTreeData';

export default async function handler(req, res) {
  const recentDomains = await getTreeData(); // 从数据库获取数据域名+后缀形式
  res.status(200).json(recentDomains);
}
