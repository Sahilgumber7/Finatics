import CreditCard from "@/components/CreditCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="text-center mt-20 text-lg text-gray-700">Please log in to access the dashboard.</div>;
  }

  return (
    <div className="pt-8 px-12">
      <h1 className="text-2xl font-semibold text-gray-900">
        Welcome, {session.user.email}!
      </h1>
      <CreditCard />
    </div>
  );
}
