"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";

export default function AddToSavingDialog({ savings, onSuccess }) {
  const [selectedSavingId, setSelectedSavingId] = useState("");
  const [amountToAdd, setAmountToAdd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddMoney = async () => {
    if (!selectedSavingId || !amountToAdd || isNaN(amountToAdd)) {
      alert("Please select a saving and enter a valid amount.");
      return;
    }

    setLoading(true);

    // Fetch current saved_amount for selected saving
    const { data, error } = await supabase
      .from("savings")
      .select("saved_amount")
      .eq("id", selectedSavingId)
      .single();

    if (error) {
      alert("Failed to fetch saving data.");
      setLoading(false);
      return;
    }

    const newSavedAmount = Number(data.saved_amount) + Number(amountToAdd);

    // Update saved_amount
    const { error: updateError } = await supabase
      .from("savings")
      .update({ saved_amount: newSavedAmount })
      .eq("id", selectedSavingId);

    setLoading(false);

    if (updateError) {
      alert("Failed to update saving.");
    } else {
      setSelectedSavingId("");
      setAmountToAdd("");
      onSuccess?.();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4 ">Add Money to Saving</Button>
      </DialogTrigger>
      <DialogContent className={"sm:max-w-[425px]"}>
        <DialogHeader>
          <DialogTitle>Add Money to Saving</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Select
            value={selectedSavingId}
            onValueChange={setSelectedSavingId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a saving goal" />
            </SelectTrigger>
            <SelectContent>
              {savings.map((saving) => (
                <SelectItem key={saving.id} value={saving.id}>
                  {saving.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Amount to add"
            value={amountToAdd}
            onChange={(e) => setAmountToAdd(e.target.value)}
            min={0}
          />

          <Button
            onClick={handleAddMoney}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Adding..." : "Add Money"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
