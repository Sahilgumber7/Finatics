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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { addTransaction } from "@/lib/db/transactions";

export default function AddTransactionDialog({ onTransactionAdded }) {
  const { data: session } = useSession();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
          {/* Amount Input */}
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

          {/* Type Toggle */}
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
  className="w-full data-[state=on]:bg-black data-[state=on]:text-white dark:data-[state=on]:bg-white dark:data-[state=on]:text-black"
>
  Income
</ToggleGroupItem>
<ToggleGroupItem
  value="expense"
  className="w-full data-[state=on]:bg-black data-[state=on]:text-white dark:data-[state=on]:bg-white dark:data-[state=on]:text-black"
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

          {/* Category Select */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {["Food", "Transportation", "Shopping", "Bills", "Salary", "Others"].map(
                  (cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit Button */}
        <Button onClick={handleAdd} disabled={loading} className="w-full">
          {loading ? "Adding..." : "Add Transaction"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
