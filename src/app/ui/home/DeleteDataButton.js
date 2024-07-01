
import { deleteThreeData } from '@/app/lib/deleteThreeData';

export default async function DeleteDataButton() {
    const isSubmittable = true // 控制链接可点击状态
    const  deletestate  = await deleteThreeData(); // 执行删除操作
    console.log(deletestate)
    // const handleSubmit = async (event) => {
    //     event.preventDefault(); // 阻止表单的默认提交行为
    //     try {
    //         await deleteThreeData(); // 执行删除操作
    //         // 删除操作成功后的处理，比如重定向
    //     } catch (error) {
    //         console.error('Delete operation failed:', error);
    //         // 处理错误，比如显示错误消息
    //     }
    // };
    return (
        <div className="mx-auto w-20 text-center">
                <button type="button"  className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    id="delete" disabled={!isSubmittable} style={{ opacity: isSubmittable ? 1 : 0.5 }}
                >Delete</button>

        </div>
    );
}