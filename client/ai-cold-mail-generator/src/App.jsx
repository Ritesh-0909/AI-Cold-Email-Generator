import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup.jsx';
import VerifyOtp from './pages/VerifyOtp';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import LandingPage from './pages/LandingPage';
import { useAuth } from './context/AuthContext.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

function App() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                    <p className="text-sm font-medium">Loading workspace…</p>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <Toaster
                position="top-right"
                toastOptions={{
                    className:
                        '!rounded-xl !border !border-slate-200 !bg-white !text-slate-800 !shadow-lg dark:!border-slate-700 dark:!bg-slate-800 dark:!text-slate-100',
                }}
            />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
                <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />

                <Route element={user ? <Layout /> : <Navigate to="/login" />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/history" element={<History />} />
                </Route>

                <Route
                path="/forgot-password"
                element={<ForgotPassword />}
                />

                <Route          
                path="/reset-password"
                element={<ResetPassword />}
                />
            </Routes>
        </Router>
    );
}

export default App;
