'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { getFetch } from '../../utils/getFetch';
import useAuthStore, { type User } from '../../store/authStore';
import { Link, useLocation } from 'react-router';
import { LockIcon, EnvelopeSimpleIcon, WarningCircleIcon, CircleNotchIcon, EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import Logo from '../../components/logo';

interface LoginFormInputs {
  email: string;
  password?: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const setUser = useAuthStore((state) => state.setUser);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const handleEmailSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    setError(null);

    try {
      const res = await getFetch<{ data: { user: User } }>('/auth/login', {
        method: 'POST',
        private: true,
        body: { email: data.email, password: data.password },
      });

      setUser(res.data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setLoading(true);
    setError(null);

    try {
      const res = await getFetch<{ data: { user: User } }>('/auth/google-login', {
        method: 'POST',
        private: true,
        body: { idToken: credentialResponse.credential },
      });

      setUser(res.data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <section className="min-h-screen w-screen grid grid-cols-1 lg:grid-cols-12 antialiased overflow-hidden bg-slate-50">
      
      {/* LEFT SIDE PANEL - Premium Feature Showcase (Hidden on Mobile/Tablet) */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-slate-950 flex-col justify-between p-12 text-white overflow-hidden border-r border-slate-900">
        
        {/* Background glow meshes */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />
        
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />

        {/* Brand Header */}
        <div className="relative z-10">
          <Logo light={true} />
        </div>

        {/* Feature Highlights Mockup */}
        <div className="relative z-10 my-auto space-y-8">
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 uppercase tracking-wider">
                ✦ Workspace Login
              </span>
            </div>
            <h2 className="text-white!">
              <span className="text-white">Step into your </span>
              <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-black">professional</span>
              <span className="text-white"> future.</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Keep track of your resume scores, optimize for search algorithms, and stand out in recruitment pipelines with our AI tools.
            </p>
          </div>

          {/* Mini Interactive Metric Mockup */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4 max-w-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">ATS Score Predictor</span>
              <span className="text-xs font-extrabold text-brand-success bg-brand-success/15 px-2 py-0.5 rounded-md">Pass +85%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-[88%] bg-linear-to-r from-brand-primary to-brand-secondary rounded-full" />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Keyword Density: Optimized</span>
              <span className="font-semibold text-white">Score: 88/100</span>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <div className="relative z-10 text-xs text-slate-500">
          © {new Date().getFullYear()} ResuRefactor AI. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE PANEL - Spacious, comfortable Form Area */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-center py-8 px-4 bg-slate-50/50 relative overflow-y-auto">
        
        {/* Subtle Ambient Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md space-y-8 z-10">

          {/* Header */}
          <div className="space-y-2.5">
            <h1>
              Welcome back
            </h1>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              Access your workspace and insights using your account.
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-brand-danger/10 border border-brand-danger/20 p-4 text-sm text-brand-danger font-semibold flex items-center gap-3 animate-pulse-subtle">
              <WarningCircleIcon className="h-5 w-5 shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(handleEmailSubmit)}>
            {/* Email input field */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <EnvelopeSimpleIcon className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  placeholder="name@company.com"
                  disabled={loading}
                  className={`w-full rounded-xl border px-4 py-3 pl-10 text-sm text-slate-950 placeholder-slate-400 bg-white shadow-xs outline-none transition focus:ring-4 disabled:bg-slate-100 disabled:opacity-50 ${errors.email
                    ? 'border-brand-danger focus:border-brand-danger focus:ring-brand-danger/10'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-600/10'
                    }`}
                  {...register('email', {
                    required: 'Email Address is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address',
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-semibold text-brand-danger mt-1.5 flex items-center gap-1">
                  <WarningCircleIcon className="h-4 w-4 shrink-0" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password input field */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <LockIcon className="h-5 w-5" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  disabled={loading}
                  className={`w-full rounded-xl border px-4 pr-10 py-3 pl-10 text-sm text-slate-950 placeholder-slate-400 bg-white shadow-xs outline-none transition focus:ring-4 disabled:bg-slate-100 disabled:opacity-50 ${errors.password
                    ? 'border-brand-danger focus:border-brand-danger focus:ring-brand-danger/10'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-600/10'
                    }`}
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-semibold text-brand-danger mt-1.5 flex items-center gap-1">
                  <WarningCircleIcon className="h-4 w-4 shrink-0" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white shadow-md shadow-indigo-600/10 transition hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-indigo-600/15 disabled:bg-indigo-600/50 disabled:pointer-events-none cursor-pointer flex justify-center items-center gap-2 text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <CircleNotchIcon className="animate-spin h-5 w-5 text-white" />
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-50 px-4 font-bold text-slate-400 tracking-wider">
                  or continue with
                </span>
              </div>
            </div>

            {/* Google Login provider */}
            {googleClientId ? (
              <GoogleOAuthProvider clientId={googleClientId}>
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    text="signin_with"
                    shape="pill"
                    width="100%"
                  />
                </div>
              </GoogleOAuthProvider>
            ) : (
              <div className="text-center rounded-xl bg-amber-50 border border-amber-200/50 p-3 text-xs font-semibold text-amber-700">
                Configure VITE_GOOGLE_CLIENT_ID to activate Google login.
              </div>
            )}

            {/* Bottom redirection Link */}
            <div className="text-center text-sm font-semibold text-slate-500 pt-2">
              Don't have an account?{' '}
              <Link
                className="text-indigo-600 hover:text-indigo-700 transition underline decoration-2 underline-offset-4"
                to="/auth/register"
                state={location.state}
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}