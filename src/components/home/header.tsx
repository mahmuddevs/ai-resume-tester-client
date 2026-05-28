import { Link } from "react-router";
import useAuthStore from "../../store/authStore";
import Logo from "../logo";
import Navbar from "./navbar";
import Avatar from "../avatar";
import MobileMenu from "./mobile-menu";
import { ArrowRightIcon } from "@phosphor-icons/react";

export default function Header() {
  const { isAuthenticated, loading } = useAuthStore();

  return (
    <header className="sticky top-0 w-full bg-white/75 backdrop-blur-lg border-b border-brand-border/40 z-100 transition-all duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">

        {/* Left Side - Logo */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Center - Navigation links (Hidden on mobile/tablet) */}
        <div className="hidden md:flex items-center justify-center">
          <Navbar />
        </div>

        {/* Right Side - Actions or Avatar */}
        <div className="flex items-center gap-4 sm:gap-6">
          {loading ? (
            <div className="flex items-center gap-4">
              {/* Secondary link skeleton */}
              <div className="h-4 w-12 rounded-lg bg-slate-200 border border-brand-border/10 animate-pulse hidden sm:block" />
              {/* Primary button skeleton */}
              <div className="h-9.5 w-28 rounded-xl bg-slate-200 border border-brand-border/10 animate-pulse" />
            </div>
          ) : isAuthenticated ? (
            <Avatar />
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              {/* Sign In Link */}
              <Link
                to="/auth/login"
                className="text-sm font-extrabold text-brand-text-muted hover:text-brand-primary transition-colors duration-300 cursor-pointer"
              >
                Sign In
              </Link>

              {/* Highlighted CTA Button */}
              <Link
                to="/analyze"
                className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-brand-primary text-white text-sm font-extrabold rounded-xl shadow-md shadow-brand-primary/15 hover:bg-brand-primary-hover hover:shadow-lg hover:shadow-brand-primary/20 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-300 transform cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Sliding Side-menu Drawer */}
          <MobileMenu />
        </div>

      </div>
    </header>
  );
}