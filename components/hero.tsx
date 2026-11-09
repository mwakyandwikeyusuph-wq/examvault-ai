import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, BookOpen, GraduationCap, Search, Sparkles, Star } from 'lucide-react';
import { stats } from '@/lib/content';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.15),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.2),_transparent_20%)]" />
      <div className="container-shell relative grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-secondary">
            <Sparkles className="h-4 w-4" /> AI-powered credentialed learning platform
          </div>

          <h1 className="max-w-xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
            Learn Smarter. <br /> Revise Faster. <br /> Pass Better.
          </h1>

          <p className="mt-6 max-w-lg text-lg text-slate-600">
            ExamVault AI combines a digital library, AI tutor, revision assistant, and analytics dashboard to help students learn with confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/register" className="primary-button">Join now</Link>
            <Link href="/tutor" className="secondary-button">Explore AI Tutor</Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-4">
                <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-12 h-24 w-24 rounded-full bg-cyan-400/30 blur-3xl" />
          <div className="absolute -right-6 bottom-10 h-28 w-28 rounded-full bg-blue-500/25 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/70 p-4 shadow-2xl backdrop-blur-xl">
            <div className="relative h-[620px] overflow-hidden rounded-[1.6rem] bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                alt="Student studying in classroom"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-slate-900/10 to-cyan-500/20" />

              <div className="absolute right-6 top-6 rounded-2xl border border-white/30 bg-white/20 p-3 shadow-xl backdrop-blur-lg">
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <BrainCircuit className="h-4 w-4 text-cyan-300" /> AI Study Coach
                </div>
              </div>

              <div className="absolute left-6 top-8 rounded-2xl border border-white/30 bg-white/15 p-4 backdrop-blur-lg">
                <div className="text-xs uppercase tracking-[0.22em] text-cyan-100">Revision score</div>
                <div className="mt-2 text-3xl font-black text-white">96%</div>
              </div>

              <div className="absolute bottom-8 left-6 right-6 rounded-3xl border border-white/20 bg-slate-950/35 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-cyan-200">Smart plan</div>
                    <div className="mt-2 text-xl font-bold text-white">Biology revision path</div>
                  </div>
                  <div className="rounded-full bg-emerald-500/20 px-3 py-2 text-sm font-semibold text-emerald-300">On track</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SearchBar() {
  return (
    <section className="container-shell -mt-10 relative z-10 pb-20">
      <div className="glass mx-auto max-w-5xl rounded-[2rem] p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1 rounded-full border border-slate-200 bg-white px-5 py-4 text-slate-600 shadow-sm">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
                placeholder="Search exams, books, notes, subjects, institutions..."
              />
            </div>
          </div>
          <button className="primary-button whitespace-nowrap">Search materials</button>
        </div>
      </div>
    </section>
  );
}

export function FeatureGrid() {
  const features = [
    { icon: BookOpen, title: 'Digital Library', text: 'Browse curated exams, books, notes, and research materials.' },
    { icon: BrainCircuit, title: 'AI Tutor', text: 'Ask concept questions and get explainers with document-backed answers.' },
    { icon: GraduationCap, title: 'Study Planner', text: 'Create timetables, track tasks, and stay consistent with your learning streak.' },
    { icon: Sparkles, title: 'Smart Analytics', text: 'Track performance, download trends, and AI usage in real time.' },
  ];

  return (
    <section className="container-shell py-20">
      <div className="mb-10 text-center">
        <div className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-secondary">Everything you need</div>
        <h2 className="text-4xl font-black tracking-tight text-slate-900">A complete learning workspace</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="soft-card">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent text-white shadow-lg shadow-blue-500/20">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MaterialSection({ title, subtitle, items }: { title: string; subtitle: string; items: any[] }) {
  return (
    <section className="container-shell py-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{subtitle}</div>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{title}</h2>
        </div>
        <Link href="/search" className="text-sm font-semibold text-secondary">View all</Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="soft-card overflow-hidden p-0">
            <div className={`h-36 bg-gradient-to-br ${item.accent}`} />
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{item.type}</span>
                <span className="flex items-center gap-1 text-sm font-semibold text-amber-500"><Star className="h-4 w-4 fill-current" /> {item.rating}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                <span>{item.subject}</span>
                <span>{item.downloads} downloads</span>
              </div>
              <div className="mt-3 text-sm font-medium text-slate-600">{item.institution}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TestimonialSection() {
  return (
    <section className="container-shell py-20">
      <div className="mb-10 text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Student outcomes</div>
        <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Success stories that speak volumes</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { name: 'Amina K.', role: 'Final Year Student', quote: 'The AI revision plans cut my study time while increasing my confidence before every exam.' },
          { name: 'Brian O.', role: 'Civil Engineering', quote: 'I searched for solved past papers and instantly got relevant revision chunks and explanations.' },
          { name: 'Kelvin M.', role: 'Business Student', quote: 'The dashboard forced me to stay consistent, and my GPA is now clearly improving.' },
        ].map((t) => (
          <div key={t.name} className="soft-card">
            <div className="mb-4 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="text-slate-700">“{t.quote}”</p>
            <div className="mt-6 border-t border-slate-200 pt-4">
              <div className="font-bold text-slate-900">{t.name}</div>
              <div className="text-sm text-slate-500">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="container-shell pb-20">
      <div className="rounded-[2rem] bg-gradient-to-r from-primary via-secondary to-accent p-10 text-white shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Ready to learn smarter?</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Build your next success story with ExamVault AI</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-900">Create account <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/tutor" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white">Try AI Tutor</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
