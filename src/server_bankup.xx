const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const https = require('https');
const querystring = require('querystring');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const DomainInfo  = require('../lib/components/DomainInfo').default; // 确保你导入了 DomainInfo 组件
var piliang_yuming_able = {}
//console.log('__dirname:', __dirname);
//console.log('Calculated path:', path.join(__dirname, '..', 'build', 'result.html'));

async function main(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const reqPath = parsedUrl.pathname;

    if (req.method === 'GET' && reqPath === '/') {
        res.writeHead(302, { 'Location': '/index.html' });
        res.end();
    } else if (req.method === 'GET' && reqPath === '/index.html') {
        //读取数据库
        var tempDomains = [];
        await getFromMongoDB((extractedData) => {
            tempDomains = extractedData;
        });

        // JSON类型转换为数组类型
        const initialDomains = tempDomains.map(domain => `www.${domain.name}.${domain.suffix}`);
        console.log('RecentlySearched:',initialDomains);

        // 读取 index.html 模板
        const templatePath = path.join(__dirname, '..', 'build', 'index.html');
        let templateData = await fs.promises.readFile(templatePath, 'utf8');

        // 下发window全局变量
        templateData = templateData.replace('</body>', `<script>window.__INITIAL_DOMAINS__ = ${JSON.stringify(initialDomains)};</script></body>`);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(templateData);
    } else if (req.method === 'POST' && req.url === '/server') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const post_data = querystring.parse(body);
            const domainName = post_data.name;
            console.log('Received domain name:', domainName);

            // 对域名进行分解
            const domainParts = domainName.split('.');
            if (domainParts.length > 2) {
                const suffix = domainParts[2];
                const wwwname = domainParts[1];

                await piliangchaxun(wwwname);
                const jsonData = await getapi(wwwname, suffix);

                const jsonString = JSON.stringify(jsonData);
                var results=piliang_yuming_able
                //console.log('jsonString resolved with:', jsonString);
                console.log('Bulk query results:', results);
                //console.log('Bulk query results:', piliang_yuming_able);
                let htmlString = await fs.promises.readFile(path.join(__dirname,  '..','build', 'result.html'), 'utf-8');
                //console.log('server__dirname:', __dirname);

                const reactAppString = ReactDOMServer.renderToString(React.createElement(DomainInfo,{domainData: jsonString,
                    results: results }));//不能用jsx否则报错>
                htmlString = htmlString.replace('<div id="root"></div>', `<div id="root">${reactAppString}</div>`);
                await connectToMongoDB(jsonData)//插入数据库新增记录
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(htmlString);
                piliang_yuming_able = Object.create(null);//一次查询，清空批量域名查询结果
            }
        });
    } else if (req.url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
    } else {
        const filePath = path.join(__dirname, '..', 'build', reqPath);
        try {
            await fs.promises.access(filePath, fs.constants.F_OK);
            const ext = path.extname(filePath).slice(1);
            const mimeTypes = {
                html: 'text/html',
                js: 'application/javascript',
                css: 'text/css',
                png: 'image/png',
                jpg: 'image/jpeg',
                gif: 'image/gif',
                svg: 'image/svg+xml',
                ico: 'image/x-icon'
            };
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            const data = await fs.promises.readFile(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found\n');
        }
    }
}

// 定义批量查询的函数
async function piliangchaxun(wwwname) {
    const suffixs = ['com', 'net', 'org', 'me', 'xyz', 'info', 'io', 'co', 'ai', 'biz', 'us', 'etc'];
    const promises = suffixs.map(temp_suffix => getapi(wwwname, temp_suffix));
    try {
        const results = await Promise.all(promises);
        return results;
    } catch (error) {
        console.error('批量查询中出现错误:', error);
        throw error;
    }
}

// 修改为promise类型
function getapi(wwwname, suffix) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'whois.freeaiapi.xyz',
            path: `/?name=${wwwname}&suffix=${suffix}`,
            method: 'GET',
        };
        const req = https.request(options, (res) => {
            let mydata = '';
            res.on('data', (d) => {
                mydata += d;
            });
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(mydata);
                    if (jsonData.available === false) {
                        piliang_yuming_able[jsonData.domain] = 'registered';
                    } else if (jsonData.available === true) {
                        piliang_yuming_able[jsonData.domain] = 'unregistered';
                    }
                    resolve(jsonData);
                } catch (e) {
                    reject(e);
                }
            });
        });
        req.on('error', (error) => {
            reject(error);
        });
        req.end();
    });
}

