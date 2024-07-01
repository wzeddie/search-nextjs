const { connectToDatabase } = require('@/app/lib/connectToDB'); // 导入基础数据库连接模块

export async function deleteThreeData() {
    let client; // 声明MongoClient实例变量

    try {
        client = await connectToDatabase(); // 建立连接
        const database = client.db('mydatabase'); // 使用MongoClient实例获取数据库
        const collection = database.collection('searchdomain');
        
        // 首先获取最后三条记录的_id
        const lastThreeDocuments = await collection.find().sort({ _id: -1 }).limit(3).toArray();
        const idsToDelete = lastThreeDocuments.map(doc => doc._id);

        // 然后删除这些记录
        const deleteResult = await collection.deleteMany({ _id: { $in: idsToDelete } });

        // 关闭数据库连接
        await client.close();

        // 返回删除操作的结果
        return {
            status: 'success',
            deletedCount: deleteResult.deletedCount
        };

    } catch (error) {
        console.error('An error occurred while connecting to MongoDB Atlas:', error);
        throw Error('Failed to delete documents.');
    }
}