import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Header({ user }) {
  return (
    <header className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center">
      <div></div>
      <div className="flex items-center space-x-4">
        {user && (
          <div className="flex items-center space-x-2">
            {user.avatar ? (
              <img
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                alt={user.username}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-xs">{user.username.charAt(0)}</span>
              </div>
            )}
            <span className="text-white">
              {user.username}#{user.discriminator}
            </span>
          </div>
        )}
        <Link href="/api/auth/signout">
          <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center">
            <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4 mr-1" />
            Logout
          </button>
        </Link>
      </div>
    </header>
  );
}