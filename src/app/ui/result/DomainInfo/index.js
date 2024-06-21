//result.html汇总组件，用于接收参数，并将各个组件汇总
import React from 'react';
import DomainTable from '../DomainTable';
import BackButton from '../BackButton';
import Footer from '../../Footer';
import Header from '../../Header/Header';
import ResultTittle from '../ResultTittle';

const DomainInfo = ({ domainData, results }) => {
  //console.log('domaininfo',domainData)
  return (
    <div>
      <Header />
      <div className=" bg-gray-50 font-[sans-serif] my-4">
        <div className="max-w-7xl mx-auto">
          <ResultTittle/>
          <DomainTable domainData={domainData} results={results} />
          <BackButton />
          <Footer />
        </div>
      </div>
    </div>

  );
};

export default DomainInfo;