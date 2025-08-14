"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Toast from "@/components/Toast";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const loadUserData = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${session.user.id}`);
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
      } else {
        setToast({ message: data.error || "Failed to load user data", type: "error" });
      }
    } catch (error) {
      setToast({ message: "Network error", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      loadUserData();
    }
  }, [session]);

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">User Profile</h2>
      <button
        onClick={loadUserData}
        disabled={loading}
        className="bg-primary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
      >
        {loading ? "Loading..." : "Reload My Data"}
      </button>
      {userData && (
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-white">
          {JSON.stringify(userData, null, 2)}
        </pre>
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}