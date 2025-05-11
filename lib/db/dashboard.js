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


export async function getLast30DaysTransactions(userId) {
  const today = new Date();
  const last30Days = new Date();
  last30Days.setDate(today.getDate() - 30);

  const { data, error } = await supabase
    .from("transactions")
    .select("amount, type, created_at")
    .eq("user_id", userId)
    .gte("created_at", last30Days.toISOString()) // filter transactions from the last 30 days
    .order("created_at", { ascending: true });

  if (error) throw new Error("Failed to fetch transactions");

  return data;
}

export function groupTransactionsByDay(transactions) {
  const groupedData = {};

  transactions.forEach((txn) => {
    const date = new Date(txn.created_at).toLocaleDateString(); // Format date to YYYY-MM-DD
    if (!groupedData[date]) {
      groupedData[date] = { income: 0, expense: 0 };
    }
    if (txn.type === "income") groupedData[date].income += txn.amount;
    if (txn.type === "expense") groupedData[date].expense += txn.amount;
  });

  return groupedData;
}



