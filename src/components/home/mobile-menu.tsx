import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { createPortal } from "react-dom";
import useAuthStore from "../../store/authStore";
import { navLinks } from "../../utils/navlinks";
import Logo from "../logo";
import { ListIcon, XIcon, SignInIcon } from "@phosphor-icons/react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const visibleLinks = navLinks.filter((link) => !link.requiresAuth || isAuthenticated);



  return (
    <div className="md:hidden">
      {/* Mobile Menu Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center p-2.5 rounded-xl border border-brand-border/40 text-brand-text-muted hover:text-brand-primary hover:bg-slate-50 transition-all duration-300 cursor-pointer"
      >
        <ListIcon className="w-4 h-4" />
      </button>

      {/* Slide-out Drawer Overlay inside a React Portal to escape parent container bounds */}
      {typeof document !== "undefined" && createPortal(
        <div
          className={`fixed inset-0 z-999 flex transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"
            }`}
        >
          {/* Semi-transparent Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
              }`}
          />

          {/* Sliding Content Drawer */}
          <div
            className={`relative w-full max-w-xs bg-slate-950 border-r border-slate-900 text-white h-full shadow-2xl flex flex-col justify-between p-6 z-100 transform transition-transform duration-300 ease-out overflow-hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            {/* Background Mesh Glow for Drawer */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

            <div className="relative z-10 space-y-8">
              {/* Header inside Drawer */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-900">
                <Logo light={true} />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-brand-danger hover:bg-brand-danger/10 hover:border-brand-danger/20 transition-all duration-200 cursor-pointer"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-4">
                {visibleLinks.map((link) => (
                  <NavLink
                    key={link.link}
                    to={link.link}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-all duration-200 ${isActive
                        ? "bg-brand-primary/20 text-white border-l-4 border-brand-primary shadow-sm shadow-brand-primary/10"
                        : "text-slate-400 hover:bg-slate-900/60 hover:text-white"
                      }`
                    }
                  >
                    <link.Icon className="w-5 h-5 shrink-0" />
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Bottom Actions Area */}
            <div className="relative z-10 pt-6 border-t border-slate-900 space-y-4">
              {isAuthenticated && user ? (
                <div className="space-y-4">
                  {/* User Profile Summary */}
                  <div className="flex items-center gap-3 px-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.firstName + " " + user.lastName
                      )}&background=4f46e5&color=ffffff&bold=true`}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full border border-slate-800"
                    />
                    <div className="truncate">
                      <p className="text-sm font-bold text-white truncate">{user.firstName} {user.lastName}</p>
                      <p className="text-xs font-semibold text-slate-400 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-800 text-slate-200 font-bold hover:bg-slate-900 transition-all duration-200 cursor-pointer text-sm"
                  >
                    <SignInIcon className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/analyze"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/20 transition-all duration-200 cursor-pointer text-sm"
                  >
                    <span>Get Started</span>
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
