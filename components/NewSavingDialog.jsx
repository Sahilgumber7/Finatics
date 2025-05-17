"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabaseClient";
import { useSession } from "next-auth/react";
import { DialogClose } from "@radix-ui/react-dialog";

export default function NewSavingDialog({ onSuccess }) {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("");
  const closeRef = useRef(null);

  const handleCreate = async () => {
    if (!session?.user?.id) return;

    const { error } = await supabase.from("savings").insert([
      {
        user_id: session.user.id,
        title,
        target_amount: Number(targetAmount),
        saved_amount: Number(savedAmount),
      },
    ]);

    if (!error) {
      setTitle("");
      setTargetAmount("");
      setSavedAmount("");
      onSuccess?.();

      setTimeout(() => {
        closeRef.current?.click(); // trigger DialogClose
      }, 2000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="h-[170px] border-dashed border-2 cursor-pointer hover:opacity-80 transition">
          <CardContent className="flex items-center justify-center h-full">
            <Plus className="w-6 h-6 text-muted-foreground" />
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Saving Goal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Goal title (e.g. New Car)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Target amount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            type="number"
          />
          <Input
            placeholder="Saved amount"
            value={savedAmount}
            onChange={(e) => setSavedAmount(e.target.value)}
            type="number"
          />
          <Button onClick={handleCreate}>Create</Button>
        </div>
        <DialogClose asChild>
          <button ref={closeRef} className="hidden" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
