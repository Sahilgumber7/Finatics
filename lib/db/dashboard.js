// lib/db/dashboard.js

import supabase from "@/lib/supabaseClient";

export async function getUserTransactions(userId) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error("Failed to fetch transactions");
  return data;
}

export function calculateTotals(transactions) {
  let income = 0;
  let expense = 0;

  for (const txn of transactions) {
    if (txn.type === "income") income += Number(txn.amount);
    if (txn.type === "expense") expense += Number(txn.amount);
  }

  const balance = income - expense;
  return { income, expense, balance };
}
