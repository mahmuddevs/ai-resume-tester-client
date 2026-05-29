import { NavLink } from "react-router";
import useAuthStore from "../../store/authStore";
import { navLinks } from "../../utils/navlinks";

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();

  // Filter links dynamically based on user session status
  const visibleLinks = navLinks.filter((navLink) => !navLink.requiresAuth || isAuthenticated);

  return (
    <nav className="flex items-center gap-8">
      {visibleLinks.map((navLink) => (
        <NavLink
          key={navLink.link}
          to={navLink.link}
          className={({ isActive }) =>
            `text-sm font-bold tracking-tight transition-all duration-300 ${isActive
              ? "text-brand-primary font-extrabold"
              : "text-brand-text-muted hover:text-brand-primary"
            }`
          }
        >
          {navLink.label}
        </NavLink>
      ))}
    </nav>
  );
}
