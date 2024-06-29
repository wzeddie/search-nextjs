//骨架屏，适用于给loading导入
// SkeletonLoader.js--home 页面的domainserachform组件骨架屏
export default function SkeletonLoader() {
    return (
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          {/* 以下为标题骨架屏 */}
          <div className="h-12 bg-gray-300 rounded w-4/4 animate-pulse"></div>
          {/* 以下为段落1文本骨架屏 */}
          <div className="m-4 h-8 bg-gray-300 rounded w-2/3 animate-pulse"></div>
          {/* 以下为段落2文本骨架屏的 */}
          <div className="m-4  h-8 bg-gray-300 rounded w-2/3 animate-pulse"></div>
  
          {/* 表单骨架屏 */}
          <form className="space-y-4 font-[sans-serif] max-w-md mx-auto">
            <div className="max-w-md mx-auto font-[sans-serif]">
              {/* 输入框骨架屏 */}
              <div className="relative flex items-center h-12 border-2 border-gray-300 rounded">
                <div className="bg-gray-300 w-16 h-full flex items-center justify-center rounded-l"></div>
                <input
                  type="text"
                  className="bg-transparent w-full h-full outline-none px-4 peer"
                  disabled
                />
              </div>
            </div>
            {/* 按钮骨架屏 */}
            <button
              type="submit"
              className="mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-gray-300 rounded animate-pulse"
              disabled
            ></button>
          </form>
        </div>
      </div>
    );
  }

  
