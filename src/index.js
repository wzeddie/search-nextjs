//首页加载react的入口文件
import './mycss.css';
import React from 'react';
//import ReactDOM from 'react-dom';
import Main from './components/Main';
//import { hydrateRoot } from 'react-dom/client';//取消服务器渲染

//hydrateRoot(rootElement, <Main initialDomains={initialDomains}/>);//取消服务器渲染


//以下为客户端渲染方式
import { createRoot } from 'react-dom/client';//react18版本之后的新功能
const rootElement = document.getElementById('root');
const initialDomains = window.__INITIAL_DOMAINS__ || ['test1','test2','test3']; 
const root = createRoot(rootElement);
root.render(
    <React.StrictMode>
      <Main initialDomains={initialDomains} />
    </React.StrictMode>,
    
  );