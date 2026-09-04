import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import AuthShell from '../components/AuthShell.jsx';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const emailValid = /^\S+@\S+\.\S+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailValid) {
            setError('Enter a valid email address.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await api.post('/auth/forgot-password', { email });

            toast.success('OTP sent to your email!');

            navigate('/reset-password', {
                state: { email }
            });

        } catch (err) {
            const message =
                typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.message ||
                      'Failed to send OTP';

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthShell
            title="Forgot password?"
            subtitle="Enter your email and we'll send you an OTP to reset your password."
            footer={
                <>
                    Remember your password?{' '}
                    <Link
                        to="/login"
                        className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                    >
                        Back to login
                    </Link>
                </>
            }
        >
            <form
                className="space-y-5"
                onSubmit={handleSubmit}
                noValidate
            >
                {error && (
                    <div
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-300"
                    >
                        {error}
                    </div>
                )}

                <div>
                    <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        placeholder="you@company.com"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!emailValid || loading}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? 'Sending OTP…' : 'Send OTP'}
                </button>
            </form>
        </AuthShell>
    );
};

export default ForgotPassword;