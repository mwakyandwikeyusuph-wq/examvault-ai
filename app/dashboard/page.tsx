import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';
import { dashboardStats } from '@/lib/content';

export default function DashboardPage() {
  return (
    <SiteShell pageTitle="Student Dashboard">
      <div className="container-shell py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Student workspace</div>
            <h1 className="mt-2 text-4xl font-black">Dashboard</h1>
          </div>
          <Link href="/" className="secondary-button">Back home</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <div key={stat.label} className="soft-card">
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">{stat.label}</div>
              <div className="mt-3 text-3xl font-black text-slate-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="soft-card">
            <h3 className="text-2xl font-bold">Learning progress</h3>
            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm font-medium"><span>Biology</span><span>86%</span></div>
                <div className="h-2 rounded-full bg-slate-200"><div className="h-2 w-[86%] rounded-full bg-gradient-to-r from-secondary to-accent" /></div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm font-medium"><span>Mathematics</span><span>91%</span></div>
                <div className="h-2 rounded-full bg-slate-200"><div className="h-2 w-[91%] rounded-full bg-gradient-to-r from-secondary to-accent" /></div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm font-medium"><span>Economics</span><span>79%</span></div>
                <div className="h-2 rounded-full bg-slate-200"><div className="h-2 w-[79%] rounded-full bg-gradient-to-r from-secondary to-accent" /></div>
              </div>
            </div>
          </div>

          <div className="soft-card">
            <h3 className="text-2xl font-bold">Saved material</h3>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li>• 12 downloaded past papers</li>
              <li>• 8 book chapters saved</li>
              <li>• 26 flashcards in review</li>
              <li>• 5 AI conversations archived</li>
            </ul>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
