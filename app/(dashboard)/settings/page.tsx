"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Globe,
  Clock,
  Save,
} from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  const handleSave = () => {
    toast.success("Settings saved successfully.", {
      position: "top-right",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 w-full">
      {/* Header */}
      <div className="mx-8 mt-8 mb-2">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your account, notifications, and application preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mx-8 my-4 flex-1">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 shrink-0">
          <div className="bg-gray-800 rounded-xl shadow-md p-2">
            <nav className="flex flex-col gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-800 rounded-xl shadow-md p-6">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Profile Information</h2>
              <p className="text-sm text-gray-400 mb-6">
                Update your personal details and contact information.
              </p>

              <div className="space-y-5 max-w-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-[#4682B4] flex items-center justify-center text-white text-xl font-bold">
                    U
                  </div>
                  <div>
                    <p className="text-white font-medium">Profile Photo</p>
                    <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="User"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-[#4682B4]/50 focus:border-[#4682B4]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      placeholder="Enter last name"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-[#4682B4]/50 focus:border-[#4682B4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue="user"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-[#4682B4]/50 focus:border-[#4682B4]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-[#4682B4]/50 focus:border-[#4682B4]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Department
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Production, Quality Assurance"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-[#4682B4]/50 focus:border-[#4682B4]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">
                Notification Preferences
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Choose what notifications you want to receive.
              </p>

              <div className="space-y-4 max-w-lg">
                {[
                  {
                    title: "Time entry approvals",
                    desc: "Get notified when your time entries are approved or rejected.",
                  },
                  {
                    title: "Weekly summary",
                    desc: "Receive a weekly summary of logged hours by project.",
                  },
                  {
                    title: "Project updates",
                    desc: "Notifications when project budgets reach threshold limits.",
                  },
                  {
                    title: "Employee status changes",
                    desc: "Alerts when employees go on leave or become inactive.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4"
                  >
                    <div>
                      <p className="text-sm text-white font-medium">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <button className="relative h-6 w-11 rounded-full bg-[#4682B4] transition-colors">
                      <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">
                Security Settings
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Manage your password and account security.
              </p>

              <div className="space-y-5 max-w-lg">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-[#4682B4]/50 focus:border-[#4682B4]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-[#4682B4]/50 focus:border-[#4682B4]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-[#4682B4]/50 focus:border-[#4682B4]"
                  />
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4">
                    <div>
                      <p className="text-sm text-white font-medium">
                        Active Sessions
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        You are currently logged in on this device.
                      </p>
                    </div>
                    <span className="text-xs text-emerald-400 font-medium">
                      This device
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">
                Application Preferences
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Customize how Chrono works for you.
              </p>

              <div className="space-y-5 max-w-lg">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Timezone
                  </label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-[#4682B4]/50 focus:border-[#4682B4] appearance-none">
                      <option value="utc+8">UTC+08:00 (Philippines)</option>
                      <option value="utc-5">UTC-05:00 (Eastern Time)</option>
                      <option value="utc-8">UTC-08:00 (Pacific Time)</option>
                      <option value="utc+0">UTC+00:00 (GMT)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Date Format
                  </label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-[#4682B4]/50 focus:border-[#4682B4] appearance-none">
                    <option value="mdy">MM/DD/YYYY</option>
                    <option value="dmy">DD/MM/YYYY</option>
                    <option value="ymd">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Week Starts On
                  </label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-[#4682B4]/50 focus:border-[#4682B4] appearance-none">
                    <option value="monday">Monday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </div>

                <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4">
                  <div>
                    <p className="text-sm text-white font-medium">
                      Compact view
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Use a more compact layout for tables and lists.
                    </p>
                  </div>
                  <button className="relative h-6 w-11 rounded-full bg-gray-600 transition-colors">
                    <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-4 border-t border-gray-700 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#4682B4] text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-[#3a6f9e] transition"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
