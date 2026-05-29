import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import useAuthStore from "../store/authStore";
import { getFetch } from "../utils/getFetch";
import { SignOutIcon, LayoutIcon, ChartBarIcon } from "@phosphor-icons/react";

export default function Avatar() {
  const { user, setUser, loading: userLoading } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (userLoading) {
    return (
      <div className="h-9 w-9 rounded-full bg-slate-200 border border-brand-border/30 animate-pulse" />
    );
  }

  if (!user) return null;

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.firstName + " " + user.lastName
  )}&background=4f46e5&color=ffffff&bold=true`;

  const handleLogout = async () => {
    try {
      await getFetch("/auth/logout", { method: "POST", private: true });
    } catch (err) {
      console.warn("Logout request failed:", err);
    } finally {
      setUser(null);
      setDropdownOpen(false);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Round trigger button */}
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center justify-center h-9 w-9 rounded-full border-2 border-white shadow-md hover:scale-105 active:scale-100 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        <img
          src={avatarUrl}
          alt={`${user.firstName} ${user.lastName}`}
          className="h-full w-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white border border-brand-border/60 rounded-2xl shadow-xl z-50 transition-all duration-200">
          {/* User Details Header */}
          <div className="px-4 py-2 border-b border-brand-border/40 text-left">
            <p className="text-sm font-bold text-brand-text truncate mt-0.5">{user.firstName} {user.lastName}</p>
            <p className="text-xs font-semibold text-brand-text-muted truncate">{user.email}</p>
          </div>

          {/* Navigation Links */}
          <div className="py-1">
            <Link
              to="/dashboard"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-brand-text-muted hover:bg-slate-50 hover:text-brand-primary transition-all duration-200"
            >
              <LayoutIcon className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/dashboard/reports"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-brand-text-muted hover:bg-slate-50 hover:text-brand-primary transition-all duration-200"
            >
              <ChartBarIcon className="w-4 h-4" />
              <span>View Reports</span>
            </Link>
          </div>

          <div className="border-t border-brand-border/40 my-1" />

          {/* Logout Action */}
          <div className="px-1 py-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-brand-danger hover:bg-brand-danger/10 active:bg-brand-danger/15 rounded-xl transition-all duration-200 cursor-pointer"
            >
              <SignOutIcon className="w-4 h-4 shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}