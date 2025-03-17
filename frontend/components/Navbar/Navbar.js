"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link href="/" className="text-xl font-bold text-[#8E7754]">
        My Celebrant Charles
      </Link>
      <div className="space-x-6">
        <Link href="/" className="hover:text-[#8E7754] transition">
          Home
        </Link>
        <Link href="/ceremony" className="hover:text-[#8E7754] transition">
          Ceremony Script
        </Link>
        {/* <Button className="bg-[#8E7754] text-white hover:bg-[#C19A6B] transition">Contact</Button> */}
      </div>
    </nav>
  );
}
