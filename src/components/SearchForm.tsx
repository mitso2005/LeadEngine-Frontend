import React from 'react';
import Field from './field';

type SearchFormProps = {
    domains: string;
    titles: string;
    maxResults: string;
    loading: boolean;
    onDomainsChange: (v: string) => void;
    onTitlesChange: (v: string) => void;
    onMaxResultsChange: (v: string) => void;
    onSubmit: () => void;
};

const SearchForm: React.FC<SearchFormProps> = ({
    domains,
    titles,
    maxResults,
    loading,
    onDomainsChange,
    onTitlesChange,
    onMaxResultsChange,
    onSubmit,
}) => (
    <section className="w-full bg-white rounded-2xl shadow-sm border border-[#b7cee2] p-8">
        <h2 className="text-lg font-semibold text-[#051729] mb-1">Search For Leads!</h2>
        <p className="text-sm italic text-[#051729]/50 mb-6">
            Enter one or more company domains and job titles (comma-separated) to find matching contacts.
            Results include name, title, company, email, phone, location, and a LinkedIn profile link.
        </p>

        {/* Fields + button on the same row, button pinned to the right */}
        <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field placeholder="commbank.com.au,google.com" variable="Domains"     value={domains}     onChange={onDomainsChange}/>
                <Field placeholder="Head of Data, PMO"          variable="Titles"      value={titles}      onChange={onTitlesChange}/>
                <Field placeholder="10"                         variable="Max Results" value={maxResults}  onChange={onMaxResultsChange}/>
            </div>
            <button
                onClick={onSubmit}
                disabled={loading}
                className="flex items-center gap-2 bg-[#F5AB40] hover:bg-[#e09730] disabled:opacity-50 text-[#051729] font-bold px-6 py-2.5 rounded-xl shadow transition-colors duration-200 cursor-pointer text-sm tracking-wide whitespace-nowrap"
            >
                {/* Magnifying glass icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <circle cx="11" cy="11" r="7" />
                    <line x1="16.5" y1="16.5" x2="22" y2="22" />
                </svg>
                {loading ? 'Searching…' : 'Find Client Contacts'}
            </button>
        </div>
    </section>
);

export default SearchForm;
