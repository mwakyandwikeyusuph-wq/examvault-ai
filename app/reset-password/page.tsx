import { SiteShell } from '@/components/site-shell';
import { UpdatePasswordForm } from '@/components/auth-forms';

export default function ResetPasswordPage() {
  return <SiteShell pageTitle="Reset Password"><div className="container-shell py-20"><div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
    <div className="mb-6 text-center"><div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Secure your account</div><h1 className="mt-3 text-3xl font-black">Choose a new password</h1></div>
    <UpdatePasswordForm />
  </div></div></SiteShell>;
}
