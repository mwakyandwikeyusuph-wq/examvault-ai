import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://examvault.ai'),
  title: {
    default: 'ExamVault AI',
    template: '%s | ExamVault AI',
  },
  description: 'Learn smarter. Revise faster. Pass better.',
  openGraph: {
    title: 'ExamVault AI',
    description: 'AI-powered educational platform for exams, books, notes, and tutoring.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExamVault AI',
    description: 'Learn smarter. Revise faster. Pass better.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
