import Logo from "../logo";
import { Link } from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 py-12 px-6 sm:px-12 overflow-hidden">
      <div className="cont flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">

        {/* Left: Logo & Brief Description */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo light={true} />
          <p className="text-xs text-slate-500 text-center md:text-left">
            Empowering developers with next-gen semantic match intelligence.
          </p>
        </div>

        {/* Right: Simple Navigation & Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-400">
          <Link to="/privacy" className="hover:text-white transition-colors duration-300">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors duration-300">
            Terms of Service
          </Link>
          <a href="mailto:mahmud.devs@gmail.com" className="hover:text-white transition-colors duration-300">
            Contact Support
          </a>
        </div>

      </div>

      {/* Copyright Divider & Text */}
      <div className="cont border-t border-slate-900/60 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-500">
        <span>© {currentYear} ResuRefactor AI. All rights reserved.</span>
        <span>Built for engineers aiming for top-tier technology roles.</span>
      </div>
    </footer>
  );
}
