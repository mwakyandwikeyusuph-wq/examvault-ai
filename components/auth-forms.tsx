'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function safeNextPath(value: string | null) {
  return value?.startsWith('/') && !value.startsWith('//') ? value : '/dashboard';
}

function SetupMessage() {
  return <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">Authentication is not configured yet. Add the Supabase project URL and anon key to your environment, then restart the app.</p>;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setMessage('');
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.replace(safeNextPath(searchParams.get('next')));
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to sign in. Please try again.');
    } finally { setBusy(false); }
  }

  async function googleLogin() {
    setBusy(true); setMessage('');
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNextPath(searchParams.get('next')))}` },
      });
      if (error) throw error;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to start Google sign in.');
      setBusy(false);
    }
  }

  return <>
    <form className="space-y-5" onSubmit={submit}>
      <label className="block text-sm font-medium text-slate-700">Email address<input required autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></label>
      <label className="block text-sm font-medium text-slate-700">Password<input required autoComplete="current-password" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" /></label>
      {message && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{message}</p>}
      <button disabled={busy} className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-60">{busy ? 'Signing in…' : 'Login'}</button>
    </form>
    <button type="button" disabled={busy} onClick={googleLogin} className="secondary-button mt-3 w-full disabled:opacity-60">Continue with Google</button>
    <div className="mt-6 flex items-center justify-between text-sm text-slate-600"><Link href="/forgot-password">Forgot password?</Link><Link href="/register">Create account</Link></div>
  </>;
}

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: name.trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent('/dashboard')}`,
        },
      });
      if (error) throw error;
      if (data.session) { router.replace('/dashboard'); router.refresh(); }
      else setDone(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to create your account. Please try again.');
    } finally { setBusy(false); }
  }

  if (done) return <div role="status" className="rounded-2xl bg-emerald-50 p-5 text-emerald-900"><h2 className="font-bold">Check your email</h2><p className="mt-2 text-sm">We sent a verification link to {email}. Open it to finish creating your account.</p></div>;

  return <>
    <form className="space-y-5" onSubmit={submit}>
      <label className="block text-sm font-medium text-slate-700">Full name<input required minLength={2} maxLength={100} autoComplete="name" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" /></label>
      <label className="block text-sm font-medium text-slate-700">Email address<input required autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></label>
      <label className="block text-sm font-medium text-slate-700">Password<input required minLength={8} autoComplete="new-password" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" /></label>
      {message && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{message}</p>}
      <button disabled={busy} className="primary-button w-full disabled:opacity-60">{busy ? 'Creating account…' : 'Create account'}</button>
    </form>
    <div className="mt-6 text-center text-sm text-slate-600">Already have an account? <Link href="/login" className="font-semibold text-secondary">Login</Link></div>
  </>;
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent('/reset-password')}` });
      if (error) throw error;
      setMessage('If an account exists for that email, a password reset link has been sent.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to request a reset link.');
    } finally { setBusy(false); }
  }

  return <form className="space-y-5" onSubmit={submit}>
    <label className="block text-sm font-medium text-slate-700">Email address<input required autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></label>
    {message && <p role="status" className="rounded-xl bg-blue-50 p-3 text-sm text-blue-800">{message}</p>}
    <button disabled={busy} className="primary-button w-full disabled:opacity-60">{busy ? 'Sending…' : 'Send reset link'}</button>
  </form>;
}

export function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.replace('/dashboard'); router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to update password. Please use a fresh reset link.');
    } finally { setBusy(false); }
  }

  return <form className="space-y-5" onSubmit={submit}>
    <label className="block text-sm font-medium text-slate-700">New password<input required minLength={8} autoComplete="new-password" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
    {message && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{message}</p>}
    <button disabled={busy} className="primary-button w-full disabled:opacity-60">{busy ? 'Updating…' : 'Update password'}</button>
  </form>;
}

export { SetupMessage };
