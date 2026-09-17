import { Link } from "react-router-dom";

const COLUMNS = [
  {
    title: "COMPANY",
    items: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Portfolio", to: "/portfolio" },
      { label: "Our Team", to: "/team" },
    ],
  },
  {
    title: "WHAT WE DO",
    items: [
      { label: "Web Development", to: "/services" },
      { label: "Software Systems", to: "/services" },
      { label: "UI/UX Design", to: "/services" },
      { label: "Programs", to: "/programs" },
    ],
  },
];

function Logo() {
  return (
    <div className="select-none">
      <img
        src="/enkryx-logo.png"
        alt="ENKRYX"
        className="h-10 w-auto object-contain object-left"
      />
    </div>
  );
}

function MailIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-canvas border-t border-border pt-12 pb-6"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 pb-10">
          {/* Brand */}
          <div>
            <Logo />

            <p className="mt-5 max-w-[220px] text-xs leading-5 text-muted">
              We design and build simple, reliable software that keeps your
              business moving. Your idea deserves a proper system.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.linkedin.com/company/enkryx/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-grid flex items-center justify-center text-muted transition-colors duration-200 hover:bg-azure hover:text-white"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/enkryx/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-grid flex items-center justify-center text-muted transition-colors duration-200 hover:bg-azure hover:text-white"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/people/Enkryx/61587497224691/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-grid flex items-center justify-center text-muted transition-colors duration-200 hover:bg-azure hover:text-white"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-bold tracking-wide text-heading">
                {col.title}
              </h4>

              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-xs text-muted transition-colors duration-200 hover:text-azure"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold tracking-wide text-heading">
              GET IN TOUCH
            </h4>

            <ul className="mt-5 space-y-4 text-xs text-muted">
              <li className="flex items-center gap-2.5">
                <span className="text-azure">
                  <MailIcon />
                </span>
                <a
                  href="mailto:info@enkryx.com"
                  className="hover:text-azure transition-colors"
                >
                  info@enkryx.com
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <span className="text-azure">
                  <PhoneIcon />
                </span>
                <a
                  href="tel:+880140019228"
                  className="hover:text-azure transition-colors"
                >
                  +880 1400 019228
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <span className="text-azure">
                  <LocationIcon />
                </span>
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="border-t border-border pt-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[10px] text-muted">
              © {new Date().getFullYear()} ENKRYX. All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-[10px] text-muted">
              <a href="#" className="hover:text-azure transition-colors">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-azure transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
