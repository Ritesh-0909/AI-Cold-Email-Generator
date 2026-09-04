import React, { useEffect, useState } from 'react';
import {
    ClockIcon,
    EnvelopeIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import api from '../utils/api';

const formatDate = (value) => {
    if (!value) return 'Unknown date';
    return new Date(value).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};

const History = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        let active = true;

        const loadHistory = async () => {
            setLoading(true);
            setError('');
            try {
                const { data } = await api.get('/ai/history');
                if (active) setItems(Array.isArray(data) ? data : []);
            } catch (err) {
                const message =
                    typeof err.response?.data === 'string'
                        ? err.response.data
                        : err.response?.data?.message || 'Failed to load history.';
                if (active) setError(message);
            } finally {
                if (active) setLoading(false);
            }
        };

        loadHistory();
        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="mx-auto max-w-5xl">
            <header className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">History</h1>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Previous generations saved to your account.
                </p>
            </header>

            {loading && (
                <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Loading history…</p>
                </div>
            )}

            {!loading && error && (
                <div
                    role="alert"
                    className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-red-200 bg-white px-6 text-center dark:border-red-500/30 dark:bg-slate-900"
                >
                    <ExclamationTriangleIcon className="h-10 w-10 text-red-500" />
                    <p className="mt-3 text-sm font-medium text-slate-800 dark:text-slate-100">Could not load history</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{error}</p>
                </div>
            )}

            {!loading && !error && items.length === 0 && (
                <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 text-center dark:border-slate-800 dark:bg-slate-900">
                    <ClockIcon className="h-10 w-10 text-slate-400" />
                    <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-100">No generations yet</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Generated emails will appear here after you create your first outreach pack.
                    </p>
                </div>
            )}

            {!loading && !error && items.length > 0 && (
                <div className="space-y-4">
                    {items.map((item) => {
                        const isOpen = expanded === item._id;
                        return (
                            <article
                                key={item._id}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                            <ClockIcon className="h-4 w-4" />
                                            {formatDate(item.createdAt)}
                                        </div>
                                        <h2 className="mt-2 truncate text-base font-semibold text-slate-900 dark:text-white">
                                            {item.subject}
                                        </h2>
                                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            {item.emailBody}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setExpanded(isOpen ? null : item._id)}
                                        className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300"
                                        aria-expanded={isOpen}
                                    >
                                        {isOpen ? 'Hide details' : 'View details'}
                                    </button>
                                </div>

                                {isOpen && (
                                    <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Prompt</p>
                                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{item.prompt}</p>
                                        </div>
                                        <div>
                                            <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                <EnvelopeIcon className="h-4 w-4" />
                                                Email
                                            </p>
                                            <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-300">
                                                {item.emailBody}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">LinkedIn DM</p>
                                            <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-300">
                                                {item.linkedInDM}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Follow-up</p>
                                            <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-300">
                                                {item.followUpEmail}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default History;
