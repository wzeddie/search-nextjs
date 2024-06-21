const { getapi } = require('@/app/lib/getapi'); // 导入第三方api查询模块

export async function piliang_getapi(wwwname, suffix) {
    const suffixs = ['com', 'net', 'org', 'me', 'xyz', 'info', 'io', 'co', 'ai', 'biz', 'us', 'etc'];
    let piliang_yuming_able = {};
    let promises = []; // 用于收集所有 Promise 的数组

    for (let i = 0; i < suffixs.length; i++) {
        // 直接返回 getapi 的结果，不需要在 then 中再次返回
        const domain = `${wwwname}.${suffixs[i]}`;
        promises.push(//添加到数组 promises 
            getapi(wwwname, suffixs[i])
                .then(singleData => {//.then语法，直接根据getapi返回的结果进行判断
                    // 假设 singleData 是一个对象，我们可以直接修改 piliang_yuming_able
                    piliang_yuming_able[domain] = singleData.available
                        ? 'unregistered'
                        : 'registered';
                    // 显式返回 singleData 对象
                    return singleData.domain; // 确保返回 Promise 结果
                })
                .catch(error => {
                    console.error(`查询 ${domain} 时出错：`, error);
                    piliang_yuming_able[domain] = 'error';
                    // 在这里抛出错误，让 Promise.all 能够捕获它
                    throw error;
                })
        );
    }

    try {
        // 等待所有 Promise 完成promises
        await Promise.all(promises)
            .then(results => {
                // 打印每个 Promise 的结果
                results.forEach((result, index) => {
                    console.log(`Promise #${index + 1} result:`, result);
                });
                // 如果你需要打印整个结果数组
                console.log('All promises results:', results);
            })
            .catch(error => {
                // 如果任何一个 Promise 失败，这里会打印错误
                console.error('An error occurred with one of the promises:', error);
            });
        return piliang_yuming_able; // 返回查询结果
    } catch (error) {
        // 如果 Promise.all 抛出错误，这里将捕获它
        console.error('批量查询中出现错误:', error);
        throw error; // 重新抛出错误，以便调用者可以处理
    }
}