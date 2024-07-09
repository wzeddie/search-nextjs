//api，负责接收请求并删除数据库记录3条
import { deleteThreeData } from '@/app/lib/deleteThreeData';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getTreeData } from '@/app/lib/getTreeData';

export default async function handler(req, res) {

  const  deletestate  = await deleteThreeData(); // 执行删除操作
  console.log(deletestate)
  const recentDomains = await getTreeData(); // 从数据库获取数据域名+后缀形式
  res.status(200).json(recentDomains);

  //res.writeHead(302, { Location: `https://lean-domain.online/` });//告诉客户端重定向到结果页面
  res.end();
//   revalidatePath('/');
//   redirect('/');

}