// vercel向远程数据库添加
async function connectToMongoDB(sendData) {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    //const uri = process.env.MONGODB_URI;
    const uri='mongodb+srv://vercel-admin-user:79wInWz1Luoxtq82@cluster0.rpimotu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    let client;
    try {
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
        });
        await client.connect();
        const database = client.db('mydatabase');
        const collection = database.collection('searchdomain');
        const result = await collection.insertOne(sendData);
        console.log('new domain inserted with _id:', sendData.domain, result.insertedId);
        await client.close();
    } catch (error) {
        console.error('An error occurred while connecting to MongoDB Atlas:', error);
        throw error;
    }
}

// 从数据库中获取数据最近访问的三条网址
async function getFromMongoDB(callback) {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    //const uri = process.env.MONGODB_URI;
    const uri='mongodb+srv://vercel-admin-user:79wInWz1Luoxtq82@cluster0.rpimotu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    let client;
    try {
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
        });
        await client.connect();
        const database = client.db('mydatabase');
        const collection = database.collection('searchdomain');
        const recentDocuments = await collection.find().sort({ _id: -1 }).limit(3).toArray();
        const extractedData = recentDocuments.map(doc => ({
            _id: doc._id,
            name: doc.name,
            suffix: doc.suffix
        }));
        await client.close();
        callback(extractedData);
    } catch (error) {
        console.error('An error occurred while connecting to MongoDB Atlas:', error);
        throw error;
    }
}

const server = http.createServer(async (req, res)=> {
    const parsedUrl = url.parse(req.url, true);
    const reqPath = parsedUrl.pathname;

    if (req.method === 'GET' && reqPath === '/') {
        res.writeHead(302, { 'Location': '/index.html' });
        res.end();
    } else if (req.method === 'GET' && reqPath === '/index.html') {
        //读取数据库
        var tempDomains = [];
        await getFromMongoDB((extractedData) => {
            tempDomains = extractedData;
        });

        // JSON类型转换为数组类型
        const initialDomains = tempDomains.map(domain => `www.${domain.name}.${domain.suffix}`);
        console.log('RecentlySearched:',initialDomains);

        // 读取 index.html 模板
        const templatePath = path.join(__dirname, '..', 'build', 'index.html');
        let templateData = await fs.promises.readFile(templatePath, 'utf8');

        // 下发window全局变量
        templateData = templateData.replace('</body>', `<script>window.__INITIAL_DOMAINS__ = ${JSON.stringify(initialDomains)};</script></body>`);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(templateData);
    } else if (req.method === 'POST' && req.url === '/server') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const post_data = querystring.parse(body);
            const domainName = post_data.name;
            console.log('Received domain name:', domainName);

            // 对域名进行分解
            const domainParts = domainName.split('.');
            if (domainParts.length > 2) {
                const suffix = domainParts[2];
                const wwwname = domainParts[1];

                await piliangchaxun(wwwname);
                const jsonData = await getapi(wwwname, suffix);

                const jsonString = JSON.stringify(jsonData);
                var results=piliang_yuming_able
                //console.log('jsonString resolved with:', jsonString);
                console.log('Bulk query results:', results);
                //console.log('Bulk query results:', piliang_yuming_able);
                let htmlString = await fs.promises.readFile(path.join(__dirname, '..','build', 'result.html'), 'utf-8');
                const reactAppString = ReactDOMServer.renderToString(React.createElement(DomainInfo,{domainData: jsonString,
                    results: results }));//不能用jsx否则报错>
                htmlString = htmlString.replace('<div id="root"></div>', `<div id="root">${reactAppString}</div>`);
                await connectToMongoDB(jsonData)//插入数据库新增记录
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(htmlString);
                piliang_yuming_able = Object.create(null);//一次查询，清空批量域名查询结果
            }
        });
    } else if (req.url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
    } else {
        const filePath = path.join(__dirname, '..', 'build', reqPath);
        try {
            await fs.promises.access(filePath, fs.constants.F_OK);
            const ext = path.extname(filePath).slice(1);
            const mimeTypes = {
                html: 'text/html',
                js: 'application/javascript',
                css: 'text/css',
                png: 'image/png',
                jpg: 'image/jpeg',
                gif: 'image/gif',
                svg: 'image/svg+xml',
                ico: 'image/x-icon'
            };
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            const data = await fs.promises.readFile(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found\n');
        }
    }
});
//module.exports = main;
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
  });