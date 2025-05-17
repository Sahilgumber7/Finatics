"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa6";
import supabase from "@/lib/supabaseClient";

export default function DeleteSavingDialog({ savingId, onDelete }) {
  const handleDelete = async () => {
    const { error } = await supabase.from("savings").delete().eq("id", savingId);

    if (!error) {
      onDelete?.();
    } else {
      alert("Failed to delete saving.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon" aria-label="Delete saving">
          <FaTrash className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this saving goal?</p>
        <Button variant="destructive" onClick={handleDelete}>
          Confirm Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
