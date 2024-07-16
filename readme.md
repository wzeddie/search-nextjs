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

服务端组件就是在服务端渲染的组件，使用 NextJS v13 的项目，只要是在 app 目录内的页面，全部默认为服务端组件
除非在组件里面添加use client命令，转换为客户端组件。注意点：服务端组件是在服务端运行的，所以就没有调用浏览器 API 的能力了，比如要使用类似于window.xxx、useState、useEffect等方法，需要在文件开头用“use client”声明。
服务端组件的三种渲染策略：静态渲染-比如静态博客，动态渲染——动态数据获取，用户cookie，URL参数等，流失渲染--块渲染产品评论信息，先看到页面预览 loading.js。

客户端组件的优势
交互性：客户端组件可以使用状态、效果和事件监听器，这意味着它们可以向用户提供即时反馈并更新用户界面。
浏览器 API：客户端组件可以访问浏览器 API，如 window，从而为特定用例构建用户界面。
不利于 SEO，因为搜索引擎可能只看到空的 HTML，而不是实际内容。
服务端组件的优势
数据获取：服务端组件具备完整的服务端能力，所以可以直接与数据库或其他数据源进行交互。这消除了需要从客户端到服务器的额外请求，从而加速了数据获取。
安全性：因为渲染是在服务器上进行的，所以你可以在服务器上使用敏感的 API 密钥或令牌，而不必担心它们被暴露给客户端用户。
缓存：服务端渲染的结果可以被缓存。这意味着对于经常被访问的页面，你可以存储已经渲染的HTML，从而快速地为后续的请求提供响应，而不必每次都重新渲染。
包大小：一些库或框架可能非常大，如果全部发送到客户端，会增加首次加载时间。通过在服务器上使用这些库，你可以避免增加客户端的包大小。
初始页面加载和首次内容绘制 (FCP)：服务端渲染的页面可以立即为用户提供可见的内容，而不必等待客户端JavaScript加载和执行。
搜索引擎优化和社交网络分享：服务端渲染的页面为搜索引擎提供了完整的HTML内容，这有助于提高SEO排名。此外，社交媒体平台也可以预览这些页面，从而提高分享的吸引力。
流式传输：这是一个更高级的优化。你可以将页面渲染分成多个部分，并在它们准备好时发送到客户端。这允许用户更早地看到部分内容，而不必等待整个页面在服务器上渲染完成。
服务端可以加载客户端组件，一般需要动态加载。但是客户端组件不能加载服务端组件。
假如一个组件需要交互，那么它只能是客户端组件。一般情况采取以下方式，实现这种场景：
在服务器组件中预获取用户数据。
将数据作为 props 传递给客户端组件。
为了使这个过程有效且无错误，从服务器组件传递给客户端组件的 props 必须是可序列化的。
什么是可序列化，可序列化（Serializable）意味着数据可以被转换成一种格式，这种格式可以被网络传输，并且在另一端可以被反序列化，恢复成原始数据结构。比如JSON.stringify() ——转变为字符串与 JSON.parse() ——转变为json对象
当你从服务端组件向客户端组件传递 props 时，这些数据需要在服务器上生成并序列化，然后通过网络发送到客户端，最后在客户端上反序列化以供使用。不能被序列化的函数，正则表达式，datatime对象。

客户端组件不能直接加载服务端组件。
'use client'
// You cannot import a Server Component into a Client Component.
import ServerComponent from './Server-Component'
正确用法，创建一个中间页面，分别调用客户端组件和服务端组件。服务端组件作为客户端的参数props下发。
// This pattern works:
// You can pass a Server Component as a child or prop of a
// Client Component.
import ClientComponent from './client-component'
import ServerComponent from './server-component'
 
// Pages in Next.js are Server Components by default
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />//服务端组件可以作为
    </ClientComponent>
  )
}

客户端组件代码：
'use client'
import { useState } from 'react'
export default function ClientComponent({
  children,
}: {
  children: React.ReactNode//期望接收任何可以作为 React 节点的子元素
}) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {children}//子元素会在这渲染加载
    </>
  )
}
React.ReactNode 是 React 中的一个类型，它代表所有可以被渲染的元素类型。这包括：

