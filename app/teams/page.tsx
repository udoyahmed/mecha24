'use client';

import { useState } from 'react';
import { teamData } from "@/lib/teamData";

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const allTeams = Object.keys(teamData);
  const filteredTeams = allTeams.filter(team =>
    team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundImage: 'url("https://i.postimg.cc/8cZ4CxrY/2.jpg")',
      backgroundColor: '#f4f4f4',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: 'sans-serif'
    }}>
      <img
        src="https://i.postimg.cc/g0cxwtN6/logo4.png"
        alt="Mechville Logo"
        style={{ width: '150px', marginBottom: '5px' }}
      />

      <h1 style={{
        color: '#862a2aff',
        marginBottom: '10px',
        letterSpacing: '2px',
        textAlign: 'center',
        fontFamily: '"Manufacturing Consent", sans-serif',
        fontSize: '2rem',
        fontWeight: 'normal',
        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
      }}>
        The Hound of Mechville
      </h1>

      <div style={{
        padding: '30px',
        maxWidth: '800px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        border: '1px solid #ccc',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
      }}>
        <p className="text-center font-semibold text-gray-700 mb-4">Total Teams: {allTeams.length}</p>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search your team"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border"
              >
                <h2 className="text-lg font-semibold text-gray-700">{team}</h2>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No teams found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}

