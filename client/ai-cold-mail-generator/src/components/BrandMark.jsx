import { Link } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/solid';

const BrandMark = ({ to = '/', compact = false, className = '' }) => {
    return (
        <Link
            to={to}
            className={`group inline-flex items-center gap-2.5 rounded-xl outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 ${className}`}
        >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-indigo-500/40 group-active:translate-y-0">
                <SparklesIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            </span>
            {!compact && (
                <span className="text-lg font-bold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-300">
                    MailGen<span className="text-indigo-600 dark:text-indigo-400">AI</span>
                </span>
            )}
        </Link>
    );
};

export default BrandMark;
