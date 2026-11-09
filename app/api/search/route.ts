import { NextResponse } from 'next/server';

export async function GET() {
  const results = [
    { id: 'exam-1', title: 'KCSE Biology Past Papers', type: 'exam', score: 98 },
    { id: 'book-2', title: 'Modern Physics for Advanced Learners', type: 'book', score: 94 },
    { id: 'note-3', title: 'Chemistry Formula Summary', type: 'note', score: 91 },
  ];

  return NextResponse.json({ success: true, results, total: results.length });
}
