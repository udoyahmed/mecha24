'use client';

import { useState, useEffect } from 'react';
// Note: next/navigation import is intentionally removed to fix compilation errors.

export default function TreasureQuizPage() {
    // Workaround to get ID from URL path (replaces Next.js useParams)
    const [codeId, setCodeId] = useState('');

    // Quiz State
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submissionTime, setSubmissionTime] = useState<string | null>(null); 
    
    // State to hold the secret word revealed by the API
    const [secretWord, setSecretWord] = useState<string | null>(null); 
    
    // Question Fetching State
    const [quizQuestion, setQuizQuestion] = useState('Retrieving puzzle details...');
    const [isQuestionLoading, setIsQuestionLoading] = useState(true);

    // Helper to check if the question content is a URL
    const isImageQuestion = quizQuestion.startsWith('http');

    // --- EFFECT 1: EXTRACT ID FROM URL PATH (Workaround) ---
    useEffect(() => {
        // Only run this logic on the client side
        if (typeof window !== 'undefined') {
            const path = window.location.pathname; // e.g., /quiz/quiz-A
            const parts = path.split('/').filter(part => part.length > 0);
            
            // The ID should be the last part of the path 
            if (parts.length > 0) {
                const id = parts[parts.length - 1];
                if (id && id !== 'quiz') { 
                    setCodeId(id);
                }
            }
        }
    }, []); 

    // --- EFFECT 2: FETCH QUESTION ON CODE ID LOADED ---
    useEffect(() => {
        if (!codeId) return; // Wait until codeId is extracted from the URL

        const fetchQuestion = async () => {
            setIsQuestionLoading(true);
            try {
                // Call the API route for the question
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
    }, [codeId]);

    // --- FORM SUBMISSION HANDLER ---
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(''); 
        setIsLoading(true);
        setSubmissionTime(null); 
        setSecretWord(null); 

        if (!codeId) {
            setMessage('🚨 Quiz identifier not loaded yet. Please wait.');
            setIsLoading(false);
            return;
        }

        try {
            // Call the verification API
            const response = await fetch('/api/quiz', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    quizCode: codeId, // Correct key name for API
                    submittedAnswer: answer,
                }),
            });

            const data = await response.json();

            if (data.isCorrect) {
                setMessage('✅ ' + data.message);
                const now = new Date();
                setSubmissionTime(now.toLocaleTimeString()); 
                
                // Set the secret word received from the API
                if (data.secretWord) {
                    setSecretWord(data.secretWord);
                }

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
    /* Background Placeholder Container */
    <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px',
        /* Background Image Placeholder */
        backgroundImage: 'url("https://i.postimg.cc/CKbqDfV6/image.png")', 
        backgroundColor: '#f4f4f4', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'sans-serif'
    }}>
        
        {/* Logo Section */}
        <img 
            src="https://i.postimg.cc/g0cxwtN6/logo4.png" 
            alt="Mechville Logo" 
            style={{ width: '150px', marginBottom: '5px' }} 
        />

        {/* Title Section */}
        <h1 style={{ 
            color: '#851c1cff', 
            marginBottom: '10px', 
            letterSpacing: '2px', 
            textAlign: 'center',
            /* Added Font Styles Below */
            fontFamily: '"Manufacturing Consent", sans-serif', 
            fontSize: '2rem', // Adjust size as needed for this specific font
            fontWeight: 'normal',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
        }}>
            The Hound of Mechville
        </h1>

        {/* Main Quiz Card */}
        <div style={{ 
            padding: '30px', 
            maxWidth: '600px', 
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.98)', 
            border: '2px dashed gold', 
            borderRadius: '12px', 
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)' 
        }}>
            <h2 style={{ borderBottom: '2px solid gold', paddingBottom: '10px', color: '#862a2aff', marginTop: 0 }}>
                Quiz Code: {codeId || 'Loading...'}
            </h2>
            
            {/* Conditional Rendering Logic for Question Content */}
            <div style={{ minHeight: isImageQuestion ? '300px' : '30px', margin: '20px 0', textAlign: 'center' }}>
                {isQuestionLoading || !codeId ? (
                    <p style={{ fontSize: '1.1em', fontWeight: '500' }}>Retrieving puzzle details...</p>
                ) : isImageQuestion ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img 
                            src={quizQuestion} 
                            alt="Quiz Question" 
                            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #ccc' }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).onerror = null; 
                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/cc0000/ffffff?text=Image+Failed+to+Load'; 
                            }}
                        />
                    </div>
                ) : (
                    <p style={{ fontSize: '1.2em', fontWeight: '600', color: '#444' }}>{quizQuestion}</p>
                )}
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label htmlFor="quiz-input" style={{ fontWeight: 'bold', color: '#333' }}>
                    Your Answer:
                </label>
                <input
                    id="quiz-input"
                    type="text"
                    value={answer}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
                    required
                    disabled={isLoading || isQuestionLoading || !codeId || message.startsWith('✅')}
                    /* Fixed Visibility Styles */
                    style={{ 
                        padding: '12px', 
                        border: '2px solid #bbb', 
                        borderRadius: '4px',
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        fontSize: '16px'
                    }}
                />
                <button 
                    type="submit" 
                    disabled={isLoading || isQuestionLoading || !codeId || message.startsWith('✅')} 
                    style={{ 
                        padding: '12px', 
                        backgroundColor: (isLoading || isQuestionLoading || !codeId || message.startsWith('✅')) ? '#aaa' : '#862a2aff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        fontWeight: 'bold',
                        cursor: (isLoading || isQuestionLoading || !codeId || message.startsWith('✅')) ? 'not-allowed' : 'pointer' 
                    }}
                >
                    {isLoading ? 'Checking Answer...' : 'Submit Answer'}
                </button>
            </form>

            {message && (
                <p style={{ 
                    fontWeight: 'bold', 
                    marginTop: '20px', 
                    padding: '10px', 
                    borderRadius: '4px',
                    borderLeft: message.startsWith('✅') ? '4px solid green' : '4px solid red', 
                    backgroundColor: message.startsWith('✅') ? '#e6ffe6' : '#ffe6e6', 
                    color: message.startsWith('✅') ? '#333' : '#a00' 
                }}>
                    {message}
                </p>
            )}
            
            {/* Display the submission time */}
            {submissionTime && message.startsWith('✅') && (
                <p style={{ color: "#862a2aff", fontWeight: 'bold', marginTop: '20px', padding: '10px', border: '1px solid #ffcccc', borderRadius: '4px' }}>
                    Submission recorded at: <span>{submissionTime}</span>
                </p>
            )}
            
            {/* Display the Secret Word */}
            {secretWord && message.startsWith('✅') && (
                <div style={{ marginTop: '20px', padding: '15px', border: '2px dashed #00bfff', borderRadius: '8px', backgroundColor: '#e0ffff'}}>
                    {/* <p style={{ fontWeight: 'bold', color: '#0070c0', fontSize: '1.1em', marginBottom: '5px' }}>
                        Clue:
                    </p> */}
                    <p style={{ 
                        fontWeight: '900', 
                        fontFamily: '"Courier New", Courier, monospace', 
                        color: '#862a2aff', fontSize: '1rem', 
                        whiteSpace: 'pre-line',
                        margin: 0 
                    }}>
                        {secretWord}
                    </p>
                </div>
            )}
        </div>
    </div>
);
}