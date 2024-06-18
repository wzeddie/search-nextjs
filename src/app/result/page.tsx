//结果页面
//result.html汇总组件，用于接收参数，并将各个组件汇总
'use client'
import DomainTable from '@/app/ui/result/DomainTable';
import BackButton from '@/app/ui/result/BackButton';
import Footer from '@/app/ui/footer.js';
import Header from '@/app/ui/header.js';
import ResultTittle from '@/app/ui/result//ResultTittle';



const DomainInfo = ({ domainData, results }) => {
  //console.log('domaininfo',domainData)
  return (
    <div>
      <div class=" bg-gray-50 font-[sans-serif] my-4">
        <div class="max-w-7xl mx-auto">
          <ResultTittle/>
          <DomainTable domainData={domainData} results={results} />
          <BackButton />
        </div>
      </div>
    </div>

  );
};

export default DomainInfo;