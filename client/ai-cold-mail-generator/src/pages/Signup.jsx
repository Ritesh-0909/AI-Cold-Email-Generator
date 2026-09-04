import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import api from '../utils/api';
import AuthShell from '../components/AuthShell.jsx';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [touched, setTouched] = useState({});
    const navigate = useNavigate();

    const usernameValid = username.trim().length >= 3 && username.trim().length <= 30;
    const emailValid = /^\S+@\S+\.\S+$/.test(email);
    const passwordValid = password.length >= 6;
    const phoneValid = /^\+[1-9]\d{9,14}$/.test(phone);
    const canSubmit = usernameValid && emailValid && passwordValid && phoneValid && !loading;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ username: true, email: true, password: true });
        if (!canSubmit) return;

        setLoading(true);
        setError('');
        try {
            const { data } = await api.post('/auth/register', { username, email, password, phone });
            toast.success(data.message);
            navigate('/verify-otp', { state: { email } });
        } catch (err) {
            const message =
                typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.message || 'Registration failed';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (invalid) =>
        `block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:outline-none focus:ring-2 dark:bg-slate-950 dark:text-slate-100 ${
            invalid
                ? 'border-red-400 focus:ring-red-400 dark:border-red-500'
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-700'
        }`;

    return (
        <AuthShell
            title="Create your account"
            subtitle="Start generating personalized cold emails, LinkedIn DMs, and follow-ups."
            footer={
                <>
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                        Sign in
                    </Link>
                </>
            }
        >
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                {error && (
                    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-300">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={username}
                        onBlur={() => setTouched((t) => ({ ...t, username: true }))}
                        onChange={(e) => setUsername(e.target.value)}
                        className={inputClass(touched.username && !usernameValid)}
                        placeholder="janedoe"
                    />
                    {touched.username && !usernameValid && (
                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">Username must be 3–30 characters.</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass(touched.email && !emailValid)}
                        placeholder="you@company.com"
                    />
                    {touched.email && !emailValid && (
                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">Enter a valid email address.</p>
                    )}
                </div>

                <div>
                <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                Phone Number
                </label>

                <input  
                id="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass(touched.phone && !phoneValid)}
                placeholder="+919876543210"
                />

                {touched.phone && !phoneValid && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    Enter a valid phone number with country code.
                </p>
                    )}
                </div>
                <div>
                    <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            required
                            value={password}
                            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${inputClass(touched.password && !passwordValid)} pr-11`}
                            placeholder="At least 6 characters"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                    {touched.password && !passwordValid && (
                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">Password must be at least 6 characters.</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!canSubmit}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? 'Creating account…' : 'Create account'}
                </button>
            </form>
        </AuthShell>
    );
};

export default Signup;
