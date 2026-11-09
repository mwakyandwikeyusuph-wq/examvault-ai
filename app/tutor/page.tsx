import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';

export default function TutorPage() {
  return (
    <SiteShell pageTitle="AI Tutor">
      <div className="container-shell py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">AI-powered teaching</div>
            <h1 className="mt-2 text-4xl font-black">AI Tutor</h1>
          </div>
          <Link href="/" className="secondary-button">Back home</Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass rounded-[2rem] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Conversation</h2>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">Online</span>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-100 p-4 text-slate-700">Explain the process of photosynthesis in simple words.</div>
              <div className="ml-auto max-w-xl rounded-2xl bg-gradient-to-r from-secondary to-accent p-4 text-white">Photosynthesis is the process by which plants convert sunlight, carbon dioxide, and water into glucose and oxygen. In simpler terms, plants are making food for themselves using sunlight.</div>
            </div>

            <div className="mt-6 flex gap-3">
              <input className="flex-1 rounded-full border border-slate-200 bg-white px-5 py-4 outline-none" placeholder="Ask a question in English or Kiswahili" />
              <button className="primary-button">Send</button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="soft-card">
              <h3 className="text-xl font-bold">Capabilities</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>• Explain concepts and books</li>
                <li>• Generate revision notes</li>
                <li>• Suggest step-by-step teaching</li>
                <li>• Support English and Kiswahili</li>
              </ul>
            </div>

            <div className="soft-card">
              <h3 className="text-xl font-bold">Study goals</h3>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-slate-100 p-3">Topic breakdown: Cell biology</div>
                <div className="rounded-xl bg-slate-100 p-3">Quiz prep: 25 questions</div>
                <div className="rounded-xl bg-slate-100 p-3">Next sprint: 3-day revision plan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
