import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const question = (body?.question as string) || 'Explain photosynthesis';

  return NextResponse.json({
    success: true,
    answer: `Here's a helpful explanation for: "${question}". This response is generated through the AI tutor layer and can be connected to OpenAI + RAG once your environment variables are configured.`,
    language: 'English',
    confidence: 0.96,
  });
}
