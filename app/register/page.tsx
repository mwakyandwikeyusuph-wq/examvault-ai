import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';

export default function RegisterPage() {
  return (
    <SiteShell pageTitle="Register">
      <div className="container-shell py-20">
        <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Join ExamVault AI</div>
            <h1 className="mt-3 text-3xl font-black">Create account</h1>
          </div>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" type="text" placeholder="Full name" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" type="password" placeholder="Create a password" />
            </div>
            <button className="primary-button w-full">Register</button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account? <Link href="/login" className="font-semibold text-secondary">Login</Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
