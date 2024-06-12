//批量查询结果组件
import React from 'react';

const TopLevelDomainQueryResults = ({ results }) => {
  // Object.entries将results对象转换为键值对数组
  const resultEntries = Object.entries(results);

  return (
    <div style={{ margin: '15px',backgroundColor: 'white'   }}>
      <div style={{ margin: '5px', padding: '2px' }}>
        <h4>Other Top-Level Domain (TLD) Query Results:</h4>
      </div>
      <div style={{ padding:'2px',display: 'flex', flexDirection: 'column' }}>
        {/* 遍历键值对数组并展示每个结果 */}
        {resultEntries.map(([key, value], index) => (
          <div key={index} style={{ padding: '15px' }}>
             <a href="/index.html" style={{ textDecoration: 'none' }} onClick={() => console.log('Key clicked:', key)}>
              {key}
            </a> - {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopLevelDomainQueryResults;