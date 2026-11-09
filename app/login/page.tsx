import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';

export default function LoginPage() {
  return (
    <SiteShell pageTitle="Login">
      <div className="container-shell py-20">
        <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Welcome back</div>
            <h1 className="mt-3 text-3xl font-black">Login</h1>
          </div>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" type="password" placeholder="••••••••" />
            </div>
            <button className="primary-button w-full">Login</button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
            <Link href="/forgot-password">Forgot password?</Link>
            <Link href="/register">Create account</Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
