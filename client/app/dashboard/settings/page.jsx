
import WorkspaceSettings from "@/components/settings/WorkspaceSettings";
import TeamMembers from "@/components/settings/TeamMembers";
import DangerZone from "@/components/settings/Dangerzone";
import { cookies } from "next/headers";
import MainSettings from "@/components/settings/MainSettings";
// Mock data — replace with real DB/API calls

const teamMembers = []; // Empty = "No team members found"

export const metadata = {
  title: "Settings | OneMinute Support",
};

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch("http://localhost:5000/api/organization", {
    headers: { Cookie: cookieHeader },
  });
  const data = await res.json();
  const organization = data.organization

  const workspaceData = {
    name: organization.business_name,
    website: organization.website_url,
    language: "English",
    timezone: "UTC (GMT+0)",
  };

  return (
    <>
      <MainSettings workspaceData={workspaceData} />
    </>
  );
}