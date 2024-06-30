"use client"; // 声明这是一个客户端组件
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function RecentlySearched({ recentDomains }) { // 组件接收 props 参数，此参数为 page 页面从数据库获取的最近三条记录
  const [isClickable, setIsClickable] = useState(true); // 控制链接可点击状态
  const RSformRef = useRef(null); // 使用 useRef 来引用表单，在 form 中，将表单的引用赋值给 formRef
  const router = useRouter();
//获取点击事件后，直接发起fech api请求
  const onClick_a = async (event, domain) => {
      event.preventDefault(); // 阻止默认的表单提交行为
      setIsClickable(false); // 设置链接为不可点击状态
      const data = { user_domain: domain };
      // 将 FormData 转换为 application/x-www-form-urlencoded 格式的字符串
    //const data = Object.fromEntries(data1.entries());
    console.log(data)
    const response = await fetch('/api/submit-form-2', {//对应后台api接口
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',//设置为服务端可以方便获取的接收格式
      },
      body: JSON.stringify(data),
    });
    if (response.redirected) {
      router.push(response.url);//接收服务器重定向
    }
    
  };
  
  return (
    <div className="flex items-center justify-between py-4">
        <form ref={RSformRef} id="myRSForm" >
          <input type="hidden" name="user_domain" /> {/* 隐藏输入框，用于存储被点击的域名 */}
          </form>

        <p className="text-sm text-gray-500 mx-auto">
          Recently searched:
          {recentDomains.map((domain, index) => (
              <a
              key={index}
              href="#"
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
          ))}
        </p>
    </div>
  );
}
