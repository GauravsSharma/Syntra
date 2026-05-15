// app/dashboard/layout.tsx — Server Component (cookie check here)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardClient from '@/components/dashboard/DashboardClient';
import { useGetMetaData } from "@/hooks/useUser";
import InitialForm from "@/components/dashboard/InitialForm";
import DashboardContentWrapper from "@/components/dashboard/DashboardContentWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const metadata = {
  title: "Dashboard | Syntra AI ",
};

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_session")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/metadata`, {
    headers: {
      Cookie: `user_session=${token}`,
    },
    cache: "no-store",
  });
  const metadata = await res.json();
  if (!token) {
    redirect("/");
  }

  return (
    <div className={`${inter.className} bg-[#050509] min-h-screen font-sans text-zinc-100 flex selection:bg-zinc-800 antialiased w-full`}>
      {
        metadata.metadata ? <>
          <Sidebar />
          <DashboardClient />
          <DashboardContentWrapper>
            {children}
          </DashboardContentWrapper>
        </> : <>
          <InitialForm />
        </>
      }
    </div>
  );
}