//返回首页组件
//直接return会导致loading失效
import React, { useState, useEffect } from 'react';//客户组件时需要加载

const BackButton = () => {
  const [ButtonName, setButtonName] = useState('Loading');//初始时显示为loading
  React.useEffect(() => {
    setButtonName('Back ')
}, []);
  return (
    <div style={{ textAlign: 'center' }}>
      <a
        className="m-3 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        href="/"
      >
        {ButtonName}
      </a>
    </div>
  );
};

export default BackButton;