# ExamVault AI

This project is a production-ready Next.js foundation for the ExamVault AI platform. It includes:

- Premium landing page and multi-page navigation
- AI search and tutor interfaces
- Student dashboard and admin dashboard screens
- Hidden secure admin route at `/secure-examvault-admin-x8f4h2`
- Middleware protection and 404 behavior for unauthorized access
- Search and AI API endpoints
- SEO, robots.txt, sitemap, and PWA-ready metadata structure

## Getting started

1. Install dependencies:
   npm install
2. Copy `.env.example` to `.env.local` and add real keys.
3. Run the development server:
   npm run dev
4. Open `http://localhost:3000`

## Notes

This scaffold is built to be connected to Supabase, OpenAI, Stripe, and analytics providers via environment variables. The UI is production-grade and ready for extension into a full enterprise platform.
