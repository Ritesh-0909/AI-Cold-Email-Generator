import { NavLink, useLocation } from 'react-router-dom';
import {
    ClockIcon,
    HomeIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext.jsx';
import BrandMark from './BrandMark.jsx';

const links = [
    { to: '/dashboard', label: 'Dashboard', icon: HomeIcon, hash: '' },
    { to: '/history', label: 'History', icon: ClockIcon, hash: null },
];

const Sidebar = ({ open, onClose }) => {
    
    const location = useLocation();

    const isLinkActive = (link) => {
        if (link.to.startsWith('/history')) return location.pathname === '/history';
        if (link.hash === '#generator') {
            return location.pathname === '/dashboard' && location.hash === '#generator';
        }
        return location.pathname === '/dashboard' && location.hash !== '#generator';
    };

    const navClass = (active) =>
        `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
            active
                ? 'bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-500/10 ring-1 ring-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-300 dark:shadow-black/20 dark:ring-indigo-500/20'
                : 'text-slate-600 hover:-translate-y-px hover:bg-slate-100 hover:shadow-sm hover:shadow-slate-200/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:shadow-black/30'
        }`;

    const content = (
        <>
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
                <BrandMark to="/dashboard" />
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-800 hover:shadow-sm active:scale-95 md:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    aria-label="Close navigation menu"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-5" aria-label="Main">
                {links.map((link) => (
                    <NavLink
                        key={link.label}
                        to={link.to}
                        onClick={onClose}
                        className={navClass(isLinkActive(link))}
                    >
                        <link.icon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </>
    );

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900 md:static md:z-0 md:w-64 md:translate-x-0 ${
                    open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
                {content}
            </aside>
        </>
    );
};

export default Sidebar;
