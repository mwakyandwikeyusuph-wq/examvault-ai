import { SiteShell } from '@/components/site-shell';
import { RegisterForm } from '@/components/auth-forms';

export default function RegisterPage() {
  return <SiteShell pageTitle="Register"><div className="container-shell py-20"><div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
    <div className="mb-6 text-center"><div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Join ExamVault AI</div><h1 className="mt-3 text-3xl font-black">Create account</h1></div>
    <RegisterForm />
  </div></div></SiteShell>;
}
