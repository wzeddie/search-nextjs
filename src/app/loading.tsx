// export default function Loading() {
//     return <div>home Loading...</div>;
//   }
//使用骨架屏
import SkeletonLoader from './ui/skeletons'; // 导入骨架屏组件
const Loading = () => {
  return (
      <SkeletonLoader />
  );
};

export default Loading;