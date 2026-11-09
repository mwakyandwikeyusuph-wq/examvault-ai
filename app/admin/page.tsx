import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';

export default function AdminPortalPage() {
  return (
    <SiteShell pageTitle="Admin Dashboard">
      <div className="container-shell py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Analytics overview</div>
            <h1 className="mt-2 text-4xl font-black">Admin Dashboard</h1>
          </div>
          <Link href="/" className="secondary-button">Back home</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Visitors today', value: '14,200' },
            { title: 'Downloads this week', value: '72,840' },
            { title: 'AI questions today', value: '4,310' },
          ].map((stat) => (
            <div key={stat.title} className="soft-card">
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">{stat.title}</div>
              <div className="mt-3 text-3xl font-black text-slate-900">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
