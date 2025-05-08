// app/dashboard/page.js
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Please log in to access the dashboard.</div>;
  }

  return <div>Welcome, {session.user.email}!</div>;
}