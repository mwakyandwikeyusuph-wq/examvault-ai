import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-lg text-center">
        <div className="text-7xl font-black tracking-tight">404</div>
        <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-slate-300">The requested resource could not be found.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 font-semibold text-slate-900">Return home</Link>
      </div>
    </div>
  );
}
