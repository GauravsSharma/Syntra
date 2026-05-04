// app/dashboard/layout.tsx — Server Component (cookie check here)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardClient from '@/components/dashboard/DashboardClient';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_session")?.value;

  if (!token) {
    redirect("/");
  }

  return (
    <div className={`${inter.className} bg-[#050509] min-h-screen font-sans text-zinc-100 flex selection:bg-zinc-800 antialiased w-full`}>
      <Sidebar />
      <div className='w-full lg:ml-54'>
        {/* Socket + Alert logic yahan */}
        <DashboardClient />
        {children}
      </div>
    </div>
  );
}