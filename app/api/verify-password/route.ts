import { NextResponse } from 'next/server';
// ⚠️ IMPORTANT: Update this import path if your 'lib' folder is not at the project root
// We use '../lib/codes' because we are navigating out of 'app/api' and into 'lib'
import db, { TreasureCode } from '@/lib/codes'; 

// Helper function to find the correct entry
const findCodeEntry = (codeId: string): TreasureCode | undefined => {
    return db.find(item => item.Code === codeId);
};

// Next.js App Router POST handler
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { pageCode, enteredPassword } = body;

        // Basic input validation
        if (!pageCode || enteredPassword === undefined) {
            return NextResponse.json(
                { isCorrect: false, message: 'Missing pageCode or password.' },
                { status: 400 } // Bad Request
            );
        }

        const entry = findCodeEntry(pageCode);

        // Check if the treasure page exists
        if (!entry) {
            return NextResponse.json(
                { isCorrect: false, message: 'Treasure page configuration not found.' },
                { status: 404 } // Not Found
            );
        }

        // Secure Comparison: Convert both to string before comparing
        const passwordMatch = entry.Password.toString() === enteredPassword.toString();

        if (passwordMatch) {
            // SUCCESS
            return NextResponse.json({ isCorrect: true, message: 'Code accepted!' }, { status: 200 });
        } else {
            // FAILURE
            return NextResponse.json({ isCorrect: false, message: 'Incorrect password. Try again.' }, { status: 200 });
        }

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { isCorrect: false, message: 'Internal server error during verification.' },
            { status: 500 } // Internal Server Error
        );
    }
}

// Optionally, block other HTTP methods
export async function GET() {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}