//result.html页面的react页面的入口页面
import './mycss.css';//添加tailwind的入口文件

import React from 'react';
import ReactDOM from 'react-dom/client';
import DomainInfo from './components/DomainInfo';

ReactDOM.hydrateRoot (
  <React.StrictMode>
    <DomainInfo />
    </React.StrictMode>,
    document.getElementById('root')
  );