string
number
ReactElement 或任何 React 组件的实例
ReactFragment
boolean（在渲染时会被忽略）
null

假如客户端组件想要获取数据，如何请求：
路由处理程序：在 NextJS 中，你可以使用 API 路由来在服务器上获取数据，并从客户端使用 AJAX 请求进行调用。

随着 Web 技术的发展，现在有多种方式可以实现 AJAX 功能：
XMLHttpRequest：这是 AJAX 最初和最传统的实现方式。它是一个 JavaScript 对象，允许你发起 HTTP 请求并与服务器交换数据。
Fetch API：是现代浏览器提供的基于 Promise 的 API，用于发起 HTTP 请求。Fetch API 提供了更简洁的语法和更强大功能，逐渐成为实现 AJAX 的首选方式。
jQuery.ajax：如果你使用 jQuery 库，$.ajax 方法提供了一个更高级的接口来执行 AJAX 请求，它封装了 XMLHttpRequest 的复杂性，并提供了更多的配置选项和方便的回调处理。
其他第三方库和框架：许多现代前端框架和库（如 Axios、Angular 的 HttpClient 等）提供了自己的 AJAX 请求方法，它们通常提供了更易用的接口和额外的功能，如请求取消、自动转换 JSON 等。

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

# 运行npm run bulid进行部署
1、这个npm run bulid构建过程会执行以下步骤：

编译源代码。
执行类型检查（如果使用 TypeScript）。next.JS部署生产时会校验各个变量和参数的类型。——这也是ts与js的主要区别。编译的时候会先校验类型，js不会校验。
优化代码，包括代码分割、压缩等。
生成静态资源，如 HTML、CSS 和 JavaScript 文件。
准备服务端渲染所需的数据和代码。

2、成功build后，会显示：
Creating an optimized production build ...
这表示 Next.js 正在创建一个优化的生产环境构建。
Compiled successfully
编译成功，没有编译错误。
Linting and checking validity of types
代码已经通过 linting（代码风格检查）和类型验证（TypeScript 类型检查）。
Collecting page data
Next.js 正在收集页面数据，这通常用于动态路由或需要获取数据的页面。
Generating static pages
Next.js 生成了静态页面。静态页面是预渲染的，可以提高加载速度和SEO（搜索引擎优化）。
Collecting build traces
收集构建跟踪信息，用于分析和优化构建过程。
Finalizing page optimization
完成页面优化，Next.js 可能进行了代码分割、压缩等优化措施。
Route (app)
这是 Next.js 14 引入的新概念，用于定义应用的路由。app 目录下的文件可以覆盖默认的行为。
Size: 路由的静态生成大小。
First Load JS: 页面首次加载时需要执行的 JavaScript 代码大小。
Route (pages)
这是传统的 Next.js 页面路由。pages 目录下的每个文件都对应一个路由。
Static vs. Dynamic Routes
○ (Static): 表示该路由是静态的，已经被预渲染为静态内容。这意味着页面在构建时生成，并且可以在没有服务器的情况下提供服务，适合内容不经常变化的页面。
ƒ (Dynamic): 表示该路由是动态的，会根据请求在服务器上渲染。这适用于需要根据用户输入或数据库内容动态生成的页面。
Shared chunks
表示多个页面共享的 JavaScript 代码块。Next.js 会尝试重用代码以减少总体加载的 JavaScript 大小。
chunks/...
构建过程中生成的 JavaScript 文件，每个文件都有一个唯一的哈希值，用于缓存和版本控制。
First Load JS shared by all
所有页面首次加载时共享的 JavaScript 代码大小。

