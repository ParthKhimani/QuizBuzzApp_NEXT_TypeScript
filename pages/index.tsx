import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h3>
        Navigate to <Link href="/dashboard">Dashboard</Link>
      </h3>
    </>
  );
}
