//域名结果详情组件
//该组件未调用数据库插入，所以默认也是客户端组件。
import React, { useState, useEffect } from 'react';//客户组件时需要加载
export default  function DomainTable({ user_domain }) {//传入参数
  const [safeData, setsafeData] = useState(user_domain);//初始目标域名为空
  console.log('DomainTable get the user_domain is:',user_domain)
  useEffect(() => {
    setsafeData(user_domain);//根据传入值进行渲染
  }, [user_domain]); 


  return (
    <div className="col-span-1 md:col-span-3 bg-white rounded overflow-hidden shadow">
      <div className="bg-white rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300" style={{ cursor: 'default' }}>
        <table className="min-w-full bg-white w-full">
          <thead className="whitespace-nowrap">
            <tr>
              <th className="p-4 text-sm font-semibold bg-red-500 text-white text-center">Information</th>
              <th className="p-4 text-sm font-semibold bg-blue-500 text-white text-center">Results</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <th className="border-r border-gray-200">Domain Name</th>
              <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">{safeData.domain}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <th className="border-r border-gray-200">Status</th>
              <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">{safeData.status}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <th className="border-r border-gray-200">Available</th>
              <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">{safeData.available ? 'Yes' : 'No'}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <th className="border-r border-gray-200">Creation Date</th>
              <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">{safeData.creation_datetime}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <th className="border-r border-gray-200">Expiry Date</th>
              <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">{safeData.expiry_datetime}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <th className="border-r border-gray-200">WHOIS Information</th>
              <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200" style={{ whiteSpace: 'pre-wrap' }}>{safeData.info}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


