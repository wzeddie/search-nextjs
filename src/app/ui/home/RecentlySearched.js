"use client"; // 声明这是一个客户端组件
import Link from 'next/link';
import React, { useState, useRef } from 'react';

export default function RecentlySearched({ recentDomains }) { // 组件接收 props 参数，此参数为 page 页面从数据库获取的最近三条记录
  const [isClickable, setIsClickable] = useState(true); // 控制链接可点击状态
  const formRef = useRef(null); // 使用 useRef 来引用表单，在 form 中，将表单的引用赋值给 formRef

  const onClick_a = (event, domain) => {
    event.preventDefault(); // 阻止链接默认的导航
    if (isClickable) {
      setIsClickable(false); // 设置链接为不可点击状态
      if (formRef.current) {
        formRef.current.querySelector('input[name="name"]').value = domain; // 设置隐藏 input 的值
        formRef.current.submit(); // 提交表单
      }
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      <form ref={formRef} id="myRSForm" method="post" action="/api/submit-form">
        <input type="hidden" name="name" /> {/* 隐藏输入框，用于存储被点击的域名 */}
      </form>
      <p className="text-sm text-gray-500 mx-auto">
        Recently searched:
        {recentDomains.map((domain, index) => (
          <Link key={index} href="#" passHref legacyBehavior>
            <a
              className="underline"
              onClick={(event) => onClick_a(event, domain)}
              style={{
                margin: '0 10px',
                opacity: isClickable ? 1 : 0.5, // 当不可点击时，降低透明度
                color: isClickable ? 'black' : 'gray', // 设置不可点击时的文字颜色
                pointerEvents: isClickable ? 'auto' : 'none', // 设置不可点击时，禁用鼠标事件
              }}
            >
              {domain}
            </a>
          </Link>
        ))}
      </p>
    </div>
  );
}
