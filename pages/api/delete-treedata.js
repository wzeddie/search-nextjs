//api，负责接收请求并删除数据库记录3条
import { deleteThreeData } from '@/app/lib/deleteThreeData';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
export default async function handler(req, res) {

  const  deletestate  = await deleteThreeData(); // 执行删除操作
  console.log(deletestate)
  res.writeHead(302, { Location: `http://localhost:3000/` });//告诉客户端重定向到结果页面
  res.end();
//   revalidatePath('/');
//   redirect('/');

}