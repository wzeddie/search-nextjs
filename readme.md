#  v8.0.0 初始化next.js
接上一版本7.4.1 ——通过CRA脚手架完成tailwind的美化组件
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

二、参考notion的部署next.js，并初始化
  TypeScript 的 JSX 语法的扩展。JSX 是 JavaScript 的语法扩展
  js：比如砖块，jsx：像乐高积木，由不同的砖块组成
  TypeScript (TS):它们不仅包括了砖块，还有钢筋和混凝土。TSX 可以比喻为用TS制成的预制建筑模块
与前者比较：
  next.js 隐藏了 webpack 的配置细节，使得开发者不需要直接与 webpack 配置打交道。
  next.js的web服务器，提供了一个内置的、基于 Node.js 的 HTTP 服务器。

三、将v7.4.1代码迁移过来，并成功运行
  主要将原组件代码，和src中的服务器源代码，以及package中的数据库mongodb模块，复制过来。
-数据库是，需要安装 "mongodb": "^4.4.2",手动配置json，然后npm install

四、按next.js的框架将原代码重新拆分并布局
从上往下：
 1、按界面层
  入口页 app/page.tsx，收集home组件中的 domainsearchform.
  结果页，app/result/page.tsx-result组件.
  布局页，Layout.tsx，定义页眉和页脚等。
 2、组件层 
 Ui下的各个组件页眉，页脚组件，以及入口home组件和Result组件
3、中间层pages/api路由
 响应客户端请求，并调取数据
 4、lib数据和行为层
 Action.ts和data.ts行为和数据库查询

# 项目框架文档介绍
/pages/api，api路由，服务端自动加载
app/项目主要源代码文件
app/page.js，首页的入口文件，从数据库获取三条最近访问的记录，并
app/layout.tsx，页面布局文件，加载样式等。
app/global.css，tailwind的导入样式文件

app/ui，组件库各类组件
app/lib，库组件
app/api，自定义的api路由器，需要手动导入
app/result、login等，页面文件，加载组件，获取数据等。


next.js能否定义一个全局变量，用于各个页面之间都能获取查询到的值
这些方法包括使用 React 的上下文（Context）、全局状态管理库（如 Redux、Zustand 或 Recoil）、以及直接在自定义 App 组件中定义全局变量。
# 主要功能模块介绍
app/page，首页加载，从数据库获取数据，并下发给recentlysearched组件。——推荐通过 pages/api/ 路径创建 API 路由，然后在客户端调用这些 API。这样做的好处包括更好的架构分离和更易于调试和维护。
DomainSearchForm ，用户的表单触发组件，接收input的name值，并调用api发起请求。
recentlysearched ，显示最近的三条记录组件，由父组件page.js初始化时，接收props，并进行显示。

pages/api/submit-form，api接口，接收表单请求，并发起查询，然后将最终查询结果插入数据库，然后下发路由让页面加载result.js

app/result/page页面，从浏览器中获取domainname参数（为什么不能从全局变量中获取？），然后将其下发给DomainTable和TopLevelDomainQueryResults组件。
DomainTable,网站结果显示页面详情页面
TopLevelDomainQueryResults,其他顶级域名后缀的注册情况，支持点击快速更新结果页面。
app/lib，数据库查询，链接，删除，以及向第三方api查询域名详情情况等内容。


# 哪些是服务端组件，哪些是客户端组件？
在 Next.js 中，组件的职责和环境通常决定了它们是否是服务器端组件或客户端组件。
以下是一些常见的约定和示例：
所有的page组件,page.js/jsx/ts/tsx，都是服务端组件，获取数据和服务器端渲染（SSR）。
lib文件下的库文件，都是服务端组件，包含数据获取或其他与服务器端交互的逻辑
app/ui或者app/components，是客户端组件

# 打版本 v8.1.0

# 下一版本的改造内容：
完全的next.js技术化，比如首页要支持客户端部分渲染，客户端发起api查询等等，取消form表单。
解决pages/api和结果页，重复发起请求问题，一次domain，两次查询
添加删除功能，添加数据库修改功能，增删改查完整的功能。
添加用户登录和状态管理，签到签退问题。
解决客户端控制面板提示bug问题
解决TP鼠标滑过去有样式变化问题

