import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';

export default function ForgotPasswordPage() {
  return (
    <SiteShell pageTitle="Forgot Password">
      <div className="container-shell py-20">
        <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Reset access</div>
            <h1 className="mt-3 text-3xl font-black">Forgot password</h1>
          </div>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" type="email" placeholder="you@example.com" />
            </div>
            <button className="primary-button w-full">Send reset link</button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Back to <Link href="/login" className="font-semibold text-secondary">login</Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
