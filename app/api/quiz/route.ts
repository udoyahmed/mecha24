import { NextResponse } from 'next/server';
// Assuming your data file is located here:
import { treasureFlowDB } from '@/lib/codes'; 

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Ensure the client sends the correct keys
        const { quizCode, submittedAnswer } = body;

        if (!quizCode || submittedAnswer === undefined) {
            return NextResponse.json({ 
                isCorrect: false, 
                message: 'Missing quiz identifier or submitted answer.', 
                error: 'Bad Request' 
            }, { status: 400 });
        }

        // 1. Find the corresponding quiz in the mock database
        const quizEntry = treasureFlowDB.find(
            item => item.Quiz_Code === quizCode
        );

        if (!quizEntry) {
            return NextResponse.json({ 
                isCorrect: false, 
                message: 'Quiz not found.', 
            }, { status: 404 });
        }

        // 2. Check the answer (case-insensitive and trimmed comparison)
        const expectedAnswer = quizEntry.Quiz_Answer.trim().toLowerCase();
        const userAnswer = submittedAnswer.trim().toLowerCase();

        if (userAnswer === expectedAnswer) {
            // 3. Success: Return true and the Secret Word
            return NextResponse.json({ 
                isCorrect: true, 
                message: 'Congratulations! Answer is correct.',
                secretWord: quizEntry.Secret_Word // Include the Secret Word
            });
        } else {
            // 4. Failure
            return NextResponse.json({ 
                isCorrect: false, 
                message: 'Incorrect answer. Try again!',
            });
        }

    } catch (error) {
        console.error('Quiz API Error:', error);
        return NextResponse.json({ 
            isCorrect: false, 
            message: 'An internal server error occurred.', 
        }, { status: 500 });
    }
}