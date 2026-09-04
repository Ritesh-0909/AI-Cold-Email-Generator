export const primaryBtn =
    'inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] active:shadow-sm disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none dark:shadow-indigo-900/40 dark:hover:shadow-indigo-400/20 dark:focus-visible:ring-offset-slate-950';

export const secondaryBtn =
    'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-200 dark:hover:shadow-lg dark:hover:shadow-black/30 dark:focus-visible:ring-offset-slate-950';

export const ghostBtn =
    'inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white';

export const iconBtn =
    'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:translate-y-0 active:scale-[0.96] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300 dark:hover:shadow-lg dark:hover:shadow-black/40';

export const dangerBtn =
    'inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 active:translate-y-0 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-red-500/30 dark:hover:bg-red-950/40 dark:hover:text-red-400 dark:hover:shadow-lg dark:hover:shadow-black/40';

export const inputClass = (invalid = false) =>
    `block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition-all duration-200 hover:border-slate-300 focus:outline-none focus:ring-2 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-600 ${
        invalid
            ? 'border-red-400 focus:border-red-500 focus:ring-red-400 dark:border-red-500'
            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-700'
    }`;

export const cardHover =
    'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/80 dark:hover:shadow-lg dark:hover:shadow-black/40';
