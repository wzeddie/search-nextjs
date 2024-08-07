//批量查询结果组件
import React, { useState, useEffect, useRef } from 'react';//客户组件时需要加载
import { useRouter } from 'next/navigation';

export default function TopLevelDomainQueryResults() {//传入参数
  const [isLoading, setIsLoading] = useState(true);//初始化是否已点击

  //初始化时服务器发起获取批量查询结果
  const [resultEntries, setresultEntries] = useState();//批量结果字段
  const TSformRef = useRef(null); // 使用 useRef 来引用表单，在 form 中，将表单的引用赋值给 formRef
  const router = useRouter();

  useEffect(() => {

    // 调用 fetchData 函数以获取 user_domain 数据
    fetchData();
  }, []); // 空依赖数组意味着这个 effect 只在组件挂载时运行一次

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/sent-piliang-domain`);//发起请求数据
      const results = await response.json();
      const resultEntries = Object.entries(results);
      setresultEntries(resultEntries); // 使用 useState 设置 user_domain

    } catch (error) {
      console.error('Fetching data failed:', error);
    }
  };




  //点击链接，同步发起查询对应的域名请求
  const onClick_a = async (event, key) => {
    setIsLoading(false); // 禁用按钮，避免重复点击
    event.preventDefault(); // 阻止默认的表单提交行为
    const data = { user_domain: 'www.' + key };

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
    setIsLoading(true);//重启禁用按钮
  };

  //条件渲染，当数组有结果时才返回渲染组件
  return resultEntries != null && (
    <div className="col-span-1 md:col-span-1 bg-white rounded overflow-hidden shadow">
      <form ref={TSformRef} id="myTSForm" >
        <input type="hidden" name="user_domain" /> {/* 隐藏输入框，用于存储被点击的域名 */}
      </form>

      <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300" style={{ cursor: 'default' }}>

        <div style={{ margin: '15px', backgroundColor: 'white' }}>
          <div style={{ margin: '5px', padding: '2px' }}>
            <h4>Other Top-Level Domain (TLD) Query Results:</h4>
          </div>

          <div style={{ padding: '2px', display: 'flex', flexDirection: 'column' }}>
            <ul className="mt-2">
              {/* 遍历键值对数组并展示每个结果 */}
              {resultEntries.map(([key, value], index) => {
                const uniqueKey = typeof key === 'string' && key.trim() ? key.trim() : `item-${index}`;
                return (
                  <li key={uniqueKey}>
                    <div className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all"
                      style={{ padding: '15px' }}>
                      <a href=''
                        style={{
                          textDecoration: 'none',
                          margin: '0 10px',
                          opacity: isLoading ? 1 : 0.5, // 当不可点击时，降低透明度
                          color: isLoading ? 'black' : 'gray', // 设置不可点击时的文字颜色
                          pointerEvents: isLoading ? 'auto' : 'none', // 设置不可点击时，禁用鼠标事件
                        }}
                        onClick={(event) => onClick_a(event, key)}

                      >
                        {key}
                      </a> - {value}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div >

  );
};

