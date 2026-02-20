import React from 'react';

type ErrorBannerProps = {
    message: string;
};

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => (
    <div className="w-full bg-red-50 border border-red-200 text-red-700 rounded-xl px-6 py-4">
        {message}
    </div>
);

export default ErrorBanner;
