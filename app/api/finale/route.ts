import { NextResponse } from 'next/server';
import { puzzleData } from '@/lib/finale';

export async function POST(request: Request) {
  const body = await request.json();
  const { userAnswers } = body;

  const isCorrect = Object.keys(puzzleData.answers).every((key) => {
    const validOptions = puzzleData.answers[key as keyof typeof puzzleData.answers];
    const userValue = userAnswers[key]?.toLowerCase().trim();

    return validOptions.includes(userValue);
  });

  if (isCorrect) {
    return NextResponse.json({ 
      success: true, 
      message: puzzleData.successMessage, 
      image: puzzleData.finalClue 
    });
  }

  return NextResponse.json({ success: false, message: "Incorrect answers. The mystery remains unsolved..." });
}