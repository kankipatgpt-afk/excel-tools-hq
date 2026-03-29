"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function RemoveDuplicatesPage() {
  const [file, setFile] = useState(null);
  const [tempFile, setTempFile] = useState("");
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [columns, setColumns] = useState([]);

  const [actionType, setActionType] = useState("");
  const [mode, setMode] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");

  const [loadingMeta, setLoadingMeta] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { data: session } = useSession();

  const handleFileUpload = async (uploadedFile) => {
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setLoadingMeta(true);
    setErrorMsg("");
    setSuccessMsg("");
    setSheets([]);
    setSelectedSheet("");
    setColumns([]);
    setActionType("");
    setMode("");
    setSelectedColumn("");

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await fetch("https://excel-tools-hq.onrender.com/excel-metadata", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || "Failed to read Excel metadata");
        setSuccessMsg("");
        setLoadingMeta(false);
        return;
      }

      setTempFile(data.temp_file);
      setSheets(data.sheets);
      setSuccessMsg("File uploaded successfully. Please choose a sheet.");
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to upload file");
      setSuccessMsg("");
    }

    setLoadingMeta(false);
  };

  const handleSheetChange = (sheetName) => {
    setSelectedSheet(sheetName);
    setSelectedColumn("");
    setErrorMsg("");
    const sheetObj = sheets.find((s) => s.sheet_name === sheetName);
    setColumns(sheetObj ? sheetObj.columns : []);
  };

  const handleProcess = async () => {
    if (!tempFile) {
      setErrorMsg("Please upload a file");
      setSuccessMsg("");
      return;
    }

    if (!selectedSheet) {
      setErrorMsg("Please select a sheet");
      setSuccessMsg("");
      return;
    }

    if (!actionType) {
      setErrorMsg("Please select an action");
      setSuccessMsg("");
      return;
    }

    if (!mode) {
      setErrorMsg("Please select Row or Column");
      setSuccessMsg("");
      return;
    }

    if (mode === "column" && !selectedColumn) {
      setErrorMsg("Please select a column");
      setSuccessMsg("");
      return;
    }

    const formData = new FormData();
    formData.append("temp_file", tempFile);
    formData.append("sheet_name", selectedSheet);
    formData.append("action_type", actionType);
    formData.append("mode", mode);

    formData.append("user_email", session?.user?.email || "");
    formData.append("user_name", session?.user?.name || "");

    if (mode === "column") {
      formData.append("selected_column", selectedColumn);
    }

    setProcessing(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("https://excel-tools-hq.onrender.com/remove-duplicates", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData.error || "Processing failed");
        setSuccessMsg("");
        setProcessing(false);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || "Processing failed");
        setSuccessMsg("");
        setProcessing(false);
        return;
      }

      if (data.download_url) {
        window.open(data.download_url, "_blank");
      }

      setSuccessMsg("File processed and download link generated successfully.");
      setErrorMsg("");
    } catch (error) {
      console.error(error);
      setErrorMsg("Processing failed");
      setSuccessMsg("");
    }

    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border shadow-sm p-10">
        <h1 className="text-3xl font-semibold mb-3">Remove Duplicates</h1>
        <p className="text-gray-600 mb-6">
          Upload an Excel file, choose a sheet, then highlight or delete duplicate rows or duplicate values in a selected column.
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

        <div className="mb-8">
          <label className="block text-xs font-medium mb-2 text-slate-700">Upload Excel File</label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
            disabled={loadingMeta || processing}
          />
          <p className="text-sm text-gray-500 mt-2">
            {file ? `Selected: ${file.name}` : "No file selected"}
          </p>
        </div>

        {loadingMeta && (
          <div className="mb-8 flex items-center gap-3 text-sm text-slate-600">
            <span className="spinner"></span>
            Reading workbook sheets...
          </div>
        )}

        {sheets.length > 0 && (
          <div className="mb-8">
            <label className="block text-xs font-medium mb-2 text-slate-700">Select Excel Sheet</label>
            <select
              value={selectedSheet}
              onChange={(e) => handleSheetChange(e.target.value)}
              className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              disabled={processing}
            >
              <option value="">-- Select Sheet --</option>
              {sheets.map((sheet, index) => (
                <option key={index} value={sheet.sheet_name}>
                  {sheet.sheet_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedSheet && (
          <div className="mb-8">
            <label className="block text-xs font-medium mb-3 text-slate-700">Choose Action</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="actionType"
                  value="highlight"
                  checked={actionType === "highlight"}
                  onChange={(e) => setActionType(e.target.value)}
                  disabled={processing}
                />                
                <span className="text-sm">Highlight duplicates</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="actionType"
                  value="delete"
                  checked={actionType === "delete"}
                  onChange={(e) => setActionType(e.target.value)}
                  disabled={processing}
                />
                <span className="text-sm">Delete duplicates</span>
              </label>
            </div>
          </div>
        )}

        {actionType && (
          <div className="mb-8">
            <label className="block text-xs font-medium mb-3 text-slate-700">Apply On</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="mode"
                  value="row"
                  checked={mode === "row"}
                  onChange={(e) => {
                    setMode(e.target.value);
                    setSelectedColumn("");
                  }}
                  disabled={processing}
                />
                <span className="text-sm">Rows</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="mode"
                  value="column"
                  checked={mode === "column"}
                  onChange={(e) => setMode(e.target.value)}
                  disabled={processing}
                />
                <span className="text-sm">Columns</span>
              </label>
            </div>
          </div>
        )}

        {mode === "column" && (
          <div className="mb-8">
            <label className="block text-xs font-medium mb-2 text-slate-700">Select Column</label>
            <select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              disabled={processing}
            >
              <option value="">-- Select Column --</option>
              {columns.map((col, index) => (
                <option key={index} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        )}

        {(mode === "row" || (mode === "column" && selectedColumn)) && (
          <button
            onClick={handleProcess}
            disabled={processing || loadingMeta}
            className={`inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg text-white min-w-[180px] ${
              processing || loadingMeta
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {processing ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              "Process File"
            )}
          </button>
        )}
      </div>
    </div>
  );
}