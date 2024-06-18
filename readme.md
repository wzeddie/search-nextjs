#  v8.0.0 初始化next.js
接上一版本7.4.1 -通过CRA完成tailwind的美化组件
一、如何让本地仓库与远程的仓库进行关联
1、github上创建一个空的仓库，注意不勾选readme文件
2、成功后，在本地目录下执行以下命令，或者参考页面…or create a new repository on the command line
git init 对项目进行初始化
git add readme.md --必须要添加文件后，才能创建一个分支main
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:wzeddie/search-nextjs.git
git push -u origin main
完成

二、参考notion的部署next.js，初始化
 TypeScript 的 JSX 语法的扩展。JSX 是 JavaScript 的语法扩展
 js：比如砖块，jsx：像乐高积木，由不同的砖块组成
 TypeScript (TS):它们不仅包括了砖块，还有钢筋和混凝土。TSX 可以比喻为用TS制成的预制建筑模块

 next.js隐藏了 webpack 的配置细节，使得开发者不需要直接与 webpack 配置打交道。
 next.js 提供了一个内置的、基于 Node.js 的 HTTP 服务器。

 三、将v7.4.1代码迁移过来，并成功运行

 四、按next.js的框架重新拆分并布局
 1、按界面层
  入口页 app/page.tsx-home组件
  结果页，app/result/page.tsx-result组件
  布局页，Layout.tsx
 2、组件层 
 Ui下的各个组件
入口home，
Result组件
 组件层 

 数据层
 Action和data.ts
行为和数据库查询
