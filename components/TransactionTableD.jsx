"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import supabase from "@/lib/supabaseClient";
import Link from "next/link";

export default function TransactionTableDashboard() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLatestTransactions = async () => {
    if (!session?.user?.id) {
      console.warn("No session or user ID found.");
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Error fetching latest transactions:", error.message);
      setTransactions([]);
    } else {
      setTransactions(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchLatestTransactions();
  }, [session?.user?.id]);

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 && !loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No transactions found.
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="p-4 text-right">
        <Link
          href="/transactions"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          View All Transactions &rarr;
        </Link>
      </div>
    </div>
  );
}
