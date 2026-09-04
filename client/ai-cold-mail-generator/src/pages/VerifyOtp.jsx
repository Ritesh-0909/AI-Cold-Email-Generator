import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext.jsx';
import AuthShell from '../components/AuthShell.jsx';

const OTP_LENGTH = 6;

const VerifyOtp = () => {
    const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [resending, setResending] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const [calling, setCalling] = useState(false);
    const [callCooldown, setCallCooldown] = useState(0);

    const inputsRef = useRef([]);

    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    const email = location.state?.email;
    const otp = digits.join('');

    // Redirect if email is missing
    useEffect(() => {
        if (!email) {
            navigate('/signup');
        }
    }, [email, navigate]);

    // Resend OTP cooldown
    useEffect(() => {
        if (cooldown <= 0) return;

        const timer = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [cooldown]);

    // Voice call cooldown
    useEffect(() => {
        if (callCooldown <= 0) return;

        const timer = setInterval(() => {
            setCallCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [callCooldown]);

    const handleChange = (index, value) => {
        const nextChar = value.replace(/\D/g, '').slice(-1);

        const next = [...digits];
        next[index] = nextChar;

        setDigits(next);
        setError('');

        if (nextChar && index < OTP_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData('text')
            .replace(/\D/g, '')
            .slice(0, OTP_LENGTH);

        if (!pasted) return;

        const next = Array(OTP_LENGTH).fill('');

        pasted.split('').forEach((char, i) => {
            next[i] = char;
        });

        setDigits(next);

        inputsRef.current[
            Math.min(pasted.length, OTP_LENGTH - 1)
        ]?.focus();
    };

    // Resend OTP via Email
    const handleResendOTP = async () => {
        if (resending || cooldown > 0) return;

        setResending(true);
        setError('');

        try {
            const { data } = await api.post('/auth/resend-otp', {
                email
            });

            setDigits(Array(OTP_LENGTH).fill(''));
            inputsRef.current[0]?.focus();

            toast.success(
                data.message || 'New OTP sent successfully!'
            );

            setCooldown(60);

        } catch (err) {
            const message =
                typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.message ||
                      'Failed to resend OTP';

            setError(message);
            toast.error(message);

        } finally {
            setResending(false);
        }
    };

    // Verify OTP
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (otp.length !== OTP_LENGTH) return;

        setLoading(true);
        setError('');

        try {
            const { data } = await api.post('/auth/verify-otp', {
                email,
                otp,
            });

            login({ ...data, email });

            setSuccess(true);

            toast.success('Email verified successfully!');

            navigate('/dashboard');

        } catch (err) {
            const message =
                typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.message ||
                      'Verification failed';

            setError(message);
            toast.error(message);

        } finally {
            setLoading(false);
        }
    };

    // Get OTP via Voice Call
    const handleVoiceOTP = async () => {
        if (calling || callCooldown > 0) return;

        setCalling(true);
        setError('');

        try {
            const { data } = await api.post('/auth/voice-otp', {
                email
            });

            setDigits(Array(OTP_LENGTH).fill(''));
            inputsRef.current[0]?.focus();

            toast.success(
                data.message || 'OTP sent via voice call!'
            );

            setCallCooldown(60);

        } catch (err) {
            const message =
                typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.message ||
                      'Failed to make voice call';

            setError(message);
            toast.error(message);

        } finally {
            setCalling(false);
        }
    };

    if (!email) return null;

    return (
        <AuthShell
            title="Verify your email"
            subtitle={
                <>
                    Enter the 6-digit code we sent to{' '}
                    <span className="font-semibold text-slate-900 dark:text-white">
                        {email}
                    </span>
                </>
            }
        >
            <form
                className="space-y-6"
                onSubmit={handleSubmit}
            >
                {/* Error */}
                {error && (
                    <div
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-300"
                    >
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300">
                        <CheckCircleIcon className="h-5 w-5" />
                        Email verified. Opening your workspace…
                    </div>
                )}

                {/* OTP Inputs */}
                <fieldset>
                    <legend className="sr-only">
                        6-digit verification code
                    </legend>

                    <div className="flex justify-between gap-2">
                        {digits.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputsRef.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                autoComplete={
                                    index === 0
                                        ? 'one-time-code'
                                        : 'off'
                                }
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        e.target.value
                                    )
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(index, e)
                                }
                                onPaste={handlePaste}
                                aria-label={`Digit ${index + 1}`}
                                className="h-12 w-10 rounded-xl border border-slate-200 bg-white text-center text-lg font-semibold text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:h-14 sm:w-12 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        ))}
                    </div>
                </fieldset>

                {/* Verify Button */}
                <button
                    type="submit"
                    disabled={
                        loading ||
                        otp.length !== OTP_LENGTH ||
                        success
                    }
                    className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? 'Verifying…'
                        : success
                            ? 'Verified'
                            : 'Verify email'}
                </button>

                {/* Resend / Call */}
                <div className="space-y-3 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Didn't receive the code?
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row">

                        {/* Resend OTP */}
                        <button
                            type="button"
                            onClick={handleResendOTP}
                            disabled={
                                resending ||
                                cooldown > 0 ||
                                success
                            }
                            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-300"
                        >
                            {resending
                                ? 'Sending…'
                                : cooldown > 0
                                    ? `Resend OTP in ${cooldown}s`
                                    : 'Resend OTP'}
                        </button>

                        {/* Voice OTP */}
                        <button
                            type="button"
                            onClick={handleVoiceOTP}
                            disabled={
                                calling ||
                                callCooldown > 0 ||
                                success
                            }
                            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-300"
                        >
                            {calling
                                ? 'Calling…'
                                : callCooldown > 0
                                    ? `Call again in ${callCooldown}s`
                                    : 'Get OTP via Call'}
                        </button>

                    </div>
                </div>
            </form>
        </AuthShell>
    );
};

export default VerifyOtp;