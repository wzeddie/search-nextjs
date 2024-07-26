import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "../../../../lib/prisma"; // 假设你在 lib 文件夹中配置了 Prisma 实例

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // 更多的 providers 可以在这里添加
  ],
  // adapter: PrismaAdapter(prisma),
  // secret: process.env.SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
