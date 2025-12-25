// app/treasure/[codeId]/page.tsx
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function TreasurePage() {
    const params = useParams();
    const router = useRouter(); // Initialize router for redirection
    // Safely extract the dynamic code ID (e.g., 'treasure1234')
    const pageCode = Array.isArray(params.codeId) ? params.codeId[0] : params.codeId || '';

    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(''); // Clear previous message
        setIsLoading(true);

        try {
            // Fetch request goes to the API route defined in app/api/password/route.ts
            const response = await fetch('/api/password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    pageCode: pageCode,           // Sends the dynamic URL code
                    enteredPassword: password,    // Sends the user's input
                }),
            });

            const data = await response.json();

            if (data.isCorrect) {
                setMessage('✅ Code accepted! ' + data.message);
                
                // REDIRECT to the new URL: /quiz/quiz-A
                if (data.nextPageUrl) {
                    router.push(data.nextPageUrl); 
                }
            } else {
                setMessage('❌ ' + data.message);
                setPassword(''); // Clear input on failure
            }

        } catch (error) {
            console.error('Frontend Fetch Error:', error);
            setMessage('🚨 An error occurred while contacting the server. Check console for details.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px',
        backgroundImage: 'url("YOUR_IMAGE_URL_HERE")', 
        backgroundColor: '#f4f4f4', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'sans-serif'
    }}>
        
        <img 
            src="https://i.postimg.cc/909n20hf/image-removebg-preview.png" 
            alt="Mechville Logo" 
            style={{ width: '120px', marginBottom: '10px' }} 
        />

        <h1 style={{ color: '#333', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center' }}>
            The Hound of Mechville
        </h1>

        <div style={{ 
            padding: '30px', 
            maxWidth: '400px', 
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.98)', 
            border: '1px solid #ccc', 
            borderRadius: '12px', 
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)' 
        }}>
            <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', color: '#ff4500', marginTop: 0 }}>
                Treasure Code: {pageCode}
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <label htmlFor="password-input" style={{ fontWeight: 'bold', color: '#333' }}>
                    Enter Code:
                </label>
                <input
                    id="password-input"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    /* EXPLICIT COLORS ADDED HERE */
                    style={{ 
                        padding: '12px', 
                        border: '2px solid #bbb', // Darker border for visibility
                        borderRadius: '4px',
                        backgroundColor: '#ffffff', // Force white background
                        color: '#000000', // Force black text/dots
                        fontSize: '16px'
                    }}
                />
                <button 
                    type="submit" 
                    disabled={isLoading} 
                    style={{ 
                        padding: '12px', 
                        backgroundColor: isLoading ? '#aaa' : '#ff4500', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        fontWeight: 'bold',
                        cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isLoading ? 'Verifying...' : 'Submit'}
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
        </div>
    </div>
);
}