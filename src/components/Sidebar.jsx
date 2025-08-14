import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, 
  faCalendarDay, 
  faUser, 
  faSignOutAlt,
  faServer
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ guilds, user }) {
  return (
    <div className="w-64 bg-gray-900 min-h-screen flex flex-col">
      <div className="p-4 flex items-center space-x-2">
        <div className="bg-gray-800 p-2 rounded-lg">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
        </div>
        <span className="text-xl font-bold text-white">Bot Dashboard</span>
      </div>

      <div className="p-4">
        <h2 className="text-gray-400 text-sm font-bold uppercase mb-2">Servers</h2>
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {guilds?.map(guild => (
            <Link key={guild.id} href={`/server/${guild.id}`}>
              <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
                {guild.icon ? (
                  <img
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                    alt={guild.name}
                    className="h-8 w-8 rounded-full mr-2"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                    <span className="text-xs">{guild.name.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <p className="text-white font-medium">{guild.name}</p>
                  <p className="text-gray-400 text-xs">{guild.id}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4 space-y-2">
        <Link href="/daily">
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
            <FontAwesomeIcon icon={faCalendarDay} className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-white">Daily</span>
          </div>
        </Link>
        <Link href="/profile">
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
            <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-white">Profile</span>
          </div>
        </Link>
        <Link href="/api/auth/signout">
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
            <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-white">Logout</span>
          </div>
        </Link>
      </div>
    </div>
  );
}