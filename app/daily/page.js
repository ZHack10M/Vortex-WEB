"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Toast from "@/components/Toast";

export default function DailyPage() {
  const { data: session } = useSession();
  const [toast, setToast] = useState(null);

  const claimDaily = async () => {
    if (!session) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/daily/${session.user.id}`, {
        method: "POST",
      });

      const data = await response.json();
      if (response.ok) {
        setToast({ message: `Claimed ${data.amount} coins!`, type: "success" });
      } else {
        setToast({ message: data.error || "Failed to claim daily", type: "error" });
      }
    } catch (error) {
      setToast({ message: "Network error", type: "error" });
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Daily Reward</h2>
      <button
        onClick={claimDaily}
        className="bg-primary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg w-full"
      >
        Claim Daily
      </button>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}