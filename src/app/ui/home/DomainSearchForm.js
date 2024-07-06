//v1.0，一般的全页面跳转，解决方案。获取用户input的form组件,form表单action指向服务端api，action="/api/submit-form，来处理请求。
//v1.1，next.js技术化
//利用js的fetch api发起post请求，
//服务端接收请求发起查询，如果查询正常，则执行插入数据库，并下发数据。
//客户端，fetch接收数据后，跳转结果页面并传递参数。
//结果页，next.js路由组件接收参数并渲染。

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const DomainSearchForm = () => {
  const router = useRouter();
  const [domainName, setDomainName] = useState('');//初始目标域名为空
  const [isSubmittable, setIsSubmittable] = useState(true); // 控制按钮可点击状态
  // 处理表单提交的事件函数
  const handleSubmit =async  (event) => {
    event.preventDefault();
    setIsSubmittable(false);    // 设置按钮为不可再提交
    const form = event.target;//获取表单input的元素
    const formData = new FormData(form);
    // 将 FormData 转换为 application/x-www-form-urlencoded 格式的字符串
    const data = Object.fromEntries(formData.entries());
    const response=await fetch('/api/submit-form-2', {//对应后台api接口，表单查询处理请求
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',//设置为服务端可以方便获取的接收格式
      },
      body: JSON.stringify(data),//发送服务端的input值
    });
    if (response.redirected) {
      router.push(response.url);//接收服务器重定向
    }
  };


  const handleInputClick = () => {
    setDomainName(''); // 触发光标事件，清空输入框的值
  };
  // 处理输入框值变化的函数
  const handleInputChange = (event) => {
    setDomainName(event.target.value); // 更新输入框的值
  };


  return (
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Search Domain  Information
        </h1>
        <p className="mt-4 sm:text-xl/relaxed">
          enter the domain name you wish to query ，only domain  with the following suffixes are supported: com, net, org, me, xyz, info, io, co, ai, biz, us, etc.
        </p>
        <form className="space-y-4 font-[sans-serif] max-w-md mx-auto" id="myForm" onSubmit={handleSubmit} >
          <div className="max-w-md mx-auto font-[sans-serif]">
            <label className="mb-2 text-sm text-black block">Enter Domain  Like: www.xxx.com</label>

            <div className="relative flex items-center h-12 border-2 border-[#007bff] rounded">
              <div className="bg-[#007bff] w-16 h-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#fff" viewBox="0 0 512 512">
                  <path d="M437.02 74.981C388.667 26.629 324.38 0 256 0S123.333 26.629 74.98 74.981C26.629 123.333 0 187.62 0 256s26.629 132.667 74.98 181.019C123.333 485.371 187.62 512 256 512s132.667-26.629 181.02-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.667-74.98-181.019zM256 482c-66.869 0-127.037-29.202-168.452-75.511C113.223 338.422 178.948 290 256 290c-49.706 0-90-40.294-90-90s40.294-90 90-90 90 40.294 90 90-40.294 90-90 90c77.052 0 142.777 48.422 168.452 116.489C383.037 452.798 322.869 482 256 482z" data-original="#000000"></path>
                </svg>
              </div>

              <input type='text' 
                className="text-sm text-black rounded bg-white w-full h-full  outline-none px-4"
                id="domainname"
                name="user_domain"
                required
                value={domainName}
                onClick={handleInputClick}//添加光标鼠标点击事件
                onChange={handleInputChange}//通过事件触发setDomainName，然后在更新domainName
                placeholder="www.example.com"
              />
            </div>
          </div>
          <button type="submit"
            className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            id="searchdomain" disabled={!isSubmittable} style={{ opacity: isSubmittable ? 1 : 0.5 }}
          >Submit</button>
        </form>
 
      </div>
    </div>
  );
};

export default DomainSearchForm;