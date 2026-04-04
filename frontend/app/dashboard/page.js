"use client";

import { useEffect, useMemo, useState } from "react";

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getToolBadge(toolName) {
  switch (toolName) {
    case "Trim Spaces":
      return "✂️";
    case "Remove Duplicates":
      return "🧹";
    default:
      return "🧰";
  }
}

export default function DashboardPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchHistory = async () => {
    try {
      const response = await fetch("https://excel-tools-hq.onrender.com/tool-history");
      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || "Failed to load history");
        setLoading(false);
        return;
      }

      setHistory(data);
      setErrorMsg("");
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to load dashboard history.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const stats = useMemo(() => {
    const totalRuns = history.length;
    const trimRuns = history.filter((item) => item.tool_name === "Trim Spaces").length;
    const duplicateRuns = history.filter((item) => item.tool_name === "Remove Duplicates").length;

    return { totalRuns, trimRuns, duplicateRuns };
  }, [history]);

  return (
    <div className="section-shell py-16">
      <div className="mb-10">
        <h1 className="section-title">Dashboard</h1>
        <p className="mt-4 text-lg text-slate-500">
          Internal monitoring for processed files and tool usage.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-10 grid gap-6 md:grid-cols-3">
        <div className="card p-6">
          <div className="text-sm font-medium text-slate-500">Total Runs</div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">
            {stats.totalRuns}
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm font-medium text-slate-500">Trim Spaces</div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">
            {stats.trimRuns}
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm font-medium text-slate-500">Remove Duplicates</div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">
            {stats.duplicateRuns}
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center gap-3 p-10 text-slate-500">
            <span className="spinner"></span>
            Loading history...
          </div>
        ) : history.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No tool history found yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Tool</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">User</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Original File</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Output File</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Processed At</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Download</th>                  
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
                          {getToolBadge(item.tool_name)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            {item.tool_name}
                          </div>
                          <div className="text-xs text-slate-500">Run #{item.id}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">
                        {item.user_name || "-"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.user_email || "-"}
                      </div>
                    </td>


                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.original_file}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.output_file}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatDate(item.created_at)}
                    </td>

                    <td className="px-6 py-4">
                      <a
                        href={item.download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}