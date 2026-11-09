import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';

export default function AboutPage() {
  return (
    <SiteShell pageTitle="About Us">
      <div className="container-shell py-16">
        <div className="mb-8">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">About</div>
          <h1 className="mt-2 text-4xl font-black">About Us</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="soft-card">
            <h2 className="text-2xl font-bold">Our mission</h2>
            <p className="mt-4 text-slate-700">ExamVault AI is designed to democratize access to quality education through AI-powered revision, digital libraries, and intelligent study guidance.</p>
          </div>
          <div className="soft-card">
            <h2 className="text-2xl font-bold">Who we serve</h2>
            <p className="mt-4 text-slate-700">We power the study journey of students, schools, institutions, mentors, and contributors across Africa.</p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/contact" className="primary-button">Contact us</Link>
          <Link href="/register" className="secondary-button">Join the platform</Link>
        </div>
      </div>
    </SiteShell>
  );
}
