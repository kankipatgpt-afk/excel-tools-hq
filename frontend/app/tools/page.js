import Link from "next/link";
import {
  Scissors,
  CopyMinus,
  RefreshCw,
  FolderOpen,
  Bot,
  Settings,
} from "lucide-react";

const tools = [
  {
    name: "Trim Spaces",
    description: "Remove leading, trailing, and repeated spaces from cell values.",
    href: "/tools/trim-spaces",
    active: true,
    icon: Scissors,
  },
  {
    name: "Remove Duplicates",
    description: "Highlight or delete duplicate rows and values by selected column.",
    href: "/tools/remove-duplicates",
    active: true,
    icon: CopyMinus,
  },
  {
    name: "Excel to CSV",
    description: "Convert workbook sheets into clean CSV exports.",
    href: "#",
    active: false,
    icon: RefreshCw,
  },
  {
    name: "Merge Sheets",
    description: "Combine multiple sheets into a single output workbook.",
    href: "#",
    active: false,
    icon: FolderOpen,
  },
  {
    name: "AI Analyzer",
    description: "Use AI to summarize spreadsheet content and detect patterns.",
    href: "#",
    active: false,
    icon: Bot,
  },
  {
    name: "Formatter",
    description: "Standardize text, numbers, and formatting rules across files.",
    href: "#",
    active: false,
    icon: Settings,
  },
];

export default function ToolsPage() {
  return (
    <div className="section-shell py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="section-title">All tools</h1>
        <p className="section-subtitle">
          Pick a tool and get the result in a few clicks.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <div key={tool.name} className="card p-8">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm">
                <Icon size={28} strokeWidth={2} />
              </div>

              <h2 className="text-xl font-semibold text-slate-900">{tool.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">{tool.description}</p>

              {tool.active ? (
                <Link href={tool.href} className="mt-6 inline-flex primary-button">
                  Open Tool
                </Link>
              ) : (
                <button className="mt-6 rounded-full bg-slate-200 px-5 py-2.5 text-sm font-medium text-slate-500">
                  Coming soon
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}