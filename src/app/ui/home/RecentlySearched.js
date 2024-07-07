"use client"; // 声明这是一个客户端组件
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RecentlySearched({ recentDomains }) { // 组件接收 props 参数，此参数为 page 页面从数据库获取的最近三条记录
  const [isClickable, setIsClickable] = useState(true); // 控制链接可点击状态
  const RSformRef = useRef(null); // 使用 useRef 来引用表单，在 form 中，将表单的引用赋值给 formRef
  const router = useRouter();
  const [isSubmittable, setIsSubmittable] = useState(true); // 控制按钮可点击状态
  const [recentTreedata, setrecentDomains] = useState(recentDomains); // 控制链接可点击状态

  useEffect(() => {
    setrecentDomains(recentDomains)//初始化recentTreedata
  }, [recentDomains]);

  //获取点击事件后，直接发起fech api请求，这个方法其实同domainsearchform的表单发起方法
  const onClick_a = async (event, domain) => {
    event.preventDefault(); // 阻止默认的表单提交行为
    setIsClickable(false); // 设置链接为不可点击状态
    const data = { user_domain: domain };//设置data值为对象类型
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

  //手动发起删除数据库操作请求
  const DeleteDataButton = async (event) => {
    event.preventDefault(); // 如果这是一个按钮，可能需要阻止默认行为
    setIsSubmittable(false)
    const response = await fetch('/api/delete-treedata', {//对应后台api删除接口
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',//设置为服务端可以方便获取的接收格式
      },
      body: JSON.stringify({}),//删除时不需要传递具体值
    });
    if (response.redirected) {
      router.push(response.url);//接收服务器重定向
    }
    const data = await response.json();
    console.log('delete success and received:', data); // 打印响应数据到控制台
    if (Array.isArray(data) && data.length > 0) {//如果接收到非空的删除提醒内容，则说明删除成功
      showModal();
      setrecentDomains(data)//再次渲染组件参数recentTreedata

    } else {
      // 如果data不是一个非空数组，显示删除失败的提示，比如数据库记录删除完了后
      alert('删除失败，请稍后再试。');
    }
  };

  // 显示模态框的函数tailwind
  function showModal() {
    const modal = document.getElementById('customModal');
    modal.classList.remove('hidden');
  }

  // 关闭模态框的函数
  function closeModal() {
    const modal = document.getElementById('customModal');
    modal.classList.add('hidden');
    setIsSubmittable(true)
  }

 
  return (
    <div className="flex items-center justify-center text-center py-2">
      <form ref={RSformRef} id="myRSForm" >
        <input type="hidden" name="user_domain" /> {/* 隐藏输入框，用于存储被点击的域名 */}
      </form>

      <p className="text-sm text-gray-500 ">
        Recently searched:
        {recentTreedata.map((domain, index) => (
          <a
            key={index}
            href=""
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
      <div className=" w-20 ">
        <button type="button" onClick={DeleteDataButton} className="  !mt-2 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          id="delete" disabled={!isSubmittable} style={{ opacity: isSubmittable ? 1 : 0.5 }}
        >Delete</button>
      </div>
      <div id="customModal" className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center hidden">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-bold">操作提醒</h2>
          <p className="mt-2">删除成功！</p>
          <button id="closeModalBtn"  onClick={closeModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">关闭</button>
        </div>
      </div>
    </div>
  );
}
