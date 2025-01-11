import LoginPage from "@/app/login/page";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-screen">
      <LoginPage className="w-full h-full flex" />
      <Link href="/register" className="my-4 text-blue-500 self-center">
        Registrarme
      </Link>
    </main>
  );
}
