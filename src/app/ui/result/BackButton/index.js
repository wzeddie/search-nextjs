//返回首页组件
import React from 'react';

const BackButton = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <a
        className="m-3 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        href="/index.html"
      >
        Back
      </a>
    </div>
  );
};

export default BackButton;