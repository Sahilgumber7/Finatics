"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import  supabase from "@/lib/supabaseClient"; 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";


export default function NewSavingDialog({ onSuccess }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("");

  const handleSubmit = async () => {
    if (!title || !targetAmount || !savedAmount || !session?.user?.id) return;

    const { error } = await supabase.from("savings").insert({
      user_id: session.user.id,
      title,
      target_amount: parseFloat(targetAmount),
      saved_amount: parseFloat(savedAmount),
    });

    if (!error) {
      setOpen(false);
      setTitle("");
      setTargetAmount("");
      setSavedAmount("");
      onSuccess?.(); // Refresh savings list
    } else {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          className="h-36 w-full sm:w-64 border-dashed border-2 border-muted-foreground flex items-center justify-center cursor-pointer hover:shadow-md transition"
          role="button"
        >
          <Plus className="h-6 w-6 text-muted-foreground" />
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Saving Goal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>Target Amount</Label>
            <Input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
            />
          </div>
          <div>
            <Label>Saved Amount</Label>
            <Input
              type="number"
              value={savedAmount}
              onChange={(e) => setSavedAmount(e.target.value)}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
