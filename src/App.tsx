import React, { useState } from 'react';
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
    <div className="min-h-screen bg-[#f3f7f8] text-[#051729] flex flex-col">

      {/* ── Header ── */}
      <header className="bg-[#051729] text-white px-8 py-5 shadow text-center">
        <h1 className="text-5xl font-bold tracking-wide">LeadEngine</h1>
        <p className="text-[#b7cee2] text-sm mt-4">Find client contacts by domain and title</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start px-6 py-10 gap-8 w-full">
        <div className="w-full max-w-3xl flex flex-col gap-8">

        {/* ── Search form ── */}
        <section className="w-full bg-white rounded-2xl shadow-sm border border-[#b7cee2] p-8">
          <h2 className="text-lg font-semibold text-[#051729] mb-6">Search Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field placeholder="commbank.com.au,google.com" variable="Domains" value={domains} onChange={setDomains}/>
            <Field placeholder="Head of Data, PMO" variable="Titles" value={titles} onChange={setTitles}/>
            <Field placeholder="10" variable="Max Results" value={maxResults} onChange={setMaxResults}/>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleFind}
              disabled={loading}
              className="bg-[#F5AB40] hover:bg-[#e09730] disabled:opacity-50 text-[#051729] font-bold px-10 py-3 rounded-xl shadow transition-colors duration-200 cursor-pointer text-base tracking-wide"
            >
              {loading ? 'Searching…' : 'Find Client Contacts'}
            </button>
          </div>
        </section>

        {/* ── Error ── */}
        {error && (
          <div className="w-full bg-red-50 border border-red-200 text-red-700 rounded-xl px-6 py-4">
            {error}
          </div>
        )}

        {/* ── Results table ── */}
        {results && (
          <section className="w-full bg-white rounded-2xl shadow-sm border border-[#b7cee2] p-8">
            <h2 className="text-lg font-semibold text-[#051729] mb-1">Results</h2>
            <p className="text-sm text-[#051729]/60 mb-6">
              {results.people_found} contact(s) across {results.companies_processed} company(s)
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#b7cee2]/30 text-[#051729]">
                    {['First Name','Last Name','Title','Company','Email','Phone','Location','LinkedIn'].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.people.map((person: Person, i: number) => (
                    <tr key={i} className="border-t border-[#b7cee2]/40 hover:bg-[#f3f7f8] transition-colors">
                      <td className="px-4 py-3">{person.first_name}</td>
                      <td className="px-4 py-3">{person.last_name}</td>
                      <td className="px-4 py-3">{person.title}</td>
                      <td className="px-4 py-3 font-medium">{person.company}</td>
                      <td className="px-4 py-3">{person.email ?? '—'}</td>
                      <td className="px-4 py-3">{person.phone ?? '—'}</td>
                      <td className="px-4 py-3">{person.location ?? '—'}</td>
                      <td className="px-4 py-3">
                        {person.linkedin_url
                          ? <a href={person.linkedin_url} target="_blank" rel="noreferrer" className="text-[#F5AB40] font-medium hover:underline">View ↗</a>
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        </div>
      </main>
    </div>
  )
}

export default App
