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
import { FaPen, FaTrash } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import supabase from "@/lib/supabaseClient"; 
import { getFromDate, getFormattedDate } from "@/lib/db/transactions";

export default function TransactionTable({ timePeriod }) {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      if (!session?.user?.id) return;
  
      setLoading(true);
      const fromDate = getFromDate(timePeriod); // Get the start date based on time period
      const formattedFromDate = getFormattedDate(fromDate); // Format to ISO string
  
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", session.user.id)
        .gte("created_at", formattedFromDate) // Fetch transactions since the formatted date
        .order("created_at", { ascending: false });
  
      if (error) {
        console.error("Error fetching transactions:", error.message);
      } else {
        setTransactions(data);
      }
      setLoading(false);
    }
  
    fetchTransactions();
  }, [session?.user?.id, timePeriod]); // Re-fetch when timePeriod or session changes

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableCaption>
          {loading ? "Loading transactions..." : "A list of your recent transactions."}
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
              <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell className="text-right">
                <span
                  className={item.type === "expense" ? "text-red-500" : "text-green-600"}
                >
                  ₹{Math.abs(item.amount)}
                </span>
              </TableCell>
              <TableCell className="flex justify-center gap-2 py-2">
                <Button variant="outline" size="icon">
                  <FaPen className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon">
                  <FaTrash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

