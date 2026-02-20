import React, { useState } from 'react';
import './App.css'
import Field from './components/field';
import { enrichContacts, type EnrichParams } from './api/leadEngine';

function App() {
  // ── Form state ──────────────────────────────────────────────────────────────
  const [domains, setDomains] = useState('');
  const [titles, setTitles] = useState('');
  const [maxResults, setMaxResults] = useState('');

  // ── Request state ───────────────────────────────────────────────────────────
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
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
        {results && <pre>{JSON.stringify(results, null, 2)}</pre>}
      </div>
    </>
  )
}

export default App
