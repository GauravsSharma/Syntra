import React from 'react'
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from '@/components/dashboard/Sidebar';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const DashboardLayout = async ({ children }) => {
  const cookieStore = await cookies(); // ✅ awaited
  const token = cookieStore.get("user_session")?.value;

  if (!token) {
    redirect("/");
  }

  return (
    <div className={`${inter.className} bg-[#050509] min-h-screen font-sans text-zinc-100 flex selection:bg-zinc-800 antialiased w-full`}>
      <Sidebar />
     <div className='w-full'>
       {children}
     </div>
    </div>
  );
};

export default DashboardLayout;