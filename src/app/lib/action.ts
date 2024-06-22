// src/app/lib/action.ts
//用于集中管理组件相关的 JavaScript 交互事件，可以由各个组件自行管理交互事件代码
//小型项目没有必要集中管理
export function handleMouseClick() {
    console.log('Mouse clicked!');
  }


//交互事件，在组件中的调用举例
// src/app/components/MyComponent.js
// import { handleMouseClick } from '../lib/action';

// function MyComponent() {
//   return (
//     <button onClick={handleMouseClick}>Click me!</button>
//   );
// }

// export default MyComponent;