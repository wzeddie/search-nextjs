// export default function Loading() {
//     return <div> result Loading...</div>;
//   }
//使用骨架屏
import SkeletonComponent from '@/app/ui/result/skeletons-for-result'; // 导入骨架屏组件
const Loading = () => {
  return (
      <SkeletonComponent />
  );
};

export default Loading;