"use client";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteTransaction } from "@/lib/db/transactions";
import { FaTrash } from "react-icons/fa6";

export default function DeleteTransactionDialog({ transactionId, onDelete }) {
  const handleDelete = async () => {
    await deleteTransaction(transactionId);
    onDelete();
  };

  return (
    <Dialog>
        
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <FaTrash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-4">
      <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        
        <p>Are you sure you want to delete this transaction?</p>
        <Button variant="destructive" onClick={handleDelete}>
          Confirm Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
