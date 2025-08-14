import "./globals.css";
import Providers from "@/components/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { fetchGuilds } from "@/app/api/guilds/route";

export const metadata = {
  title: "Vortex Bot",
  description: "Manage your Discord bot",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  let guilds = [];
  if (session) {
    guilds = await fetchGuilds(session.accessToken);
  }

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          {session ? (
            <div className="flex">
              <Sidebar guilds={guilds} user={session.user} />
              <div className="flex-1 flex flex-col min-h-screen">
                <Header user={session.user} />
                <main className="flex-1 p-4 bg-gray-900">{children}</main>
              </div>
            </div>
          ) : (
            <main>{children}</main>
          )}
        </Providers>
      </body>
    </html>
  );
}