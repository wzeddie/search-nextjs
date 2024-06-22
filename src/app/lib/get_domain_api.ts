//发起向第三方网站api，获得结果数据
const https = require('https');
export async function getapi(wwwname, suffix) {
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