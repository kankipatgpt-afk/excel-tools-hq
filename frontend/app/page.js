import Link from "next/link";

const popularTools = [
  {
    title: "Trim Spaces",
    description: "Remove extra spaces from cells and clean messy text across sheets.",
    href: "/tools/trim-spaces",
  },
  {
    title: "Remove Duplicates",
    description: "Highlight or delete duplicate rows and duplicate values by column.",
    href: "/tools/remove-duplicates",
  },
  {
    title: "Excel to CSV",
    description: "Convert Excel sheets into clean CSV exports for workflows and automation.",
    href: "/tools",
  },
];

const categories = ["Excel Cleaning", "Conversions", "AI Tools", "Utilities"];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="section-shell py-20 text-center sm:py-24 lg:py-28">
          <div className="mx-auto mb-6 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
            Fast tools. Smart workflows. Built for everyday Excel work.
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Your Intelligent Workspace for{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Excel Tasks
            </span>
          </h1>

          <p className="section-subtitle">
            Clean, transform, and automate spreadsheet work with simple tools designed
            for speed and clarity.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/tools" className="primary-button px-7 py-3 text-base">
              Try Tools
            </Link>
            <Link href="/about" className="soft-button px-7 py-3 text-base">
              Learn More
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
            {[
              ["Secure file processing", "Your uploaded files are handled with care."],
              ["Fast downloads", "Processed results are ready in moments."],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="card w-full max-w-xs px-6 py-5 text-left"
              >
                <div className="text-base font-semibold text-slate-900">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20 text-center">
        <h2 className="section-title">Explore by category</h2>
        <p className="section-subtitle">Find the right tool for the job.</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {categories.map((item) => (
            <div
              key={item}
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-8 pb-20">
        <div className="text-center">
          <h2 className="section-title">Most used tools</h2>
          <p className="section-subtitle">
            Start with the tools people use most. No account needed.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {popularTools.map((tool) => (
            <div key={tool.title} className="card p-8">
              <div className="mb-4 inline-flex rounded-2xl bg-slate-100 px-4 py-3 text-xl">
                ⚙️
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{tool.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">{tool.description}</p>
              <Link
                href={tool.href}
                className="mt-6 inline-flex text-sm font-semibold text-slate-900 hover:text-blue-600"
              >
                Use tool →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="section-shell py-20 text-center">
          <h2 className="section-title">Simple flow</h2>
          <p className="section-subtitle">Upload, process, download. No friction.</p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["Upload", "Add your Excel file"],
              ["Process", "We clean and transform it"],
              ["Download", "Get your result instantly"],
            ].map(([title, desc]) => (
              <div key={title} className="card px-8 py-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-lg font-semibold text-slate-900">
                  {title[0]}
                </div>
                <div className="mt-5 text-lg font-semibold text-slate-900">{title}</div>
                <p className="mt-2 text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}