"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"; 
import { IoMdLogOut } from "react-icons/io";

export default function LogoutButton() {
  return (
    <Button variant="transparent" onClick={() => signOut({ callbackUrl: "/" })}>
      <IoMdLogOut className=' size-6 text-red-600 text-bold' />
    </Button>
  );
}
