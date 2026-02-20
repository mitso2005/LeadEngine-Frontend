// ─── Base URL ────────────────────────────────────────────────────────────────
// Change this to your deployed API URL when moving to production.
const BASE_URL = 'http://127.0.0.1:8000';

// ─── Request Parameters ───────────────────────────────────────────────────────
// Describes what the caller must provide to build the request.
export type EnrichParams = {
    domains: string;    // e.g. "google.com,commbank.com.au"
    titles: string;     // e.g. "Head of Data,PMO"
    maxResults: string; // e.g. "10"
};

// ─── Response ─────────────────────────────────────────────────────────────────
export type Person = {
    first_name:   string;
    last_name:    string;
    title:        string;
    company:      string;
    email:        string | null;
    phone:        string | null;
    linkedin_url: string | null;
    city:         string | null;
    state:        string | null;
    country:      string | null;
    location:     string | null;
};

export type EnrichResponse = {
    companies_processed: number;
    people_found:        number;
    people:              Person[];
};

// ─── URL Builder ──────────────────────────────────────────────────────────────
// Builds the full GET URL from the base URL and provided params.
// URLSearchParams handles encoding (spaces, commas, special chars).
//
// Example output:
//   http://127.0.0.1:8000/enrich/custom?domains=google.com&titles=Head+of+Data&max_results=10
//
export const buildEnrichURL = (params: EnrichParams): string => {
    const query = new URLSearchParams();

    if (params.domains)    query.append('domains',     params.domains);
    if (params.titles)     query.append('titles',      params.titles);
    if (params.maxResults) query.append('max_results', params.maxResults);

    return `${BASE_URL}/enrich/custom?${query.toString()}`;
};

// ─── API Call ─────────────────────────────────────────────────────────────────
// Fetches contacts from the LeadEngine API.
// Throws an Error if the response is not OK so the caller can handle it.
export const enrichContacts = async (params: EnrichParams): Promise<EnrichResponse> => {
    const url = buildEnrichURL(params);

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json', // required by the LeadEngine API
        },
    });

    if (!res.ok) {
        // ── Custom error messages per status code ──────────────────────────
        const errorMessages: Record<number, string> = {
            422: 'Invalid inputs — check that Domains, Titles and Max Results are filled in correctly.',
            400: 'Bad request — please check your search fields. If the problem persists, contact dimitri.petrakis@peoplebank.com.au or Digital Transformations for assistance.',
            401: 'Unauthorised — API credentials are missing or invalid. Please contact dimitri.petrakis@peoplebank.com.au or Digital Transformations for assistance.',
            403: 'Forbidden — you do not have access to this resource. Please contact dimitri.petrakis@peoplebank.com.au or Digital Transformations for assistance.',
            404: 'Not found — the API endpoint could not be reached. Please contact dimitri.petrakis@peoplebank.com.au or Digital Transformations for assistance.',
            500: 'Server error — the LeadEngine API is having issues, please contact dimitri.petrakis@peoplebank.com.au or Digital Transformations for assistance.',
        };
        const message = errorMessages[res.status] ?? `Unexpected error: ${res.status} ${res.statusText}`;
        throw new Error(message);
    }

    return res.json();
};
