export default function AboutPage() {
  return (
    <div className="section-shell py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="section-title">About</h1>
        <p className="mt-6 text-lg leading-8 text-slate-500">
          ExcelToolsHQ is built to make spreadsheet work simpler, faster, and more reliable.
          We focus on practical tools that help users clean, transform, and automate Excel files
          without unnecessary complexity.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900">Fast</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Get from upload to result in just a few clicks.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900">Focused</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Purpose-built tools for common Excel problems.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900">Scalable</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Start simple today and expand into AI-powered workflows later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}