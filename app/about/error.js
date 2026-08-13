'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-gray-900">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
          Something went wrong!
        </h1>

        {/* Description */}
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          We&apos;re sorry, but something unexpected happened.
          Please try again.
        </p>

        {/* Error message - development only */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-left dark:bg-red-950">
            <p className="mb-1 text-sm font-semibold text-red-800 dark:text-red-200">
              Error:
            </p>

            <p className="break-words text-sm text-red-700 dark:text-red-300">
              {error?.message || 'Unknown error'}
            </p>
          </div>
        )}

        {/* Try Again */}
        <button
          onClick={() => reset()}
          className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try Again
        </button>

        {/* Go Home */}
        <button
          onClick={() => {
            window.location.href = '/';
          }}
          className="mt-3 w-full rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}