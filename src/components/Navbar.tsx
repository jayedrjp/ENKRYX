import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, User, X } from "lucide-react";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Programs", to: "/programs" },
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "Contact", to: "/contact" },
];

const AUTH_LINKS = [
  { label: "Employee Login", to: "/employee/login" },
  { label: "Admin Login", to: "/admin/login" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  // Close dropdown when clicking outside of it.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-[#EDEFF1]"
      style={{ height: 80 }}
    >
      <div className="max-w-7xl mx-auto h-full px-6 lg:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center select-none">
          <img src="/enkryx-logo.png" alt="ENKRYX" className="h-9 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative text-sm font-medium pb-1 transition-colors hover:text-azure"
              style={{ color: isActive(link.to) ? "#006E87" : "#111111" }}
            >
              {link.label}
              {isActive(link.to) && (
                <span className="absolute left-0 -bottom-[2px] w-full h-[2px] rounded-full bg-azure" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <Link
            to="/contact"
            className="rounded-full px-5 py-2 text-sm font-medium border border-[#006E87] text-[#006E87] transition-colors duration-250 hover:bg-[#006E87] hover:text-white"
          >
            Get a Quote
          </Link>

          {/* Account dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-label="Account menu"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-1 text-[#52575C] hover:text-[#111111] transition-colors"
            >
              <User size={18} />
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-44 rounded-2xl bg-white border border-[#EDEFF1] shadow-[0_8px_24px_rgba(7,24,39,0.08)] py-1.5 z-50">
                {AUTH_LINKS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-[#111111] hover:bg-[#F5F7F9] hover:text-[#006E87] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white px-6 pb-6 flex flex-col gap-4 border-t border-[#EDEFF1]">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium"
              style={{ color: isActive(link.to) ? "#006E87" : "#111111" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="rounded-full px-5 py-2.5 text-sm font-medium border border-[#006E87] text-[#006E87] text-center"
            onClick={() => setOpen(false)}
          >
            Get a Quote
          </Link>
          {/* Mobile auth links */}
          <div className="border-t border-[#EDEFF1] pt-3 flex flex-col gap-3">
            {AUTH_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-[#52575C] hover:text-[#006E87] transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
