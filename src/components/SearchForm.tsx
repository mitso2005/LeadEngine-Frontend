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
        <h2 className="text-lg font-semibold text-[#051729] mb-6">Search Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field placeholder="commbank.com.au,google.com" variable="Domains"     value={domains}     onChange={onDomainsChange}/>
            <Field placeholder="Head of Data, PMO"          variable="Titles"      value={titles}      onChange={onTitlesChange}/>
            <Field placeholder="10"                         variable="Max Results" value={maxResults}  onChange={onMaxResultsChange}/>
        </div>
        <div className="mt-8 flex justify-center">
            <button
                onClick={onSubmit}
                disabled={loading}
                className="bg-[#F5AB40] hover:bg-[#e09730] disabled:opacity-50 text-[#051729] font-bold px-7 py-3 rounded-xl shadow transition-colors duration-200 cursor-pointer text-base tracking-wide"
            >
                {loading ? 'Searching…' : 'Find Client Contacts'}
            </button>
        </div>
    </section>
);

export default SearchForm;
