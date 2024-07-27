// 动态路由，用于捕获以下参数
// /api/auth/signin
// /api/auth/callback
// /api/auth/signout
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // 可选：自定义页面
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // 错误页面
    verifyRequest: '/auth/verify-request', // 发送验证链接请求
    newUser: '/auth/new-user' // 新用户第一次登录后重定向
  },
});
