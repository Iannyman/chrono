"use client";

import { useState } from "react";
import {
  Search,
  UserPlus,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const inputClass =
  "w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-[#4682B4]/50 focus:border-[#4682B4]";
const selectClass =
  "w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-[#4682B4]/50 focus:border-[#4682B4] appearance-none";
const labelClass = "block text-sm text-gray-400 mb-1.5";

const PersonnelPage = () => {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { id: "details", label: "Get Details", icon: Search },
    { id: "create", label: "Create Person", icon: UserPlus },
    { id: "modify", label: "Modify Person", icon: Pencil },
    { id: "delete", label: "Delete Person", icon: Trash2 },
  ];

  // Person Details state
  const [detailsReader, setDetailsReader] = useState("");
  const [detailsEmployeeNos, setDetailsEmployeeNos] = useState("");
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsResponse, setDetailsResponse] = useState<unknown>(null);

  // Create Person state
  const [createEmployeeNo, setCreateEmployeeNo] = useState("");
  const [createName, setCreateName] = useState("");
  const [createCardNo, setCreateCardNo] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createResponse, setCreateResponse] = useState<unknown>(null);

  // Modify Person state
  const [modifyReader, setModifyReader] = useState("all");
  const [modifyEmployeeNo, setModifyEmployeeNo] = useState("");
  const [modifyName, setModifyName] = useState("");
  const [modifyLoading, setModifyLoading] = useState(false);
  const [modifyResponse, setModifyResponse] = useState<unknown>(null);

  // Delete Person state
  const [deleteReader, setDeleteReader] = useState("all");
  const [deleteEmployeeNos, setDeleteEmployeeNos] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteResponse, setDeleteResponse] = useState<unknown>(null);

  // --- API Handlers ---

  const handleGetDetails = async () => {
    if (!detailsReader.trim()) {
      toast.error("Reader name is required.");
      return;
    }
    const employeeNoList = detailsEmployeeNos
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (employeeNoList.length === 0) {
      toast.error("At least one employee number is required.");
      return;
    }

    setDetailsLoading(true);
    setDetailsResponse(null);
    try {
      const res = await fetch("/api/persons/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          readerName: detailsReader,
          employeeNoList,
        }),
      });
      const data = await res.json();
      setDetailsResponse(data);
      if (res.ok) {
        toast.success("Person details fetched.", { position: "top-right" });
      } else {
        toast.error((data as { error?: string }).error || "Request failed.", {
          position: "top-right",
        });
      }
    } catch {
      toast.error("Network error. Please try again.", { position: "top-right" });
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCreatePerson = async () => {
    if (!createEmployeeNo.trim() || !createName.trim() || !createCardNo.trim()) {
      toast.error("Employee number, name, and card number are required.");
      return;
    }

    setCreateLoading(true);
    setCreateResponse(null);
    try {
      const res = await fetch("/api/persons/with-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          readerName: "all",
          employeeNo: createEmployeeNo,
          name: createName,
          cardNo: createCardNo,
          userType: "normal",
          cardType: "normalCard",
        }),
      });
      const data = await res.json();
      setCreateResponse(data);
      if (res.ok) {
        toast.success("Person created successfully.", { position: "top-right" });
      } else {
        toast.error((data as { error?: string }).error || "Request failed.", {
          position: "top-right",
        });
      }
    } catch {
      toast.error("Network error. Please try again.", { position: "top-right" });
    } finally {
      setCreateLoading(false);
    }
  };

  const handleModifyPerson = async () => {
    if (!modifyEmployeeNo.trim() || !modifyName.trim()) {
      toast.error("Employee number and name are required.");
      return;
    }

    setModifyLoading(true);
    setModifyResponse(null);
    try {
      const res = await fetch("/api/persons/modify", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          readerName: modifyReader,
          employeeNo: modifyEmployeeNo,
          name: modifyName,
        }),
      });
      const data = await res.json();
      setModifyResponse(data);
      if (res.ok) {
        toast.success("Person modified successfully.", { position: "top-right" });
      } else {
        toast.error((data as { error?: string }).error || "Request failed.", {
          position: "top-right",
        });
      }
    } catch {
      toast.error("Network error. Please try again.", { position: "top-right" });
    } finally {
      setModifyLoading(false);
    }
  };

  const handleDeletePerson = async () => {
    const employeeNoList = deleteEmployeeNos
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (employeeNoList.length === 0) {
      toast.error("At least one employee number is required.");
      return;
    }

    setDeleteLoading(true);
    setDeleteResponse(null);
    try {
      const res = await fetch("/api/persons/delete", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          readerName: deleteReader,
          employeeNoList,
        }),
      });
      const data = await res.json();
      setDeleteResponse(data);
      if (res.ok) {
        toast.success("Person(s) deleted successfully.", { position: "top-right" });
      } else {
        toast.error((data as { error?: string }).error || "Request failed.", {
          position: "top-right",
        });
      }
    } catch {
      toast.error("Network error. Please try again.", { position: "top-right" });
    } finally {
      setDeleteLoading(false);
    }
  };

  const renderDetailsResult = (response: unknown) => {
    const data = response as {
      data?: {
        persons?: {
          UserInfoSearch?: {
            UserInfo?: {
              employeeNo: string;
              name: string;
              Valid?: { enable: boolean; beginTime: string; endTime: string };
            }[];
          };
        };
        cards?: {
          CardInfoSearch?: { CardInfo?: { employeeNo: string; cardNo: string }[] };
        };
      };
    };
    const users = data?.data?.persons?.UserInfoSearch?.UserInfo ?? [];
    const cards = data?.data?.cards?.CardInfoSearch?.CardInfo ?? [];
    const cardMap = new Map(cards.map((c) => [c.employeeNo, c.cardNo]));

    if (users.length === 0) {
      return (
        <div className="mt-4 bg-gray-900/60 rounded-xl p-6 border border-gray-700/50 text-center">
          <p className="text-sm text-gray-400">No persons found.</p>
        </div>
      );
    }

    return (
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-300">
            Results
            <span className="ml-2 text-xs font-normal text-gray-500">({users.length} found)</span>
          </h3>
        </div>
        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
          {users.map((user) => {
            const enabled = user.Valid?.enable ?? false;
            return (
              <div
                key={user.employeeNo}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl border border-gray-700/60 overflow-hidden hover:border-[#4682B4]/40 transition-colors"
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700/40 bg-gray-800/40">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#4682B4]/20 flex items-center justify-center text-[#4682B4] font-bold text-sm">
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-gray-500">#{user.employeeNo}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      enabled
                        ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20"
                        : "bg-red-500/15 text-red-400 ring-1 ring-red-500/20"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${enabled ? "bg-emerald-400" : "bg-red-400"}`} />
                    {enabled ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Card body */}
                <div className="px-5 py-3.5 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-1">Card No</p>
                    <p className="text-sm text-white font-mono">{cardMap.get(user.employeeNo) ?? "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-1">Valid From</p>
                    <p className="text-sm text-white">{user.Valid?.beginTime ?? "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-1">Valid Until</p>
                    <p className="text-sm text-white">{user.Valid?.endTime ?? "—"}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderResponse = (data: unknown) => {
    const text = JSON.stringify(data, null, 2);
    return (
      <div className="mt-4 bg-gray-900 rounded-lg p-4 border border-gray-700">
        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">
          Response
        </p>
        <pre className="text-sm text-emerald-400 whitespace-pre-wrap wrap-break-word overflow-auto max-h-64">
          {text}
        </pre>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 w-full">
      {/* Header row: title left, tabs right */}
      <div className="mx-8 mt-8 mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Personnel Management</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage persons on the access control system.
          </p>
        </div>
        <nav className="flex gap-1 bg-gray-800 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
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

      <div className="mx-8 my-4 flex-1 min-h-0">
        {/* Content Area */}
        <div className="bg-gray-800 rounded-xl shadow-md p-6 h-full">
          {/* Person Details */}
          {activeTab === "details" && (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left: Form */}
              <div className="lg:w-80 shrink-0">
                <h2 className="text-lg font-semibold text-white mb-1">Get Person Details</h2>
                <p className="text-sm text-gray-400 mb-6">
                  Retrieve details for one or more persons by employee number.
                </p>
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Reader Name</label>
                    <input
                      type="text"
                      value={detailsReader}
                      onChange={(e) => setDetailsReader(e.target.value)}
                      placeholder="e.g. 304DW"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Employee Numbers</label>
                    <input
                      type="text"
                      value={detailsEmployeeNos}
                      onChange={(e) => setDetailsEmployeeNos(e.target.value)}
                      placeholder="Comma-separated, e.g. 1234, 5678"
                      className={inputClass}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate multiple employee numbers with commas.
                    </p>
                  </div>
                  <button
                    onClick={handleGetDetails}
                    disabled={detailsLoading}
                    className="flex items-center gap-2 bg-[#4682B4] text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-[#3a6f9e] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {detailsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    {detailsLoading ? "Fetching..." : "Get Details"}
                  </button>
                </div>
              </div>

              {/* Right: Results */}
              <div className="flex-1 lg:border-l lg:border-gray-700 lg:pl-6">
                {detailsResponse !== null ? (
                  renderDetailsResult(detailsResponse)
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-sm text-gray-500">Results will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Create Person */}
          {activeTab === "create" && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Create Person with Card</h2>
              <p className="text-sm text-gray-400 mb-6">
                Register a new person with an associated access card.
              </p>
              <div className="space-y-5 max-w-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Employee Number</label>
                    <input
                      type="text"
                      value={createEmployeeNo}
                      onChange={(e) => setCreateEmployeeNo(e.target.value)}
                      placeholder="e.g. 1234"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Card Number</label>
                    <input
                      type="text"
                      value={createCardNo}
                      onChange={(e) => setCreateCardNo(e.target.value)}
                      placeholder="e.g. 1234567890"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    value={createName}
                    onChange={(e) => setCreateName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className={inputClass}
                  />
                </div>
                <button
                  onClick={handleCreatePerson}
                  disabled={createLoading}
                  className="flex items-center gap-2 bg-[#4682B4] text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-[#3a6f9e] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <UserPlus className="h-4 w-4" />
                  )}
                  {createLoading ? "Creating..." : "Create Person"}
                </button>
                {createResponse && renderResponse(createResponse)}
              </div>
            </div>
          )}

          {/* Modify Person */}
          {activeTab === "modify" && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Modify Person</h2>
              <p className="text-sm text-gray-400 mb-6">
                Update an existing person&apos;s information.
              </p>
              <div className="space-y-5 max-w-lg">
                <div>
                  <label className={labelClass}>Reader Name</label>
                  <input
                    type="text"
                    value={modifyReader}
                    onChange={(e) => setModifyReader(e.target.value)}
                    placeholder="e.g. 304DW"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Employee Number</label>
                  <input
                    type="text"
                    value={modifyEmployeeNo}
                    onChange={(e) => setModifyEmployeeNo(e.target.value)}
                    placeholder="e.g. 7628"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>New Name</label>
                  <input
                    type="text"
                    value={modifyName}
                    onChange={(e) => setModifyName(e.target.value)}
                    placeholder="e.g. John Doe Updated"
                    className={inputClass}
                  />
                </div>
                <button
                  onClick={handleModifyPerson}
                  disabled={modifyLoading}
                  className="flex items-center gap-2 bg-[#4682B4] text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-[#3a6f9e] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {modifyLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Pencil className="h-4 w-4" />
                  )}
                  {modifyLoading ? "Modifying..." : "Modify Person"}
                </button>
                {modifyResponse && renderResponse(modifyResponse)}
              </div>
            </div>
          )}

          {/* Delete Person */}
          {activeTab === "delete" && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Delete Person</h2>
              <p className="text-sm text-gray-400 mb-6">
                Remove one or more persons from the access control system.
              </p>
              <div className="space-y-5 max-w-lg">
                <div>
                  <label className={labelClass}>Reader Name</label>
                  <input
                    type="text"
                    value={deleteReader}
                    onChange={(e) => setDeleteReader(e.target.value)}
                    placeholder="all"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Employee Numbers</label>
                  <input
                    type="text"
                    value={deleteEmployeeNos}
                    onChange={(e) => setDeleteEmployeeNos(e.target.value)}
                    placeholder="Comma-separated, e.g. 1234, 5678"
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple employee numbers with commas.
                  </p>
                </div>
                <button
                  onClick={handleDeletePerson}
                  disabled={deleteLoading}
                  className="flex items-center gap-2 bg-red-600 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleteLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  {deleteLoading ? "Deleting..." : "Delete Person"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonnelPage;
