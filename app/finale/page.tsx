'use client';

import { useState } from 'react';

export default function Finale() {
    const [answers, setAnswers] = useState({
        blank1: '', blank2: '', blank3: '', blank4: '', blank5: '', blank6: '', blank7: ''
    });
    const [result, setResult] = useState<{ success: boolean; message: string; image?: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const res = await fetch('/api/finale', {
            method: 'POST',
            body: JSON.stringify({ userAnswers: answers }),
        });
        const data = await res.json();
        setResult(data);
    };

    return (
        <div style={{ 
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', padding: '20px',
            backgroundImage: 'url("https://i.postimg.cc/CKbqDfV6/image.png")', 
            backgroundColor: '#f4f4f4', backgroundSize: 'cover', backgroundPosition: 'center',
            fontFamily: 'sans-serif'
        }}>
            <img src="https://i.postimg.cc/g0cxwtN6/logo4.png" alt="Mechville Logo" style={{ width: '150px', marginBottom: '5px' }} />

            <h1 style={{ 
                color: '#862a2aff', marginBottom: '10px', letterSpacing: '2px', textAlign: 'center',
                fontFamily: '"Manufacturing Consent", sans-serif', fontSize: '2rem', fontWeight: 'normal',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}>
                The Hound of Mechville
            </h1>

            <div style={{ 
                padding: '30px', maxWidth: '450px', width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.98)', border: '1px solid #ccc', 
                borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' 
            }}>
                {result?.success ? (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#2e7d32' }}>{result.message}</h2>
                        <img src={result.image} alt="Final Clue" style={{ width: '100%', marginTop: '15px', borderRadius: '8px' }} />
                    </div>
                ) : (
                    <>
                        <p style={{ 
                            fontWeight: '900', 
                            fontFamily: '"Courier New", Courier, monospace', 
                            color: '#862a2aff', fontSize: '1rem', 
                            whiteSpace: 'pre-line',
                            margin: 0, 
                        }}>
                            [Part 7]<br></br><br></br>No murder weapon was found at the crime scene. How did Doyle's death unfold?
                        </p>

                        <div style={{ 
                            fontWeight: '500', 
                            fontFamily: '"Special Elite", system-ui, serif',
                            color: '#000000ff',
                            lineHeight: '1.8', 
                            fontSize: '0.9rem', 
                            paddingTop: '30px',
                            textAlign: 'left', // Ensuring text stays aligned properly

                            marginTop: '30px',
                            padding: '30px', 
                            maxWidth: '600px', 
                            width: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                            border: '2px dashed #862a2aff', 
                            borderRadius: '12px', 
                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)' 
                        }}>
                            Doyle was on his phone when suddenly the doorbell rang; he had gotten 
                            <input name="blank1" value={answers.blank1} onChange={handleChange} style={inputStyle} />. <br/>
                            
                            <br></br>He picked it up and <input name="blank2" value={answers.blank2} onChange={handleChange} style={inputStyle} /> it. <br/>
                            
                            <br></br>Suddenly, it caught <input name="blank3" value={answers.blank3} onChange={handleChange} style={inputStyle} />. <br/>
                            
                            <br></br>Seeing this, Doyle got <input name="blank4" value={answers.blank4} onChange={handleChange} style={inputStyle} /> and put his hands over his mouth. <br/>
                            
                            <br></br>He didn’t know it was laced with <input name="blank5" value={answers.blank5} onChange={handleChange} style={inputStyle} />. <br/>
                            
                            <br></br>The evidence <input name="blank6" value={answers.blank6} onChange={handleChange} style={inputStyle} /> itself, as it was made out of  <input name="blank7" value={answers.blank7} onChange={handleChange} style={inputStyle} />.
                        </div>

                        <button onClick={handleSubmit} style={buttonStyle}>Submit Investigation</button>
                        {result && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{result.message}</p>}
                    </>
                )}
            </div>
        </div>
    );
}

const inputStyle = {
    border: 'none',
    borderBottom: '1px solid #862a2aff',
    outline: 'none',
    width: '80px',
    padding: '0 5px',
    backgroundColor: 'transparent',
    color: '#862a2aff',
    fontWeight: 'bold'
};

const buttonStyle = {
    marginTop: '25px',
    width: '100%',
    padding: '12px',
    backgroundColor: '#862a2aff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
};