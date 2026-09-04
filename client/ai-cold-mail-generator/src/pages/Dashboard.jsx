import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
    ChatBubbleLeftRightIcon,
    CheckIcon,
    ClipboardDocumentIcon,
    EnvelopeIcon,
    ExclamationTriangleIcon,
    PaperAirplaneIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import api from '../utils/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const ResultCard = ({ title, content, type, icon: Icon, copied, onCopy }) => (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                    <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
            </div>
            <button
                type="button"
                onClick={() => onCopy(content, type)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:text-indigo-300"
                aria-label={`Copy ${title}`}
            >
                {copied === type ? (
                    <>
                        <CheckIcon className="h-4 w-4 text-emerald-500" />
                        Copied
                    </>
                ) : (
                    <>
                        <ClipboardDocumentIcon className="h-4 w-4" />
                        Copy
                    </>
                )}
            </button>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-300">{content}</p>
    </article>
);

const Dashboard = () => {
    const { user } = useAuth();
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState('');
    const [error, setError] = useState('');

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        setError('');
        try {
            const { data } = await api.post('/ai/generate-email', { prompt });
            setResult(data);
            toast.success('Successfully generated!');
        } catch (err) {
            const message =
                err.response?.data?.message || 'Failed to generate. Please try again.';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(''), 2000);
    };

    const greeting = user?.user?.username || user?.username || 'there';

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            <header>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">AI workspace</p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                    Create your next outreach
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Describe the prospect or role. We will generate a subject, cold email, LinkedIn DM, and follow-up you can copy and send.
                </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-5">
                <section id="generator" className="lg:col-span-2">
                    <form
                        onSubmit={handleGenerate}
                        className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                    >
                        <div className="mb-4 flex items-center gap-2">
                            <SparklesIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Generate outreach</h2>
                        </div>
                        <label htmlFor="prompt" className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            Prospect context
                        </label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            maxLength={2000}
                            disabled={loading}
                            className="min-h-48 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm leading-6 text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            placeholder="e.g. Backend engineer reaching out to a recruiter at a product company hiring for SDE roles..."
                        />
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                            {prompt.length}/2000 · Include role, company type, and what you want to highlight.
                        </p>
                        <button
                            type="submit"
                            disabled={loading || !prompt.trim()}
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Generating…
                                </>
                            ) : (
                                <>
                                    <PaperAirplaneIcon className="h-4 w-4" />
                                    Generate
                                </>
                            )}
                        </button>
                    </form>
                </section>

                <section className="lg:col-span-3">
                    {loading && (
                        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-indigo-200 bg-white px-6 text-center dark:border-indigo-500/30 dark:bg-slate-900">
                            <span className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                            <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-200">Writing your outreach pack…</p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">This usually takes a few seconds.</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div
                            role="alert"
                            className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-red-200 bg-white px-6 text-center dark:border-red-500/30 dark:bg-slate-900"
                        >
                            <ExclamationTriangleIcon className="h-10 w-10 text-red-500" />
                            <p className="mt-3 text-sm font-medium text-slate-800 dark:text-slate-100">Generation failed</p>
                            <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{error}</p>
                        </div>
                    )}

                    {!loading && !error && result && (
                        <div className="space-y-4">
                            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Generated content</h2>
                            <ResultCard
                                title="Email Subject"
                                content={result.subject}
                                type="subject"
                                icon={SparklesIcon}
                                copied={copied}
                                onCopy={copyToClipboard}
                            />
                            <ResultCard
                                title="Cold Email Body"
                                content={result.emailBody}
                                type="email"
                                icon={EnvelopeIcon}
                                copied={copied}
                                onCopy={copyToClipboard}
                            />
                            <ResultCard
                                title="LinkedIn DM"
                                content={result.linkedInDM}
                                type="linkedin"
                                icon={ChatBubbleLeftRightIcon}
                                copied={copied}
                                onCopy={copyToClipboard}
                            />
                            <ResultCard
                                title="Follow-up Email"
                                content={result.followUpEmail}
                                type="followup"
                                icon={PaperAirplaneIcon}
                                copied={copied}
                                onCopy={copyToClipboard}
                            />
                        </div>
                    )}

                    {!loading && !error && !result && (
                        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 text-center dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800">
                                <EnvelopeIcon className="h-7 w-7 text-slate-400" />
                            </div>
                            <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-100">No outreach generated yet</p>
                            <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                                Add prospect context on the left and generate to see a subject, email, LinkedIn DM, and follow-up here.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
