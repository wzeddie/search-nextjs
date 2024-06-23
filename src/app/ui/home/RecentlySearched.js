

//使用React的状态来控制表单提交的逻辑。而不是直接使用DOM

"use client"; // 声明这是一个客户端组件

import React, { useState, useRef } from 'react';

export default function RecentlySearched({recentDomains}) {//组件接收props参数，此参数为page页面从数据库获取的最近三条记录
  const [isClickable, setIsClickable] = useState(true); // 控制链接可点击状态
  const formRef = useRef(null); // 使用useRef来引用表单，在form中，将表单的引用赋值给formRef

  const onClick_a = (event, domain) => {
    event.preventDefault(); // 阻止链接默认的导航
    if (isClickable) {
      setIsClickable(false); // 设置链接为不可点击状态
      if (formRef.current) {
        formRef.current.querySelector('input[name="name"]').value = domain; // 设置隐藏 input 的值
        formRef.current.submit(); // 提交表单
      }
      //react 一般不直接使用DOM，而是通过useRef引用form
      // const form = document.getElementById('myRSForm');
      // form.querySelector('input[name="name"]').value = domain; // 设置隐藏 input 的值,name需要与api对应
      // form.submit(); // 提交表单
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      <form ref={formRef}  id="myRSForm" method="post" action="/api/submit-form">
        <input type="hidden" name="name" /> {/* 隐藏输入框，用于存储被点击的域名 */}
      </form>
      <p className="text-sm text-gray-500 mx-auto">
        Recently searched:
        {recentDomains.map((domain, index) => (
          <a
            className="underline"
            key={index}
            href="#"
            onClick={(event) => onClick_a(event, domain)}
            style={{
              margin: '0 10px',
              opacity: isClickable ? 1 : 0.5, // 当不可点击时，降低透明度
              color: isClickable ? 'black' : 'gray', // 设置不可点击时的文字颜色
              pointerEvents: isClickable ? 'auto' : 'none', // 设置不可点击时，禁用鼠标事件
            }}
            disabled={!isClickable}
          >
            {domain}
          </a>
        ))}
      </p>
    </div>
  );
}


