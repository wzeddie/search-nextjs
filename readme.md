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

# v8.1.1，客户端取消form表单形式，数据处理统一api

1、首页通过API 路由和 Fetch API 
利用js的fetch api发起post请求，服务端接收请求发起查询，如果查询正常，则执行插入数据库，并下发数据。
fetch接收数据后，跳转结果页面并在URL中传递参数。
问题1：fetch 表单格式
在 Next.js 中处理表单数据时，FormData 对象发送的数据默认会使用 multipart/form-data 格式，而不是 JSON 格式。因此，在服务器端很难直接使用 req.body 获取数据。
multipart/form-data 格式是什么，为什么默认用这格式——媒体类型，文本、文件、二进制数据，与 application/x-www-form-urlencoded 和 application/json 等其他格式的主要区别
 fetch('/api/submit', {
      method: 'POST',
      body: formData//格式解析不了
    })

  const data = Object.fromEntries(formData.entries());
  fetch('/api/submit-form-2', {//对应后台api接口
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',//设置为服务端可以方便获取的接收格式
      },
      body: JSON.stringify(data),//json要转换为字符串类型
    })

问题2：NextRouter was not mounted.
父组件是服务端组件，子组件是客户端组件因为用了  const router = useRouter();提示错误：NextRouter was not mounted。
您应该始终从 app next/navigation 目录内的页面和组件中导入 useRouter ，而不是 next/router 在处理页面和组件时导入，这是next13版本之后。

import { useRouter } from 'next/navigation';

问题3：如何解决客户端传递数据。
在客户端收到domain数据后，跳转result.js,并将要查询的数据传递过去
  a、小且安全的数据，通过url方式传递 window.location.href = `/result?${queryParams}`;
  b、较大或包含非 URL 安全字符，启用缓存，result来读取
sessionStorage.setItem('domaindata', JSON.stringify(data));
window.location.href = '/result';
result页面来读取
const domainDataString = sessionStorage.getItem('domaindata');
   c、使用Next.js 中的 useRouter前端路由方式navigation
   router.push(
           '/result?user_domain=' + encodeURIComponent(JSON.stringify(data))
        );
        结果页的接收方式，并传递给组件，组件进行渲染。
  import { useSearchParams } from 'next/navigation'
  const searchParams = useSearchParams();
  const user_domain = searchParams.get('user_domain') || 'default';//在路由中获取参数


暂时屏蔽的结果页的批量查询问题

# v8.1.2，解决客户端URL明文传递data数据的问题
在api中增加服务端的内存控制，用于保存数据临时
然后，在 result 页中，通过唯一标识符获取存储在服务器端的参数：
最后，创建一个API来下发resutl的实际参数：
global.tempStorage = global.tempStorage || {};node.js支持全局变量
fechapi，什么时候相对URL，什么时候绝对URL。
学会全局变量
学会组件的条件渲染，初始化null，然后进行条件渲染
            {user_domain && <DomainTable user_domain={user_domain} />}
# v8.1.2-6.29版本，新增api，解决批量结果查询问题
新增sent-piliang-domain，通过获取全局变量实现global.tempUser_domain获取用户输入的域名。

# v8.1.3 添加loading页面，
解决需求，在结果页面等待时进行显示
当你使用 Next.js 的 dynamic() 函数来动态导入组件时，loading.tsx 可以作为默认导出来指定一个组件，这个组件将在被动态导入的组件加载完成之前显示。
完成添加网页骨架屏
page页面可以打牌


# v8.1.4下一步，修复批量链接a元素支持点击
给a元素修改为导航，同时给a元素添加事件，点击后自动发起form的api，重新重定到result，从而实现快速查询的目的


待解决，为什么tploading的数学比domain还要慢，因为page页面获取fatch数据后，直接下发给domaintable，但是TP还要自己重新取获取下载。下一步，应该是result/page页面，同步获取请求需求。
待解决，为什么会多次请求。

