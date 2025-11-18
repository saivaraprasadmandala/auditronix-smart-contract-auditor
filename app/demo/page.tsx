"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DemoRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home with the section query param
    router.replace("/?section=live-demo");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="flex items-center gap-2 text-emerald-400">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading demo...</span>
      </div>
    </div>
  );
}