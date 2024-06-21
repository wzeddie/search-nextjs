//域名结果详情组件
const { getapi } = require('@/app/lib/getapi');//导入第三方api查询模块

export default async function DomainTable({domainname}) {//传入参数
  let safeData={}
  const domainParts = domainname.split('.');
  if (domainParts.length > 2) {
    const suffix = domainParts[2];
    const wwwname = domainParts[1];
    //console.log(wwwname, suffix);
    safeData = await getapi(wwwname, suffix);//发起查询
    //console.log(safeData)
  }else {
      console.log('Received wrong domain ');//输入的查询域名格式不符
    }

    return (
        <div className="col-span-1 md:col-span-3 bg-white rounded overflow-hidden shadow">
          <div className="bg-white rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300" style={{ cursor: 'default' }}>
            <table className="min-w-full bg-white w-full">
              <thead className="whitespace-nowrap">
                <tr>
                  <th className="p-4 text-sm font-semibold bg-red-500 text-white text-center">Information</th>
                  <th className="p-4 text-sm font-semibold bg-blue-500 text-white text-center">Results</th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <th className="border-r border-gray-200">Domain Name</th>
                  <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">{safeData.domain}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <th className="border-r border-gray-200">Status</th>
                  <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">{safeData.status}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <th className="border-r border-gray-200">Available</th>
                  <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">{safeData.available ? 'Yes' : 'No'}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <th className="border-r border-gray-200">Creation Date</th>
                  <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">{safeData.creation_datetime}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <th className="border-r border-gray-200">Expiry Date</th>
                  <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">{safeData.expiry_datetime}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <th className="border-r border-gray-200">WHOIS Information</th>
                  <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200" style={{ whiteSpace: 'pre-wrap' }}>{safeData.info}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      

    );
  };


