import { cookies } from "next/headers";
import Sidebar from "@/components/sidebar";

interface AuthUser {
  username: string;
  displayName: string;
  department: string;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const raw = cookieStore.get("user")?.value;
  const user: AuthUser | null = raw ? JSON.parse(decodeURIComponent(raw)) : null;

  return (
    <>
      <Sidebar user={user} />
      {children}
    </>
  );
}