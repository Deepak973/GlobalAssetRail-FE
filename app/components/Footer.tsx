"use client";

import Link from "next/link";

const sections = [
  {
    title: "Protocol",
    links: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Documentation", path: "#" },
      { name: "Whitepaper", path: "#" },
      { name: "Audit Reports", path: "#" },
    ],
  },
  {
    title: "Features",
    links: [
      { name: "Institution Onboarding", path: "/institution-onboarding" },
      { name: "Mint/Burn", path: "/mint-burn" },
      { name: "Cross-Border", path: "/cross-border" },
      { name: "Analytics", path: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "API Documentation", path: "#" },
      { name: "SDK", path: "#" },
      { name: "Community", path: "#" },
      { name: "Support", path: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", path: "#" },
      { name: "Careers", path: "#" },
      { name: "Press", path: "#" },
      { name: "Contact", path: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg mr-3"></div>
              <span className="text-xl font-bold">Global Asset Rail</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Next-generation stablecoin protocol enabling institutional-grade
              cross-border payments with domestic yield capture.
            </p>
          </div>

          {/* Sections */}
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    {link.path === "#" ? (
                      <span className="text-slate-400 text-sm cursor-not-allowed">
                        {link.name}
                      </span>
                    ) : (
                      <Link
                        href={link.path}
                        className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2024 Global Asset Rail Protocol. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
