"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import NewSavingDialog from "@/components/NewSavingDialog";
import AddToSavingDialog from "@/components/AddToSavingDialog";
import SavingsCard from "@/components/SavingsCard";
import supabase from "@/lib/supabaseClient";

export default function SavingsPage() {
  const { data: session } = useSession();
  const [savings, setSavings] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fetchSavings = async () => {
    if (!session?.user?.id) return;
    const { data, error } = await supabase
      .from("savings")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setSavings(data);
    } else {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSavings();
  }, [session, refreshFlag]);

  const handleSavingAdded = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div className="mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with title and AddToSavingDialog */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-medium text-gray-900">Your Savings</h2>
          <AddToSavingDialog savings={savings} onSuccess={handleSavingAdded} />
        </div>

        {/* Cards grid with savings cards + NewSavingDialog card */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {savings.map((saving) => (
            <SavingsCard key={saving.id} saving={saving} />
          ))}

          {/* NewSavingDialog shown as a card in the grid */}
          <NewSavingDialog onSuccess={handleSavingAdded} />
        </div>
      </div>
    </div>
  );
}
