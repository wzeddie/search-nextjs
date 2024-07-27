//auth组件的一部分，用于登录验证身份，必要要客户端组件，所以不能直接添加到layout.tsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

