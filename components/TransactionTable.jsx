"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import supabase from "@/lib/supabaseClient";
import { getFromDate } from "@/lib/db/transactions";
import EditTransactionDialog from "./EditTransactionDialog";
import DeleteTransactionDialog from "./DeleteTransactionDialog";

export default function TransactionTable({ timePeriod }) {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    if (!session?.user?.id) return;
    setLoading(true);

    const fromDate = getFromDate(timePeriod);
    let query = supabase
      .from("transactions")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (fromDate) {
      query = query.gte("created_at", fromDate.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching transactions:", error.message);
    } else {
      setTransactions(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, [session?.user?.id, timePeriod]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableCaption>
          {loading
            ? "Loading transactions..."
            : "A list of your recent transactions."}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((item) => (
            <TableRow key={item.id} className="border-b hover:bg-gray-50">
              <TableCell>
                {new Date(item.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell className="text-right">
                <span
                  className={
                    item.type === "expense"
                      ? "text-red-500"
                      : "text-green-600"
                  }
                >
                  ₹{Math.abs(item.amount)}
                </span>
              </TableCell>
              <TableCell className="flex justify-center gap-2 py-2">
                <EditTransactionDialog
                  transaction={item}
                  onUpdate={fetchTransactions}
                />
                <DeleteTransactionDialog
                  transactionId={item.id}
                  onDelete={fetchTransactions}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
