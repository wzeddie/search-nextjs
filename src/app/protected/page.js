//创建一个受保护的页面
import { useSession, signIn, signOut } from "next-auth/react";

export default function ProtectedPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <h1>Protected Page</h1>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>You are not signed in</p>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
