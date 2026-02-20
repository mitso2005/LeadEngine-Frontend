import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ErrorBanner from './components/ErrorBanner';
import ResultsTable from './components/ResultsTable';
import { enrichContacts, type EnrichParams, type EnrichResponse } from './api/leadEngine';

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
    <div className="min-h-screen bg-[#f3f7f8] text-[#051729] flex flex-col">

      <Header />

      <main className="flex-1 flex flex-col items-center justify-start px-6 py-10 gap-8 w-full">

        {/* Search form + error — constrained width */}
        <div className="w-full max-w-3xl flex flex-col gap-8">
          <SearchForm
            domains={domains}
            titles={titles}
            maxResults={maxResults}
            loading={loading}
            onDomainsChange={setDomains}
            onTitlesChange={setTitles}
            onMaxResultsChange={setMaxResults}
            onSubmit={handleFind}
          />
          {error && <ErrorBanner message={error} />}
        </div>

        {/* Results table — full width */}
        {results && <ResultsTable results={results} />}

      </main>
    </div>
  );
}

export default App;
