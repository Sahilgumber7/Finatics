"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { addTransaction } from "@/lib/db/transactions";

export default function AddTransactionDialog({ onTransactionAdded }) {
  const { data: session } = useSession();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // dialog control

  const handleAdd = async () => {
    if (!session?.user?.id) return alert("User not authenticated.");
    if (!amount || isNaN(amount)) return alert("Enter a valid amount.");
    if (!category) return alert("Please select a category.");

    setLoading(true);
    try {
      await addTransaction({
        user_id: session.user.id,
        amount: parseFloat(amount),
        type,
        description,
        category,
      });

      // Reset form
      setAmount("");
      setType("income");
      setDescription("");
      setCategory("");
      onTransactionAdded?.();

      // Auto-close dialog after 2 seconds
      setTimeout(() => setOpen(false), 2000);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 500"
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <ToggleGroup
              type="single"
              value={type}
              onValueChange={(val) => val && setType(val)}
              className="w-full"
            >
              <ToggleGroupItem
                value="income"
                className="w-full data-[state=on]:bg-black data-[state=on]:text-white"
              >
                Income
              </ToggleGroupItem>
              <ToggleGroupItem
                value="expense"
                className="w-full data-[state=on]:bg-black data-[state=on]:text-white"
              >
                Expense
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Salary, Groceries"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Salary">Salary</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <Button onClick={handleAdd} disabled={loading} className="w-full">
          {loading ? "Adding..." : "Add Transaction"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
