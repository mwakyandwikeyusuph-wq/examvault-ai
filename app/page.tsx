import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';
import { HeroSection, SearchBar, FeatureGrid, MaterialSection, TestimonialSection, CTASection } from '@/components/hero';
import { featuredExams, books, notes } from '@/lib/content';

export default function Page() {
  return (
    <SiteShell>
      <HeroSection />
      <SearchBar />
      <FeatureGrid />
      <MaterialSection title="Featured Exams" subtitle="Top picks" items={featuredExams} />
      <MaterialSection title="Popular Books" subtitle="Library" items={books} />
      <MaterialSection title="Notes Library" subtitle="Study aids" items={notes} />
      <TestimonialSection />
      <CTASection />
    </SiteShell>
  );
}
