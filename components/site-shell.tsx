import Link from 'next/link';
import { navLinks } from '@/lib/content';

export function SiteShell({ children, pageTitle }: { children: React.ReactNode; pageTitle?: string }) {
  return (
    <div className="min-h-screen bg-background text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl">
        <div className="container-shell flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-accent font-bold text-white shadow-lg shadow-blue-500/20">E</div>
            <div>
              <div className="text-lg font-black tracking-tight">ExamVault AI</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Learn smarter</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="secondary-button hidden sm:inline-flex">Login</Link>
            <Link href="/register" className="primary-button">Get Started</Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-24 border-t border-slate-200 bg-slate-950 text-slate-200">
        <div className="container-shell grid gap-10 py-16 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-accent font-bold text-white">E</div>
              <div>
                <div className="text-lg font-black">ExamVault AI</div>
              </div>
            </div>
            <p className="text-sm text-slate-300">AI-powered learning, digital libraries, revision tools, and career support for students across Africa.</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Platform</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/exams">Examination Library</Link></li>
              <li><Link href="/books">Books</Link></li>
              <li><Link href="/notes">Notes</Link></li>
              <li><Link href="/tutor">AI Tutor</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Company</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/support">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/help">Help Center</Link></li>
              <li><Link href="/feedback">Feedback</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="container-shell flex flex-col items-center justify-between gap-3 py-5 text-sm text-slate-400 md:flex-row">
            <span>© 2026 ExamVault AI. All rights reserved.</span>
            <span>Powered by AI learning infrastructure</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
