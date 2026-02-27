// ─── Root Layout ──────────────────────────────────────────────────────────────
// This file wraps every page on the site. Changes here affect the entire site:
//   - <head> metadata (title, description, favicon)
//   - Global fonts (loaded via Google Fonts CDN link)
//   - Navbar and Footer (appear on every page)
//   - Global CSS import (globals.css)
// ──────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ── SEO Metadata ──────────────────────────────────────────────────────────────
// Update `title` and `description` to change how the site appears in Google
// and when shared on social media. The `icons` field sets the browser tab icon.
export const metadata: Metadata = {
  title: "The Atticus Project | AI and Law",
  description:
    "Non-profit driving AI performance, education, and opportunity in the legal space.",
  icons: {
    // Favicon = the small icon that appears in the browser tab
    // To change it: replace /favicon.png in the /public folder with your new icon
    icon: "/favicon.png",
  },
};

// ── Root Layout Component ──────────────────────────────────────────────────────
// `children` = the content of whichever page is currently being visited
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loads Playfair Display (headings) and DM Sans (body text)
            To change fonts: update the family names here AND in globals.css :root */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Sticky top navigation bar — edit in app/components/Navbar.tsx */}
        <Navbar />

        {/* Page content renders here */}
        <main>{children}</main>

        {/* Footer — edit in app/components/Footer.tsx */}
        <Footer />
      </body>
    </html>
  );
}
