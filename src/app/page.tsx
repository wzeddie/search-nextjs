
'use client'
import Header from '../components/Header';
import DomainSearchForm from '../components/DomainSearchForm';
import Footer from '../components/Footer'; // 确保路径正确
export default function Page() {
  const initialDomains = window.__INITIAL_DOMAINS__ || ['test1','test2','test3']; 

  return (<main>
    <Header />
    <DomainSearchForm initialDomains={initialDomains} />
    <Footer />
  </main>)
}


