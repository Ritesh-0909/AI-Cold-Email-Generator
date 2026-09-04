import { Link } from 'react-router-dom';
import {
    ArrowRightIcon,
    BoltIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    ClockIcon,
    EnvelopeIcon,
    SparklesIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext.jsx';
import BrandMark from '../components/BrandMark.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { ghostBtn, primaryBtn, secondaryBtn, cardHover } from '../utils/uiClasses.js';

const features = [
    {
        name: 'AI-powered cold emails',
        description: 'Generate personalized first-touch emails from a short prospect description — not generic templates.',
        icon: EnvelopeIcon,
    },
    {
        name: 'LinkedIn DM generation',
        description: 'Get a concise, conversational LinkedIn message that matches the same outreach angle.',
        icon: ChatBubbleLeftRightIcon,
    },
    {
        name: 'Follow-up sequences',
        description: 'Receive a professional follow-up email so you can stay persistent without starting from scratch.',
        icon: ClockIcon,
    },
    {
        name: 'Faster outreach',
        description: 'Go from context to a full outreach pack in seconds, so you spend time sending — not drafting.',
        icon: BoltIcon,
    },
    {
        name: 'Better personalization',
        description: 'The generator uses your prompt to tailor subject, body, and social copy to the prospect.',
        icon: SparklesIcon,
    },
    {
        name: 'Built for real workflows',
        description: 'Copy any result in one click and keep a history of generated campaigns in your workspace.',
        icon: UserGroupIcon,
    },
];

const steps = [
    {
        step: '01',
        title: 'Describe your prospect',
        description: 'Share the role, company, and offer. A few sentences is enough for the model to work with.',
    },
    {
        step: '02',
        title: 'Generate personalized outreach',
        description: 'MailGen AI returns a subject line, cold email, LinkedIn DM, and follow-up in one pass.',
    },
    {
        step: '03',
        title: 'Copy and send',
        description: 'Copy the version you need, personalize a line if you want, and send from your own inbox.',
    },
];

const benefits = [
    'One prompt, four ready-to-send assets',
    'Consistent tone across email and LinkedIn',
    'History of past generations in your account',
    'Secure sign-in with email verification',
];

const LandingPage = () => {
    const { user } = useAuth();
    const primaryTo = user ? '/dashboard' : '/signup';

    return (
        <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <BrandMark />
                    <div className="flex items-center gap-2 sm:gap-3">
                        <ThemeToggle />
                        {user ? (
                            <Link
                                to="/dashboard"
                                className={`${primaryBtn} px-4 py-2`}
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`${ghostBtn} hidden sm:inline-flex`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className={`${primaryBtn} px-4 py-2`}
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-24">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute left-1/2 top-0 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/10" />
                    <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/10" />
                </div>

                <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
                    <div>
                        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
                            <SparklesIcon className="h-4 w-4" />
                            AI outreach workspace
                        </p>
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-tight dark:text-white">
                            Write cold emails that sound human — and get replies
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
                            Describe a prospect once. MailGen AI generates a personalized cold email, LinkedIn DM, and follow-up so you can outreach faster without sounding templated.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to={primaryTo}
                                className={`group ${primaryBtn} px-6 py-3 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40`}
                            >
                                {user ? 'Open workspace' : 'Start generating free'}
                                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </Link>
                            <a
                                href="#how-it-works"
                                className={`${secondaryBtn} px-6 py-3`}
                            >
                                See how it works
                            </a>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Campaign preview</p>
                                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                                    Ready to copy
                                </span>
                            </div>
                            <div className="space-y-3">
                                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/60">
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Subject</p>
                                    <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">Backend engineer improving API reliability</p>
                                </div>
                                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/60">
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Cold email</p>
                                    <p className="mt-1 line-clamp-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                        Noticed you are hiring for engineering roles where systems need to stay fast under load. I have shipped production APIs and would value a short conversation about how I can help the team.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/60">
                                        <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-300">LinkedIn DM</p>
                                        <p className="mt-1 line-clamp-3 text-xs leading-5 text-slate-600 dark:text-slate-300">Short, conversational opener tailored to the same prospect.</p>
                                    </div>
                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/60">
                                        <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-300">Follow-up</p>
                                        <p className="mt-1 line-clamp-3 text-xs leading-5 text-slate-600 dark:text-slate-300">A second-touch email with a new angle and a clear CTA.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-900/40">
                <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 text-center sm:grid-cols-4 sm:px-6 lg:px-8">
                    {[
                        ['4 assets', 'per generation'],
                        ['Seconds', 'not hours of drafting'],
                        ['History', 'saved to your account'],
                        ['Secure', 'OTP-verified access'],
                    ].map(([stat, label]) => (
                        <div key={stat}>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">{stat}</p>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Everything you need to outreach with confidence</h2>
                        <p className="mt-3 text-slate-600 dark:text-slate-400">A focused toolkit for personalized cold email, LinkedIn, and follow-ups.</p>
                    </div>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div
                                key={feature.name}
                                className={`group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${cardHover}`}
                            >
                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-200 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300 dark:group-hover:bg-indigo-500 dark:group-hover:text-white">
                                    <feature.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.name}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="border-y border-slate-200 bg-white px-4 py-20 dark:border-slate-800 dark:bg-slate-900/40 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">How it works</h2>
                        <p className="mt-3 text-slate-600 dark:text-slate-400">Three steps from prospect context to copy you can send today.</p>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {steps.map((item) => (
                            <div key={item.step} className={`rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900 ${cardHover}`}>
                                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-300">{item.step}</p>
                                <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Outreach that stays professional</h2>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">
                            MailGen AI is built for candidates and operators who need high-quality copy quickly — without sacrificing a personal, trustworthy tone.
                        </p>
                    </div>
                    <ul className="space-y-3">
                        {benefits.map((benefit) => (
                            <li
                                key={benefit}
                                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                            >
                                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="px-4 pb-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 px-6 py-14 text-center shadow-xl sm:px-12">
                    <h2 className="text-3xl font-bold text-white">Ready to generate your next outreach pack?</h2>
                    <p className="mx-auto mt-3 max-w-xl text-indigo-100">
                        Create an account, verify your email, and start generating personalized cold emails in your workspace.
                    </p>
                    <Link
                        to={primaryTo}
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
                    >
                        {user ? 'Go to dashboard' : 'Create your free account'}
                        <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
                    <BrandMark />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        © {new Date().getFullYear()} MailGen AI. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-300">Login</Link>
                        <Link to="/signup" className="hover:text-indigo-600 dark:hover:text-indigo-300">Signup</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
