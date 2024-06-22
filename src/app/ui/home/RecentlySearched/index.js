"use client"; // 声明这是一个客户端组件
import { useState } from 'react';

export default function RecentlySearched({recentDomains}) {
  const [isClickable, setIsClickable] = useState(true); // 控制链接可点击状态



  const onClick_a = (event, domain) => {
    event.preventDefault(); // 阻止链接默认的导航
    if (isClickable) {
      setIsClickable(false); // 设置链接为不可点击状态
      const form = document.getElementById('myRSForm');
      form.querySelector('input[name="name"]').value = domain; // 设置隐藏 input 的值,name需要与api对应
      form.submit(); // 提交表单
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      <form id="myRSForm" method="post" action="/api/submit-form">
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