3、在执行 npm run build 命令后，会在 .next 目录下生成多个文件夹和文件，每个都有特定的功能。
sharedLibs:包含共享库的代码，这些库被多个页面或组件共享，以减少加载时间和重复编译。
server:包含服务器端渲染所需的文件。如果你使用了 Next.js 的服务器端渲染功能，这部分代码会在服务器上执行。
static:包含静态文件，如图片、字体等。这些文件在构建过程中被复制到 .next/static 目录下。
chunks:包含 JavaScript 代码块（chunks）。这些代码块是经过代码分割和压缩的，用于按需加载和缓存优化。
build-manifest.json:构建清单文件，记录了页面和它们的依赖关系，以及页面的静态资源。
preload-scripts:包含预加载脚本，这些脚本用于在页面加载前预先加载资源，以提高页面加载速度。
reports:包含构建报告，如性能分析报告，可以帮助你了解应用的加载时间和优化点。
cache:包含缓存数据，Next.js 使用这个缓存来提高构建速度和性能。
dist:如果使用了 next export 命令，这个目录将包含导出的静态网站文件。
tsconfig:如果项目使用了 TypeScript，这个目录可能包含 TypeScript 的配置文件，用于构建过程中的类型检查。


# 部署到vercel
在线github登录vercel，直接import看结果，上传生成环境vercel，部署也是成功的，但是无法进入resutl页面
安装vercel dev，看情况，能正常运行并访问
部署到生产环境，查看vercel。
GET https://lean-domain.online/result?user_domain=lya3pxvutp74c05ryjr net::ERR_CONNECTION_REFUSED
生成环境下，不能使用测试环境的域名，需要按生产的域名修改
https://lean-domain.online/

部署外网的过程，写到notion，兴趣爱好中lean-domain部署过程
部署方法，先build，自动检查ts的语法问题，然后在推送git上。
# 丰富网站内容
logo问题 -完成 https://ray.so/icon?q=web，在线logo制作


# 讲清楚 Next.js 里的 CSR, SSR, SSG 和 ISR
服务端组件就是在服务端渲染的组件，但是哪些渲染是有利于SEO的
客户端渲染（CSR），Next.js 中在 useEffect() 中请求数据就属于 CSR
SSR，Next.js 中，要使用服务器端渲染，需要导出一个名为 getServerSideProps 的异步函数。服务器将在每次请求页面时优先调用该函数。虽然 getServerSideProps 依然可用，在 Next.js 13 的新 App Router 中，引入了一个新的数据获取方法，称为 Server Actions，这些方法可以在服务器端直接调用。

SSG，静态页面渲染，特别是带数据的静态页面。只要页面内使用了getStaticProps，那么 Next.js 都将在 build 时调用并获取数据，然后把数据传给客户端（即 Blog 组件），最后把客户端代码打包成 HTML。或者，页面路径依赖数据，要同时使用getStaticProps和getStaticPaths完成构建时的数据拉取。——不适合内容经常变动或需要实时更新的应用。
增量静态生成 (ISR)，使用 getStaticProps，核心就在于revalidate和fallback。revalidate设置的时间间隔后再次运行getStaticProps
如何选择合适的渲染策略建议
高度交互的应用：如果你正在开发一个如单页应用（SPA）那样高度交互的应用，CSR 可能是最佳选择。一旦页面加载，用户的任何交互都将非常迅速，无需再次从服务器加载内容。
需要 SEO 优化的应用：如果你的应用依赖于搜索引擎优化，SSR 或 SSG 是更好的选择。这两种方法都会提供完整的 HTML，有助于搜索引擎索引。
内容静态但更新频繁的网站：例如博客或新闻网站，ISR 是一个很好的选择。它允许内容在背景中更新，而用户仍然可以快速访问页面。
内容基本不变的网站：对于内容很少或根本不更改的网站，SSG 是最佳选择。一次生成，无需再次渲染，提供了最快的加载速度。
混合内容的应用：Next.js 允许你在同一个应用中混合使用不同的渲染策略。例如，你可以使用 SSR 渲染首页，使用 SSG 渲染博客部分，而使用 CSR 渲染用户交互部分。

你可以使用 SSR 渲染首页，使用 SSG 渲染博客部分，而使用 CSR 渲染用户交互部分。

about us
help
contact
pricing-收费服务，接入ai定制化生成lean域名
privacy
https://logodiffusion.com/contact.html，参考目标网址

© 2023 Logo Diffusion. All rights reserved.
接入外联地址，git，x，facebook等



下一版本的改造内容：

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
