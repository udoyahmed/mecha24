'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; 

export default function TreasureQuizPage() {
    const params = useParams();
    // Retrieves the dynamic segment from the URL (e.g., 'quiz-A')
    const codeId = Array.isArray(params.codeId) ? params.codeId[0] : params.codeId || '';

    // Quiz State
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Question Fetching State
    const [quizQuestion, setQuizQuestion] = useState('Retrieving puzzle details...');
    const [isQuestionLoading, setIsQuestionLoading] = useState(true);

    // Helper to check if the question content is a URL
    const isImageQuestion = quizQuestion.startsWith('http');

    // --- EFFECT TO FETCH QUESTION ON LOAD ---
    useEffect(() => {
        if (!codeId) return;

        const fetchQuestion = async () => {
            setIsQuestionLoading(true);
            try {
                // Call the API route for fetching the question content
                const response = await fetch(`/api/quiz-question?codeId=${codeId}`); 
                const data = await response.json();
                
                if (response.ok) {
                    // Set the question text or URL
                    setQuizQuestion(data.question || 'Question loaded successfully.');
                } else {
                    // If error, set message text
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
    }, [codeId]); 

    // --- FORM SUBMISSION HANDLER ---
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(''); 
        setIsLoading(true);

        try {
            // Call the final verification API: app/api/quiz/route.ts
            const response = await fetch('/api/quiz', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    // CRITICAL FIX: Use 'quizCode' key to match the server API
                    quizCode: codeId, 
                    submittedAnswer: answer,
                }),
            });

            const data = await response.json();

            if (data.isCorrect) {
                setMessage('✅ ' + data.message);
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
            <h2 style={{borderBottom: '2px solid gold', paddingBottom: '10px', color: '#ff4500'}}>Final Challenge: {codeId}</h2>
            
            {/* Conditional Rendering Logic for Question Content */}
            <div style={{ minHeight: isImageQuestion ? '400px' : '30px', margin: '20px 0', textAlign: 'center' }}>
                {isQuestionLoading ? (
                    <p style={{ fontSize: '1.1em', fontWeight: '500' }}>Retrieving puzzle details...</p>
                ) : isImageQuestion ? (
                    // Renders if the content is a URL
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
                    // Renders if the content is text (either a text question or an error)
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
                    disabled={isLoading || isQuestionLoading || message.startsWith('✅')}
                    style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
                <button type="submit" disabled={isLoading || isQuestionLoading || message.startsWith('✅')} style={{ padding: '10px', backgroundColor: isLoading || isQuestionLoading || message.startsWith('✅') ? '#aaa' : '#ff4500', color: 'white', border: 'none', borderRadius: '4px', cursor: isLoading || isQuestionLoading || message.startsWith('✅') ? 'not-allowed' : 'pointer' }}>
                    {isLoading ? 'Checking Answer...' : 'Submit Answer'}
                </button>
            </form>

            {message && (
                <p style={{ fontWeight: 'bold', marginTop: '20px', padding: '10px', borderLeft: message.startsWith('✅') ? '4px solid green' : '4px solid red', backgroundColor: message.startsWith('✅') ? '#e6ffe6' : '#ffe6e6', color: message.startsWith('✅') ? '#333' : '#a00' }}>
                    {message}
                </p>
            )}
        </div>
    );
}