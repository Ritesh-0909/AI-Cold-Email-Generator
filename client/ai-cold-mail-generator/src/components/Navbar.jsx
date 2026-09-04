import {
    ArrowRightOnRectangleIcon,
    Bars3Icon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext.jsx';
import BrandMark from './BrandMark.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { dangerBtn, iconBtn } from '../utils/uiClasses.js';

const Navbar = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const displayName = user?.user?.username || 'there';

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex min-w-0 items-center gap-3">
                <button
                    type="button"
                    onClick={onMenuClick}
                    className={`${iconBtn} md:hidden`}
                    aria-label="Open navigation menu"
                >
                    <Bars3Icon className="h-5 w-5" />
                </button>
                <div className="md:hidden">
                    <BrandMark compact />
                </div>
                <div className="hidden min-w-0 md:block">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        Welcome back, {displayName}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        Generate personalized outreach in seconds
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
                <ThemeToggle />
                <button
                    type="button"
                    onClick={logout}
                    className={dangerBtn}
                    aria-label="Log out"
                >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
