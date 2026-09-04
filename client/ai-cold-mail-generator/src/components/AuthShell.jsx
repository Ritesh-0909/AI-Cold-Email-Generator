import { SparklesIcon } from '@heroicons/react/24/solid';
import BrandMark from './BrandMark.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const AuthShell = ({ title, subtitle, children, footer }) => {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-slate-50 dark:bg-slate-950">
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute -top-32 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/15" />
                <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/10" />
            </div>

            <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
                <BrandMark />
                <ThemeToggle />
            </header>

            <main className="relative z-10 mx-auto flex w-full max-w-md flex-col px-4 pb-16 sm:px-6">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                        <SparklesIcon className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/50 backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
                    {children}
                </div>

                {footer && (
                    <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                        {footer}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AuthShell;
