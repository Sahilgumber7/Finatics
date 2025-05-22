"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Progress } from "@/components/ui/progress";

export default function SavingsPreview() {
  const { data: session } = useSession();
  const [savings, setSavings] = useState([]);

  useEffect(() => {
    const fetchSavings = async () => {
      if (!session?.user?.id) return;
      const { data, error } = await supabase
        .from("savings")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (!error) {
        setSavings(data.slice(0, 5)); // Limit to 5 savings
      } else {
        console.error("Error fetching savings:", error);
      }
    };

    fetchSavings();
  }, [session]);

  if (!savings.length) return null;

  const totalSaved = savings.reduce((sum, s) => sum + s.saved_amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Top 5 Savings
        </h3>
        <a
          href="/pages/savings"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          View All
        </a>
      </div>

      {savings.map((saving) => {
        const percent =
          saving.target_amount > 0
            ? (saving.saved_amount / saving.target_amount) * 100
            : 0;

        return (
          <div key={saving.id}>
            <div className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">
              {saving.title}
            </div>
            <Progress value={percent} className="h-2" />
          </div>
        );
      })}
    </div>
  );
}
