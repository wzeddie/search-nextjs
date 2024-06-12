//index.html的汇总组件，用于接收参数，加载各个子组件。
import React from 'react';
import Header from '../Header'; 
import DomainSearchForm from '../DomainSearchForm'; 
import Footer from '../Footer'; // 确保路径正确

const Main = ({ initialDomains }) => {
  return (
    <main>
      <Header />
      <DomainSearchForm initialDomains={ initialDomains }/>
      <Footer />
    </main>
  );
};

export default Main;