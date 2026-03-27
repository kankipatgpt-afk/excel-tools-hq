import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-3 text-xl font-semibold text-slate-900">ExcelToolsHQ</div>
          <p className="max-w-xs text-sm leading-6 text-slate-500">
            Smart Excel tools for cleaning, converting, and automating everyday data work.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Product</h3>
          <div className="space-y-3 text-sm text-slate-500">
            <div><Link href="/tools" className="hover:text-slate-900">All tools</Link></div>
            <div><Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link></div>
            <div><Link href="/about" className="hover:text-slate-900">About</Link></div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Categories</h3>
          <div className="space-y-3 text-sm text-slate-500">
            <div>Excel cleaning</div>
            <div>Conversions</div>
            <div>AI tools</div>
            <div>Utilities</div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Contact</h3>
          <div className="space-y-3 text-sm text-slate-500">
            <div>support@exceltoolshq.com</div>
            <div>Built for productivity teams</div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-5 text-center text-sm text-slate-500">
        © 2026 ExcelToolsHQ. All rights reserved.
      </div>
    </footer>
  );
}