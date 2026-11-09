import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';

export default function SearchPage() {
  return (
    <SiteShell pageTitle="AI Search">
      <div className="container-shell py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Smart discovery</div>
            <h1 className="mt-2 text-4xl font-black">AI Search</h1>
          </div>
          <Link href="/" className="secondary-button">Back home</Link>
        </div>

        <div className="glass rounded-[2rem] p-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <input className="flex-1 rounded-full border border-slate-200 bg-white px-5 py-4 outline-none" placeholder="Search by subject, course, institution, topic or keywords" />
            <button className="primary-button">Search</button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: 'KCSE Biology Past Papers', type: 'Exam', score: '98% match' },
            { title: 'Introduction to Probability', type: 'Book', score: '94% match' },
            { title: 'Revision Notes: Chemistry', type: 'Notes', score: '91% match' },
          ].map((item) => (
            <div key={item.title} className="soft-card">
              <div className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">{item.type}</div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <div className="mt-4 text-sm font-medium text-emerald-600">{item.score}</div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
