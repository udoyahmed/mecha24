import { NextResponse } from 'next/server';
// ⚠️ Ensure the import path for your database is correct:
import treasureFlowDB from '@/lib/codes'; 

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // The client should send the page identifier and the user's input
        const { pageCode, enteredPassword } = body; 

        // 1. Basic Input Validation
        if (!pageCode || enteredPassword === undefined) {
            return NextResponse.json(
                { isCorrect: false, message: 'Missing page code or password input.' },
                { status: 400 } // Bad Request
            );
        }

        // Find the configuration for this page code in the database
        const entry = treasureFlowDB.find(item => item.Code === pageCode);

        // 2. Check if the treasure configuration exists
        if (!entry) {
            return NextResponse.json(
                { isCorrect: false, message: 'Treasure page configuration not found.' },
                { status: 404 } // Not Found
            );
        }

        // 3. Secure Comparison
        // Convert both to string before comparing to prevent type strictness errors
        const passwordMatch = entry.Password.toString() === enteredPassword.toString();

        if (passwordMatch) {
            // SUCCESS: Provide the specific quiz URL for redirection
            return NextResponse.json({ 
                isCorrect: true, 
                message: 'Code accepted! Proceed to the final challenge.',
                // The client will use this URL to navigate to the quiz page: /quiz/quiz-A
                nextPageUrl: `/quiz/${entry.Quiz_Code}` 
            }, { status: 200 });
        } else {
            // FAILURE
            return NextResponse.json({ 
                isCorrect: false, 
                message: 'Incorrect password. Try again.' 
            }, { status: 200 });
        }

    } catch (error) {
        console.error('Password API Error:', error);
        // Catch all other unexpected errors
        return NextResponse.json(
            { isCorrect: false, message: 'Internal server error during verification.' },
            { status: 500 }
        );
    }
}

// Block other methods (like GET) for security on this endpoint
export async function GET() {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}