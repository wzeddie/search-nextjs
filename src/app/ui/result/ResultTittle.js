//返回首页组件
//直接return会导致loading失效
import React, { useState, useEffect } from 'react';//客户组件时需要加载

const ResultTittle = () => {
    //const [ResultTittleName, setResultTittleName] = useState('The Domain Information');//初始目标域名为空

    //手动模拟延迟，看loading是否生效
    // const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // React.useEffect(() => {
    //     // simulateDelay(2000).then(() => {
    //     //   // 模拟完成
    //     // });
    //     setResultTittleName('The Domain Information ')

    // }, []);
    return (
        <div className="  bg-gray-50 text-center m-4">
            <h2 className="text-3xl font-extrabold text-[#333] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
            The Domain Information  </h2>
        </div>
    );
};

export default ResultTittle;