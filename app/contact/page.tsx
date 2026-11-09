import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';

export default function ContactPage() {
  return (
    <SiteShell pageTitle="Contact">
      <div className="container-shell py-16">
        <div className="mb-8">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Support</div>
          <h1 className="mt-2 text-4xl font-black">Contact us</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="soft-card">
            <div className="space-y-4 text-slate-700">
              <div><strong>Email:</strong> hello@examvault.ai</div>
              <div><strong>Phone:</strong> +254 700 000 000</div>
              <div><strong>Location:</strong> Nairobi, Kenya</div>
            </div>
          </div>

          <div className="soft-card">
            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Your name" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Message</label>
                <textarea className="min-h-[160px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="How can we help?" />
              </div>
              <button className="primary-button">Send message</button>
            </form>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
