import { Suspense } from 'react';
import { SiteShell } from '@/components/site-shell';
import { LoginForm } from '@/components/auth-forms';

export default function LoginPage() {
  return <SiteShell pageTitle="Login"><div className="container-shell py-20"><div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
    <div className="mb-6 text-center"><div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Welcome back</div><h1 className="mt-3 text-3xl font-black">Login</h1></div>
    <Suspense fallback={<p className="text-sm text-slate-500">Loading sign-in…</p>}><LoginForm /></Suspense>
  </div></div></SiteShell>;
}
