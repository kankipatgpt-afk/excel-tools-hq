"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function TrimSpacesPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { data: session } = useSession();

  const handleUpload = async () => {
  if (!file) {
    setErrorMsg("Please select an Excel file.");
    setSuccessMsg("");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("user_email", session?.user?.email || "");
  formData.append("user_name", session?.user?.name || "");

  setLoading(true);
  setErrorMsg("");
  setSuccessMsg("");

  try {
    const response = await fetch("https://excel-tools-hq.onrender.com/trim-spaces", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorMsg(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    if (data.download_url) {
      window.open(data.download_url, "_blank");
    }

    setSuccessMsg("File processed and download link generated successfully.");
  } catch (error) {
    console.error(error);
    setErrorMsg("Upload failed. Please try again.");
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border p-10">
        <h1 className="text-4xl font-bold mb-4">Trim Spaces</h1>
        <p className="text-gray-600 mb-8">
          Remove leading, trailing, and extra spaces from all text cells in your Excel file.
        </p>

        {successMsg && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
            disabled={loading}
          />

          <div className="text-sm text-gray-500 mb-6">
            {file ? `Selected: ${file.name}` : "No file selected"}
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg text-white min-w-[180px] ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              "Upload & Clean"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}