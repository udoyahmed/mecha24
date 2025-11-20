import { NextResponse } from 'next/server';
// ⚠️ Ensure the import path for your database is correct:
import treasureFlowDB from '@/lib/codes'; 

// We need a helper function to find the configuration based on the Quiz_Code
const findQuizEntry = (quizCode: string) => {
    // Searches the database for the entry matching the submitted quizCode
    return treasureFlowDB.find(item => item.Quiz_Code === quizCode);
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // The client should send the quiz identifier and the user's answer
        const { quizCode, submittedAnswer } = body; 

        // 1. Basic Input Validation
        if (!quizCode || submittedAnswer === undefined) {
            return NextResponse.json(
                { isCorrect: false, message: 'Missing quiz identifier or submitted answer.' },
                { status: 400 } // Bad Request
            );
        }

        const entry = findQuizEntry(quizCode);

        // 2. Check if the quiz configuration exists
        if (!entry) {
            return NextResponse.json(
                { isCorrect: false, message: 'Quiz configuration not found.' },
                { status: 404 } // Not Found
            );
        }
        
        // 3. Secure Comparison
        // We compare them in lowercase to make the quiz less sensitive to user casing (e.g., '300' vs '300' or 'paris' vs 'Paris')
        const answerMatch = entry.Quiz_Answer.toString().toLowerCase() === submittedAnswer.toString().toLowerCase();

        if (answerMatch) {
            // SUCCESS: Final step, no redirection needed
            return NextResponse.json({ 
                isCorrect: true, 
                message: '🥳 Congratulations! You have successfully completed the treasure hunt!' 
            }, { status: 200 });
        } else {
            // FAILURE
            return NextResponse.json({ 
                isCorrect: false, 
                message: 'Incorrect answer. Please check your clues and try again.' 
            }, { status: 200 });
        }

    } catch (error) {
        console.error('Quiz API Error:', error);
        // Catch all other unexpected errors
        return NextResponse.json(
            { isCorrect: false, message: 'Internal server error during quiz verification.' },
            { status: 500 } // Internal Server Error
        );
    }
}

// Block other methods (like GET) for security on this submission endpoint
export async function GET() {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}