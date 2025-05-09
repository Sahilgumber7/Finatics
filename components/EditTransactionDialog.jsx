import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
  import { useState } from "react";
  import { FaPen } from "react-icons/fa6";
  import supabase from "@/lib/supabaseClient";
  
  export default function EditTransactionDialog({ transaction, onUpdate }) {
    const [description, setDescription] = useState(transaction.description);
    const [amount, setAmount] = useState(transaction.amount);
    const [type, setType] = useState(transaction.type);
    const [open, setOpen] = useState(false); // minimal open state
  
    const handleUpdate = async () => {
      const { error } = await supabase
        .from("transactions")
        .update({ description, amount, type })
        .eq("id", transaction.id);
  
      if (!error) {
        onUpdate?.();
        setTimeout(() => setOpen(false), 2000); // ⏱️ auto-close after 2 sec
      } else {
        alert("Failed to update transaction.");
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <FaPen className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            <Label>Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <div className="space-y-2">
  <Label>Type</Label>
  <ToggleGroup
    type="single"
    value={type}
    onValueChange={(val) => val && setType(val)}
    className="grid grid-cols-2 rounded-md overflow-hidden border"
  >
    <ToggleGroupItem
      value="income"
      className="py-2 text-center text-sm font-medium data-[state=on]:bg-black data-[state=on]:text-white"
    >
      Income
    </ToggleGroupItem>
    <ToggleGroupItem
      value="expense"
      className="py-2 text-center text-sm font-medium data-[state=on]:bg-black data-[state=on]:text-white"
    >
      Expense
    </ToggleGroupItem>
  </ToggleGroup>
</div>

            <Button className="w-full mt-3" onClick={handleUpdate}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  