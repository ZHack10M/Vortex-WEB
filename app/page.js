import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Discord Bot Dashboard</h1>
        <p className="text-xl text-gray-300 mb-8">Manage your Discord bot with ease</p>
        <div className="space-x-4">
          {!session ? (
            <Link href="/api/auth/signin">
              <button className="bg-primary hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
                Login with Discord
              </button>
            </Link>
          ) : (
            <Link href="/server">
              <button className="bg-primary hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
                Open Dashboard
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}