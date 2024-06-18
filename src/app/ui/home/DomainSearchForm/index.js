//获取用户input组件
import React, { useState, useRef } from 'react';
import RecentlySearched from '../RecentlySearched';
//传递上一层的初始化参数initialDomains给RecentlySearched
const DomainSearchForm = ({ initialDomains }) => {
  const [domainName, setDomainName] = useState('');//初始目标域名为空
  const formRef = useRef(null); // 使用 useRef 来引用 form 元素
  const domainInputRef = useRef(null); // 使用 useRef 来引用 input 元素
  const [isSubmittable, setIsSubmittable] = useState(true); // 控制按钮可点击状态
  // 处理表单提交的函数
  const handleSubmit = (event) => {
    //event.preventDefault(); // 阻止表单的默认提交行为
    console.log('client to search:', domainName);
    setIsSubmittable(false);    // 表单提交后，设置为不可再提交
    // 手动触发表单提交
    // if (formRef.current) {
    //   formRef.current.submit();
    // }
  };
  const handleInputClick = () => {
    setDomainName(''); // 清空输入框的值
  };
  // 处理输入框值变化的函数,通过setDomainName更新domainName变量
  const handleInputChange = (event) => {
    setDomainName(event.target.value); // 更新输入框的值到状态
  };
  // 这个函数将被 RecentlySearched 组件调用，回调函数
  const handleDomainClick = (domain) => {
    if (domainInputRef.current) {
      domainInputRef.current.value = domain;//设置输入框的值为传入的 domain
    }
    if (formRef.current) {
      formRef.current.submit(); // 直接调用表单的 submit 方法触发表单提交
    }
  };

  return (
    <section className="container bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Search Domain  Information
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            enter the domain name you wish to query ，only domain  with the following suffixes are supported: com, net, org, me, xyz, info, io, co, ai, biz, us, etc.
          </p>


          <form className="space-y-4 font-[sans-serif] max-w-md mx-auto" id="myForm" method="post" action="/server" onSubmit={handleSubmit} ref={formRef}>
            <div className="max-w-md mx-auto font-[sans-serif]">
              <label className="mb-2 text-sm text-black block">Enter Domain  Like: www.xxx.com</label>

              <div className="relative flex items-center h-12 border-2 border-[#007bff] rounded">
                <div className="bg-[#007bff] w-16 h-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#fff" viewBox="0 0 512 512">
                    <path d="M437.02 74.981C388.667 26.629 324.38 0 256 0S123.333 26.629 74.98 74.981C26.629 123.333 0 187.62 0 256s26.629 132.667 74.98 181.019C123.333 485.371 187.62 512 256 512s132.667-26.629 181.02-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.667-74.98-181.019zM256 482c-66.869 0-127.037-29.202-168.452-75.511C113.223 338.422 178.948 290 256 290c-49.706 0-90-40.294-90-90s40.294-90 90-90 90 40.294 90 90-40.294 90-90 90c77.052 0 142.777 48.422 168.452 116.489C383.037 452.798 322.869 482 256 482z" data-original="#000000"></path>
                  </svg>
                </div>

                <input type='text' placeholder='Enter name'
                  className="text-sm text-black rounded bg-white w-full h-full  outline-none px-4"
                  id="domainname"
                  name="name"
                  required
                  value={domainName}
                  onClick={handleInputClick}//添加光标鼠标点击事件
                  onChange={handleInputChange}//通过事件触发setDomainName，然后在更新domainName
                  placeholder="www.example.com"
                  ref={domainInputRef}
                />
              </div>
            </div>
            <button type="submit"
              className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              id="searchdomain" disabled={!isSubmittable} style={{ opacity: isSubmittable ? 1 : 0.5 }}
            >Submit</button>
     
         
          </form>
          <RecentlySearched
              initialDomains={initialDomains}
              handleDomainClick={handleDomainClick} // 将 handleDomainClick 传递给 RecentlySearched
            />
        </div>
      </div>
    </section>
  );
};

export default DomainSearchForm;