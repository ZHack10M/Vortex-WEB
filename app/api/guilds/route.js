import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    // Get user guilds from Discord
    const userGuildsRes = await fetch("https://discord.com/api/v10/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!userGuildsRes.ok) {
      throw new Error("Failed to fetch user guilds");
    }

    const userGuilds = await userGuildsRes.json();

    // Filter guilds where user has ADMIN permission (0x8)
    const adminGuilds = userGuilds.filter(guild => (guild.permissions & 0x8) === 0x8);

    // Check which guilds the bot is in
    const botToken = process.env.DISCORD_BOT_TOKEN;
    const botGuilds = [];

    // Check bot presence sequentially to avoid rate limits
    for (const guild of adminGuilds) {
      try {
        const botGuildRes = await fetch(`https://discord.com/api/v10/guilds/${guild.id}`, {
          headers: {
            Authorization: `Bot ${botToken}`,
          },
        });

        if (botGuildRes.ok) {
          botGuilds.push(guild);
        }
      } catch (error) {
        console.error(`Error checking bot in guild ${guild.id}:`, error);
      }
    }

    return new Response(JSON.stringify(botGuilds.map(g => ({
      id: g.id,
      name: g.name,
      icon: g.icon,
    }))), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}