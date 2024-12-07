import LoginPage from "@/app/login/page";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <LoginPage />
      <Link href="/register">registrarme</Link>
    </main>
  );
}
