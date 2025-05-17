'use client';
import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import NewSavingDialog from "@/components/NewSavingDialog";
import SavingsCard from "@/components/SavingsCard";
import supabase from "@/lib/supabaseClient"; // Adjust the import based on your project structure

export default function SavingsPage() {
  const { data: session } = useSession();
  const [savings, setSavings] = useState([]);

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
  }, [session]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Savings</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <NewSavingDialog onSuccess={fetchSavings} />
        {savings.map((saving) => (
          <SavingsCard key={saving.id} saving={saving} />
        ))}
      </div>
    </div>
  );
}
