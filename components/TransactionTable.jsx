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
import { transactionsList } from "@/app/utils/Transactionlist";

export default function TransactionTable() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
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
          {transactionsList.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.desc}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell className="text-right">
                <span
                  className={item.amount < 0 ? "text-red-500" : "text-green-600"}
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
