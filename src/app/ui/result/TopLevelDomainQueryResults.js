//批量查询结果组件
import React, { useState, useEffect } from 'react';//客户组件时需要加载

export default  function TopLevelDomainQueryResults() {//传入参数
  //初始化时服务器发起获取批量查询结果
  const [resultEntries, setresultEntries] = useState();//初始目标域名为空

  useEffect(() => {
    console.log('TopLevelDomainQueryResults get uniqueId:')
    //setresultEntries([])
    // 调用 fetchData 函数以获取 user_domain 数据
    fetchData();
  }, []); // 空依赖数组意味着这个 effect 只在组件挂载时运行一次

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/sent-piliang-domain`);
      const results = await response.json();
      const resultEntries = Object.entries(results);
      setresultEntries(resultEntries); // 使用 useState 设置 user_domain

    } catch (error) {
      console.error('Fetching data failed:', error);
    }
  };
//条件渲染，当数组有结果时才返回渲染组件
  return resultEntries != null &&(
    <div className="col-span-1 md:col-span-1 bg-white rounded overflow-hidden shadow">
      <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300" style={{ cursor: 'default' }}>

        <div style={{ margin: '15px', backgroundColor: 'white' }}>
          <div style={{ margin: '5px', padding: '2px' }}>
            <h4>Other Top-Level Domain (TLD) Query Results:</h4>
          </div>
          <div style={{ padding: '2px', display: 'flex', flexDirection: 'column' }}>
            {/* 遍历键值对数组并展示每个结果 */}
            {resultEntries.map(([key, value], index) => (
              <div key={index} style={{ padding: '15px' }}>
                <a href={`/result?user_domain=www.${encodeURIComponent(key)}`} style={{ textDecoration: 'none' }} onClick={() => console.log('Key clicked:', key)}>
                  {key}
                </a> - {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};

