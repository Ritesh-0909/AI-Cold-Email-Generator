import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import AuthShell from '../components/AuthShell.jsx';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || '';

    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const passwordValid = newPassword.length >= 6;
    const passwordsMatch =
        newPassword === confirmPassword;

    const canSubmit =
        email &&
        /^\d{6}$/.test(otp) &&
        passwordValid &&
        passwordsMatch &&
        !loading;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!canSubmit) return;

        setLoading(true);
        setError('');

        try {
            await api.post('/auth/reset-password', {
                email,
                otp,
                newPassword
            });

            toast.success('Password reset successfully!');

            navigate('/login');

        } catch (err) {
            const message =
                typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.message ||
                      'Failed to reset password';

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (!email) {
        return (
            <AuthShell
                title="Reset password"
                subtitle="Please start the password reset process again."
                footer={
                    <Link
                        to="/forgot-password"
                        className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                    >
                        Go back
                    </Link>
                }
            >
                <div className="text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        No email was provided.
                    </p>
                </div>
            </AuthShell>
        );
    }

    return (
        <AuthShell
            title="Reset your password"
            subtitle={`Enter the OTP sent to ${email} and choose a new password.`}
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
                        htmlFor="otp"
                        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                        OTP
                    </label>

                    <input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={(e) =>
                            setOtp(
                                e.target.value
                                    .replace(/\D/g, '')
                                    .slice(0, 6)
                            )
                        }
                        className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        placeholder="Enter 6-digit OTP"
                    />
                </div>

                <div>
                    <label
                        htmlFor="newPassword"
                        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                        New Password
                    </label>

                    <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                        className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        placeholder="At least 6 characters"
                    />
                </div>

                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                        Confirm Password
                    </label>

                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        placeholder="Re-enter your password"
                    />
                </div>

                {!passwordsMatch &&
                    confirmPassword.length > 0 && (
                        <p className="text-xs text-red-600 dark:text-red-400">
                            Passwords do not match.
                        </p>
                    )}

                <button
                    type="submit"
                    disabled={!canSubmit}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? 'Resetting password…'
                        : 'Reset Password'}
                </button>
            </form>
        </AuthShell>
    );
};

export default ResetPassword;