GET / 200 in 429ms
api-received domainname: www.114.com
saved the tempStorage[uniqueId]  lxxetvql58rn4wtwg1t
 POST /api/submit-form-2 302 in 5654ms
 GET /result?user_domain=lxxetvql58rn4wtwg1t 200 in 140ms
sent-right-domain，get id: lxxetvql58rn4wtwg1t
 GET /api/sent-right-domain?user_domain=lxxetvql58rn4wtwg1t 200 in 9ms
sent-right-domain，get id: lxxetvql58rn4wtwg1t
 GET /api/sent-right-domain?user_domain=lxxetvql58rn4wtwg1t 304 in 12ms
解决了批量查询api问题

bug问题
客户端还会打印4次。
首页打开太慢，已解决开启了网络3G模式
批量查询结果a元素不能点击触发查询
完成 添加删除功能，添加数据库修改功能，增删改查完整的功能。
新增error，loading等页面
解决TP鼠标滑过去有样式变化问题

# 标记版本V8.2.0

# 下一版本的改造内容：

运行npm run bulid,next.JS部署生产时会校验各个变量和参数的类型。——这也是ts与js的主要区别。编译的时候会先校验类型，js不会校验。
在线github登录vercel，直接import看结果

上传生成环境vercel

安装
配置修改
上传
测试





# 空
解决pages/api和结果页，重复发起请求问题，一次domain，两次查询
添加用户登录和状态管理，签到签退问题。

默认情况下， app 目录中的所有组件都是服务器组件，但钩子仅在客户端可用。因此，您必须在涉及钩子的每个文件的顶部

1、将a元素用link代替:
link组件的常规用法，nav导航，页面之间路由，不需要重新加载页面。
在 Next.js 中，服务端组件不能直接使用客户端组件中的钩子（如 useRouter），这会导致 NextRouter was not mounted 的错误。
如何解决

除了这个钩子还有这些
Next.js 钩子
useRouter
用于访问路由对象，进行导航、获取路由参数等。因为它依赖于客户端的路由器环境，不能在服务端使用。
useSession（NextAuth.js）
用于访问当前的用户会话信息，这通常依赖于客户端的身份验证状态。
useSWR
用于数据获取和缓存。它依赖于客户端的请求和响应周期，因此在服务端渲染中不起作用。

React 钩子
useState
用于管理组件的本地状态。因为状态是客户端的概念，所以它依赖于浏览器环境。
useEffect
处理副作用（如数据获取、订阅、手动更改 DOM 等）。这些副作用只在客户端运行，因此 useEffect 不能在服务端使用。
useRef
创建一个可变的对象，其 .current 属性可以保存一个可变值。这个钩子主要用于直接访问 DOM 元素，因此依赖于浏览器环境。
useContext
用于订阅 React 上下文的变化。虽然这个钩子本身在服务端渲染中没有问题，但如果上下文值依赖于浏览器状态或副作用，就会出问题。
useLayoutEffect
与 useEffect 类似，但它在所有 DOM 变更后同步调用。这意味着它在服务端渲染时不会运行，因为服务端没有 DOM。

经验1：
如何以编程的方式使用导航navigation
如果要使用 app 目录中的服务器组件（Next.js 13 及更高版本附带），则必须在组件顶部添加 use client 指令才能使用钩子，如下所示：
"use client";
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  console.log(router);
  return <></>;
}
router.push("/some-destination");将新 URL 添加到历史记录堆栈中
router.replace("/some-target");不添加历史记录，无法通过点击浏览器的后退按钮返回
 back() 或 该 forward()
如何在服务端组件控制客户端导航链接
 import { redirect } from 'next/navigation'
    redirect('/login')

mongodb操作
// Select the database to use.
use('mydatabase');

// Insert a few documents into the sales collection.
//db.getCollection('searchdomain').deleteMany({});

db.getCollection('searchdomain').find();
