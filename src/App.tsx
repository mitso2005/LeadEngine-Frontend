import React, { useState } from 'react';
import './App.css'
import Field from './components/field';
import { enrichContacts, type EnrichParams, type EnrichResponse, type Person } from './api/leadEngine';

function App() {
  // ── Form state ──────────────────────────────────────────────────────────────
  const [domains, setDomains] = useState('');
  const [titles, setTitles] = useState('');
  const [maxResults, setMaxResults] = useState('');

  // ── Request state ───────────────────────────────────────────────────────────
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<EnrichResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Handler ─────────────────────────────────────────────────────────────────
  // Collects form values, passes them to the API layer, updates UI state.
  // All URL building and fetch logic lives in src/api/leadEngine.ts.
  const handleFind = async () => {
    setError(null);
    setLoading(true);
    setResults(null);

    const params: EnrichParams = { domains, titles, maxResults };

    try {
      const data = await enrichContacts(params);
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card">
        <Field placeholder="google.com,commbank.com.au" variable="domains" value={domains} onChange={setDomains}/>
        <Field placeholder="Head of Data,PMO" variable="titles" value={titles} onChange={setTitles}/>
        <Field placeholder="10" variable="max_results" value={maxResults} onChange={setMaxResults}/>
      </div>

      <div className="card">
        <button onClick={handleFind} disabled={loading}>
          {loading ? 'Searching…' : 'Find Client Contacts'}
        </button>
      </div>

      <div className="card">
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {results && (
          <div>
            <p>{results.people_found} result(s) from {results.companies_processed} company(s)</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['First Name','Last Name','Title','Company','Email','Phone','Location','LinkedIn'].map(h => (
                    <th key={h} style={{ border: '1px solid #ccc', padding: '6px 10px', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.people.map((person: Person, i: number) => (
                  <tr key={i}>
                    <td style={{ border: '1px solid #ccc', padding: '6px 10px' }}>{person.first_name}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px 10px' }}>{person.last_name}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px 10px' }}>{person.title}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px 10px' }}>{person.company}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px 10px' }}>{person.email ?? '—'}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px 10px' }}>{person.phone ?? '—'}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px 10px' }}>{person.location ?? '—'}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px 10px' }}>
                      {person.linkedin_url
                        ? <a href={person.linkedin_url} target="_blank" rel="noreferrer">View</a>
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default App
