//批量查询结果组件
//import React from 'react';
const { piliang_getapi } = require('@/app/lib/piliang_getapi');//导入第三方api查询模块

export default async function TopLevelDomainQueryResults({ domainname }) {//传入参数
  const domainParts = domainname.split('.');
  const suffix = domainParts[2];
  const wwwname = domainParts[1];
  //针对domainname发起批量查询，返回results
  const results = await piliang_getapi(wwwname, suffix)
  // Object.entries将results对象转换为键值对数组
  const resultEntries = Object.entries(results);
  return (
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
                <a href={`/result?domainname=www.${encodeURIComponent(key)}`} style={{ textDecoration: 'none' }} onClick={() => console.log('Key clicked:', key)}>
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

