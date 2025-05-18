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

export default function TransactionTable({ timePeriod, refreshFlag }) {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    if (!session?.user?.id) {
      console.warn("No session or user ID found.");
      return;
    }

    setLoading(true);

    const fromDate = timePeriod ? getFromDate(timePeriod) : null;

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
  }, [session?.user?.id, timePeriod, refreshFlag]);

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableCaption>
          {loading
            ? "Loading transactions..."
            : transactions.length === 0
            ? "No transactions found."
            : "A list of your recent transactions."}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 && !loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No transactions found for this time period.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((item) => (
              <TableRow
                key={item.id}
                className="border-b hover:bg-muted transition-colors"
              >
                <TableCell>
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      item.type === "expense"
                        ? "text-destructive"
                        : "text-green-600 dark:text-green-400"
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
