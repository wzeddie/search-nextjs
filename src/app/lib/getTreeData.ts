const { connectToDatabase } = require('@/app/lib/connectToDB');//导入基础数据库连接模块
//返回数据最近的三条记录数据
export async function getTreeData(
) {
    let client; // 声明MongoClient实例变量

    try {
        client = await connectToDatabase();//建立连接
        const database = client.db('mydatabase'); // 使用MongoClient实例获取数据库 
        const collection = database.collection('searchdomain');
        const recentDocuments = await collection.find().sort({ _id: -1 }).limit(3).toArray();
        const extractedData = recentDocuments.map((doc:any) => ({
            _id: doc._id,
            name: doc.name,
            suffix: doc.suffix
        }));
       // await client.close(); //关闭数据库
        const initialDomains = extractedData.map((domain:any) => `www.${domain.name}.${domain.suffix}`);//转换为完整的网址形式

        return initialDomains//返回数组类型的三条记录

    } catch (error) {
        console.error('An error occurred while connecting to MongoDB Atlas:', error);
        throw Error('Failed to fetch invoices.');
    }
}

