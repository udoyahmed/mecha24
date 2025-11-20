'use client';

import { useState, useEffect } from 'react';
// REMOVED: import { useParams } from 'next/navigation'; // This was causing the compilation error

export default function TreasureQuizPage() {
    // We now manage codeId as state and extract it using client-side JS
    const [codeId, setCodeId] = useState('');

    // Quiz State
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submissionTime, setSubmissionTime] = useState<string | null>(null); 
    
    // Question Fetching State
    const [quizQuestion, setQuizQuestion] = useState('Retrieving puzzle details...');
    const [isQuestionLoading, setIsQuestionLoading] = useState(true);

    // Helper to check if the question content is a URL
    const isImageQuestion = quizQuestion.startsWith('http');

    // --- EFFECT TO EXTRACT ID FROM URL (Workaround for useParams) ---
    useEffect(() => {
        // Only run this logic on the client side
        if (typeof window !== 'undefined') {
            const path = window.location.pathname; // e.g., /quiz/quiz-A
            const parts = path.split('/').filter(part => part.length > 0);
            
            // The ID should be the last part of the path (e.g., 'quiz-A')
            if (parts.length > 0) {
                const id = parts[parts.length - 1];
                // Check if the path format matches expectations (starts with 'quiz' or is the root ID)
                if (id && id !== 'quiz') { 
                    setCodeId(id);
                }
            }
        }
    }, []); 

    // --- EFFECT TO FETCH QUESTION ON CODE ID LOADED ---
    useEffect(() => {
        if (!codeId) return; // Wait until codeId is extracted from the URL

        const fetchQuestion = async () => {
            setIsQuestionLoading(true);
            try {
                const response = await fetch(`/api/quiz-question?codeId=${codeId}`); 
                const data = await response.json();
                
                if (response.ok) {
                    setQuizQuestion(data.question || 'Question loaded successfully.');
                } else {
                    setQuizQuestion(`Error: ${data.message || 'Could not load question.'}`);
                }
            } catch (error) {
                setQuizQuestion('Error: Failed to connect to server for question.');
                console.error("Question Fetch Error:", error);
            } finally {
                setIsQuestionLoading(false);
            }
        };

        fetchQuestion();
    }, [codeId]); // Runs when the codeId state is successfully set

    // --- FORM SUBMISSION HANDLER ---
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(''); 
        setIsLoading(true);
        setSubmissionTime(null); 

        // Prevent submission if ID hasn't loaded yet
        if (!codeId) {
            setMessage('🚨 Quiz identifier not loaded yet. Please wait.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/quiz', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    quizCode: codeId, 
                    submittedAnswer: answer,
                }),
            });

            const data = await response.json();

            if (data.isCorrect) {
                setMessage('✅ ' + data.message);
                const now = new Date();
                setSubmissionTime(now.toLocaleTimeString()); 
            } else {
                setMessage('❌ ' + data.message);
            }

        } catch (error) {
            console.error('Quiz Submission Error:', error);
            setMessage('🚨 An error occurred while submitting the answer.');
        } finally {
            setIsLoading(false);
        }
    };

    return ( 
        <div style={{ padding: '20px', maxWidth: '600px', margin: '50px auto', border: '2px dashed gold', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{borderBottom: '2px solid gold', paddingBottom: '10px', color: '#ff4500'}}>Final Challenge: {codeId || 'Loading...'}</h2>
            
            {/* Conditional Rendering Logic for Question Content */}
            <div style={{ minHeight: isImageQuestion ? '400px' : '30px', margin: '20px 0', textAlign: 'center' }}>
                {isQuestionLoading || !codeId ? (
                    <p style={{ fontSize: '1.1em', fontWeight: '500' }}>Retrieving puzzle details...</p>
                ) : isImageQuestion ? (
                    <img 
                        src={quizQuestion} 
                        alt="Quiz Question Image" 
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px', border: '1px solid #ccc' }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).onerror = null; 
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/cc0000/ffffff?text=Image+Failed+to+Load'; 
                        }}
                    />
                ) : (
                    <p style={{ fontSize: '1.1em', fontWeight: '500' }}>{quizQuestion}</p>
                )}
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label htmlFor="quiz-input" style={{ fontWeight: 'bold' }}>
                    Your Answer:
                </label>
                <input
                    id="quiz-input"
                    type="text"
                    value={answer}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
                    required
                    disabled={isLoading || isQuestionLoading || !codeId || message.startsWith('✅')}
                    style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
                <button type="submit" disabled={isLoading || isQuestionLoading || !codeId || message.startsWith('✅')} style={{ padding: '10px', backgroundColor: isLoading || isQuestionLoading || !codeId || message.startsWith('✅') ? '#aaa' : '#ff4500', color: 'white', border: 'none', borderRadius: '4px', cursor: isLoading || isQuestionLoading || !codeId || message.startsWith('✅') ? 'not-allowed' : 'pointer' }}>
                    {isLoading ? 'Checking Answer...' : 'Submit Answer'}
                </button>
            </form>

            {message && (
                <p style={{ fontWeight: 'bold', marginTop: '20px', padding: '10px', borderLeft: message.startsWith('✅') ? '4px solid green' : '4px solid red', backgroundColor: message.startsWith('✅') ? '#e6ffe6' : '#ffe6e6', color: message.startsWith('✅') ? '#333' : '#a00' }}>
                    {message}
                </p>
            )}
            
            {/* Display the submission time if available and the answer was correct */}
            {submissionTime && message.startsWith('✅') && (
                <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#FFFFFF' }}>
                    Submission recorded at: <span style={{ fontWeight: 'bold' }}>{submissionTime}</span>
                </p>
            )}
        </div>
    );
}