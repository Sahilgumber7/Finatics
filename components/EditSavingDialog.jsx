import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPen } from "react-icons/fa6";
import { useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function EditSavingDialog({ saving, onUpdate }) {
  const [title, setTitle] = useState(saving.title);
  const [targetAmount, setTargetAmount] = useState(saving.target_amount);
  const [savedAmount, setSavedAmount] = useState(saving.saved_amount);
  const [open, setOpen] = useState(false);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("savings")
      .update({
        title,
        target_amount: Number(targetAmount),
        saved_amount: Number(savedAmount),
      })
      .eq("id", saving.id);

    if (!error) {
      onUpdate?.();
      setTimeout(() => setOpen(false), 2000);
    } else {
      alert("Failed to update saving.");
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
          <DialogTitle>Edit Saving</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <Input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="Target Amount"
          />
          <Input
            type="number"
            value={savedAmount}
            onChange={(e) => setSavedAmount(e.target.value)}
            placeholder="Saved Amount"
          />
          <Button onClick={handleUpdate} className="w-full">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
