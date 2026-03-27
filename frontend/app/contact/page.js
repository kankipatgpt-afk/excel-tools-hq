export default function ContactPage() {
  return (
    <div className="section-shell py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="section-title">Contact</h1>
        <p className="mt-4 text-lg text-slate-500">
          Questions, suggestions, or partnership ideas — reach out anytime.
        </p>

        <div className="mt-10 card p-8">
          <div className="space-y-6 text-sm text-slate-600">
            <div>
              <div className="font-semibold text-slate-900">Email</div>
              <div className="mt-1">support@exceltoolshq.com</div>
            </div>

            <div>
              <div className="font-semibold text-slate-900">Support</div>
              <div className="mt-1">We usually respond within 1 business day.</div>
            </div>

            <div>
              <div className="font-semibold text-slate-900">Product feedback</div>
              <div className="mt-1">Share ideas for new Excel tools and workflows.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}