//基础的数据库连接模块db.js
const { MongoClient } = require('mongodb');
//const uri = process.env.MONGODB_URI;
const uri = 'mongodb+srv://vercel-admin-user:79wInWz1Luoxtq82@cluster0.rpimotu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 异步函数，用于连接数据库
const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client; // 返回MongoClient实例，方便查询一次data后关闭client连接。

       // return client.db('mydatabase'); // 返回数据库实例，这种不能关闭。客户端连接池来管理数据的链接。
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1); // 如果连接失败，退出进程
    }
};

module.exports = { connectToDatabase };