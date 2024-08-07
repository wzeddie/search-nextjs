//插入数据库模块
const { connectToDatabase } = require('@/app/lib/connectToDB');//导入基础数据库连接模块
//支持传入 Record<string, any>任意类型的值
export async function addToMongoDB(sendData : Record<string, any>) {
    let client;
    try {
        client = await connectToDatabase();//建立连接
        const database = client.db('mydatabase'); // 使用MongoClient实例获取数据库 
        const collection = database.collection('searchdomain');
        const result = await collection.insertOne(sendData);
        console.log('new domain inserted with _id:', sendData.domain, result.insertedId);
        await client.close();
    } catch (error) {
        console.error('An error occurred while connecting to MongoDB Atlas:', error);
        throw error;
    }
}