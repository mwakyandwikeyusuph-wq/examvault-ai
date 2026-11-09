import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';
import { ForgotPasswordForm } from '@/components/auth-forms';

export default function ForgotPasswordPage() {
  return <SiteShell pageTitle="Forgot Password"><div className="container-shell py-20"><div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
    <div className="mb-6 text-center"><div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Reset access</div><h1 className="mt-3 text-3xl font-black">Forgot password</h1></div>
    <ForgotPasswordForm />
    <div className="mt-6 text-center text-sm text-slate-600">Back to <Link href="/login" className="font-semibold text-secondary">login</Link></div>
  </div></div></SiteShell>;
}
