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
主要是组件代码，和src中的服务器源代码。
 四、按next.js的框架重新拆分并布局
 1、按界面层
  入口页 app/page.tsx，收集home组件中的 domainsearchform.
  结果页，app/result/page.tsx-result组件.
  布局页，Layout.tsx，定义页眉和页脚等。
 2、组件层 
 Ui下的各个组件页眉，页脚组件，以及入口home组件和Result组件
 3、数据和行为层
 Action.ts和data.ts行为和数据库查询

# v8.0.1 修改首页page.tsx，待修改需求
目前由domainsearchform继续调用 recentlysearched。应该修改直接page来调用。组件之间统一通过page页面进行交互和传递数据。_done
recentlysearched组件初始的时候，自动调用数据库查询函数data.ts-mogboda,env等返回组件数据，由组件进行显示。
数据库查询函数data.ts，链接数据库，查询最近的三条记录，并返回数组形式。
-数据库是，需要安装 "mongodb": "^4.4.2",手动配置json，然后npm install
可以显示正常组件信息






recentlysearched,行为组件action.ts，触发点击事件，点击后提交post请求到服务端。

domainsearchform，支持输入域名，然后发送到服务端进行查询。
什么时候插入数据库--pages/api调用的方式

首页添加快速访问和快速删除按钮

getServerSideProps,在服务端组件调用，用于接收函数，在服务端对应的页面使用。

在src/app，有page.js，也有login/page.js，也有lib/data.ts，等中哪些是服务端组件，哪些是客户端组件
给首页RS组件添加隐藏表单input，来触发pages/api接口

给结果页TP组件添加类似的form表单触发pages/api接口

在 Next.js 中，组件的职责和环境通常决定了它们是否是服务器端组件或客户端组件。
以下是一些常见的约定和示例：
所有的page组件,page.js/jsx/ts/tsx，都是服务端组件，获取数据和服务器端渲染（SSR）。
lib文件下的库文件，都是服务端组件，包含数据获取或其他与服务器端交互的逻辑
app/ui或者app/components，是客户端组件