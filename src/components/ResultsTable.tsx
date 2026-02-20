import React from 'react';
import { type EnrichResponse, type Person } from '../api/leadEngine';

const COLUMNS = ['First Name', 'Last Name', 'Title', 'Company', 'Email', 'Phone', 'Location', 'LinkedIn'];

type ResultsTableProps = {
    results: EnrichResponse;
};

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => (
    <section className="w-full bg-white rounded-2xl shadow-sm border border-[#b7cee2] p-8">
        <h2 className="text-lg font-semibold text-[#051729] mb-1">Results</h2>
        <p className="text-sm text-[#051729]/60 mb-6">
            {results.people_found} contact(s) across {results.companies_processed} company(s)
        </p>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-[#b7cee2]/30 text-[#051729]">
                        {COLUMNS.map(h => (
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
                            <td className="px-4 py-3">
                                {person.phone
                                    ? <a href={`tel:${person.phone}`} className="text-[#F5AB40] font-medium hover:underline">{person.phone} ↗</a>
                                    : '—'}
                            </td>
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
);

export default ResultsTable;
