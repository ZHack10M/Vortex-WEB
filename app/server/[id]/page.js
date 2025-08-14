"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faUserPlus,
  faComments,
  faBan,
  faKick,
  faPrune,
} from "@fortawesome/free-solid-svg-icons";
import Toast from "@/components/Toast";

export default function GuildSettingsPage() {
  const { id: guildId } = useParams();
  const [activeTab, setActiveTab] = useState("security");
  const [toast, setToast] = useState(null);
  const [autoroleId, setAutoroleId] = useState("");
  const [greetChannelId, setGreetChannelId] = useState("");
  const [greetMessage, setGreetMessage] = useState("");

  const toggleSecurity = async (type, state) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/security/${type}/${guildId}/${state}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setToast({ message: data.message, type: "success" });
      } else {
        setToast({ message: data.message || "Failed to update", type: "error" });
      }
    } catch (error) {
      setToast({ message: "Network error", type: "error" });
    }
  };

  const setAutorole = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/autorole/${guildId}/${autoroleId}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setToast({ message: `Autorole set to ${data.roleId}`, type: "success" });
      } else {
        setToast({ message: data.message || "Failed to set autorole", type: "error" });
      }
    } catch (error) {
      setToast({ message: "Network error", type: "error" });
    }
  };

  const disableAutorole = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/autorole/${guildId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setToast({ message: data.message, type: "success" });
      } else {
        setToast({ message: data.message || "Failed to disable autorole", type: "error" });
      }
    } catch (error) {
      setToast({ message: "Network error", type: "error" });
    }
  };

  const setGreet = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/greet/${guildId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channelId: greetChannelId, message: greetMessage }),
      });
      const data = await response.json();
      if (response.ok) {
        setToast({ message: "Greet message set!", type: "success" });
      } else {
        setToast({ message: data.error || "Failed to set greet", type: "error" });
      }
    } catch (error) {
      setToast({ message: "Network error", type: "error" });
    }
  };

  const disableGreet = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/greet/${guildId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setToast({ message: data.message, type: "success" });
      } else {
        setToast({ message: data.error || "Failed to disable greet", type: "error" });
      }
    } catch (error) {
      setToast({ message: "Network error", type: "error" });
    }
  };

  return (
    <div>
      <div className="flex border-b border-gray-700 mb-4">
        <button
          className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === "security" ? "bg-gray-800 text-primary border-b-2 border-primary" : "text-gray-400 hover:text-white"}`}
          onClick={() => setActiveTab("security")}
        >
          <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
          Security
        </button>
        <button
          className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === "autorole" ? "bg-gray-800 text-primary border-b-2 border-primary" : "text-gray-400 hover:text-white"}`}
          onClick={() => setActiveTab("autorole")}
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
          Autorole
        </button>
        <button
          className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === "greet" ? "bg-gray-800 text-primary border-b-2 border-primary" : "text-gray-400 hover:text-white"}`}
          onClick={() => setActiveTab("greet")}
        >
          <FontAwesomeIcon icon={faComments} className="mr-2" />
          Greet
        </button>
      </div>

      {activeTab === "security" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faBan} className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="text-xl font-bold text-white">Anti Ban</h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleSecurity("antiban", "true")}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Enable
              </button>
              <button
                onClick={() => toggleSecurity("antiban", "false")}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Disable
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faKick} className="h-6 w-6 text-yellow-500 mr-2" />
              <h3 className="text-xl font-bold text-white">Anti Kick</h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleSecurity("antikick", "true")}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Enable
              </button>
              <button
                onClick={() => toggleSecurity("antikick", "false")}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Disable
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faPrune} className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-white">Anti Prune</h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleSecurity("antiprune", "true")}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Enable
              </button>
              <button
                onClick={() => toggleSecurity("antiprune", "false")}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Disable
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "autorole" && (
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4">Autorole Settings</h3>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Role ID</label>
            <input
              type="text"
              value={autoroleId}
              onChange={e => setAutoroleId(e.target.value)}
              className="bg-gray-700 text-white rounded-lg p-2 w-full"
              placeholder="Enter role ID"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={setAutorole}
              className="bg-primary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Set Autorole
            </button>
            <button
              onClick={disableAutorole}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Disable Autorole
            </button>
          </div>
        </div>
      )}

      {activeTab === "greet" && (
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4">Greet Settings</h3>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Channel ID</label>
            <input
              type="text"
              value={greetChannelId}
              onChange={e => setGreetChannelId(e.target.value)}
              className="bg-gray-700 text-white rounded-lg p-2 w-full"
              placeholder="Enter channel ID"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Message</label>
            <textarea
              value={greetMessage}
              onChange={e => setGreetMessage(e.target.value)}
              className="bg-gray-700 text-white rounded-lg p-2 w-full"
              placeholder="Enter message (use {user} for mention, {username} for name)"
              rows="3"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={setGreet}
              className="bg-primary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Set Greet
            </button>
            <button
              onClick={disableGreet}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Disable Greet
            </button>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}