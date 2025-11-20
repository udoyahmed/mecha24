// app/api/quiz-question/route.ts
import { NextResponse } from 'next/server';
// ⚠️ Ensure the import path for your database is correct:
import treasureFlowDB from '@/lib/codes'; 

export async function GET(request: Request) {
    try {
        // 1. Get the 'codeId' (which holds the Quiz_Code) from the URL query parameters
        const url = new URL(request.url);
        const quizCode = url.searchParams.get('codeId');

        if (!quizCode) {
            return NextResponse.json(
                { message: 'Missing quiz identifier in query.' },
                { status: 400 } // Bad Request
            );
        }

        // 2. Find the configuration for this quiz code in the database
        const entry = treasureFlowDB.find(item => item.Quiz_Code === quizCode);

        if (!entry) {
            return NextResponse.json(
                { message: 'Quiz configuration not found.' },
                { status: 404 } // Not Found
            );
        }
        
        // 3. SUCCESS: Return only the question text to the client
        return NextResponse.json({ 
            question: entry.Quiz_Question 
        }, { status: 200 });

    } catch (error) {
        console.error('Quiz Question Fetch API Error:', error);
        return NextResponse.json(
            { message: 'Internal server error while fetching question.' },
            { status: 500 } // Internal Server Error
        );
    }
}

// Block POST and other methods since this is read-only
export async function POST() {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}