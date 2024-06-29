// SkeletonTable.js-result页面的表格信息骨架屏
// SkeletonComponent.js
export default function SkeletonComponent() {
    return (
        <div>
            <div className=" bg-gray-50 font-[sans-serif] my-4">
                <div className="max-w-7xl mx-auto">
                    {/* <ResultTittle /> */}
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-1">
                        <SkeletonTable />
                        <SkeletonTopLevelDomainQueryResults />
                    </section>
                    <SkeletonBackButton />
                </div>
            </div>
        </div>
    );
}
export function ResultTittle() {
    return (
        <div className="bg-gray-50 text-center m-4">
            {/* 使用灰色背景和pulse动画来模拟加载中的文本 */}
            <div className="text-3xl font-extrabold">
                <div className="inline-block relative">
                    <div className="after:absolute after:-bottom-4 after:mx-auto after:rounded-full h-1 bg-gray-300 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}

export function SkeletonTopLevelDomainQueryResults() {
    return (
        <div className="col-span-1 md:col-span-1 bg-white rounded overflow-hidden shadow">
            <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300" style={{ cursor: 'default' }}>
                <div style={{ margin: '15px', backgroundColor: 'white' }}>
                    <div style={{ margin: '5px', padding: '2px' }}>
                        <h4>Other Top-Level Domain (TLD) Query Results:</h4>
                    </div>
                    <div style={{ padding: '2px', display: 'flex', flexDirection: 'column' }}>
                        {/* 骨架屏：重复5个a元素 */}
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} style={{ padding: '15px' }}>loading
                                <div className="bg-gray-300 rounded animate-pulse" style={{ width: '100%', height: '1.25em' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
// SkeletonTable.js
// SkeletonTable.js
export function SkeletonTable() {
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
                <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">loading</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="border-r border-gray-200">Status</th>
                <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">loading</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="border-r border-gray-200">Available</th>
                <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">loading</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="border-r border-gray-200">Creation Date</th>
                <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">loading</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="border-r border-gray-200">Expiry Date</th>
                <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200">loading</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <th className="border-r border-gray-200">WHOIS Information</th>
                <td className="text-gray-800 text-center p-4 text-sm border-l border-gray-200" style={{ whiteSpace: 'pre-wrap' }}>loading</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    );
}

export function SkeletonBackButton() {
    return (
        <div style={{ textAlign: 'center' }}>
            {/* 使用灰色矩形和pulse动画来模拟加载中的按钮 */}
            <div className="m-3 inline-block rounded border border-gray-300 bg-gray-300 animate-pulse" style={{ width: 'fit-content', padding: '8px 16px' }}>
                <div className="text-sm font-medium" style={{ height: '1.25em', width: '50%' }}></div>
            </div>
        </div>
    );
}