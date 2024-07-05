//方法一，不使用骨架
// export default function Loading() {
//     return <div>home Loading...</div>;
//   }
//方法二，使用骨架屏，默认对应page页面
import SkeletonLoader from './ui/skeletons-for-home'; // 导入骨架屏组件
const Loading = () => {
  return (
      <SkeletonLoader />
  );
};

export default Loading;