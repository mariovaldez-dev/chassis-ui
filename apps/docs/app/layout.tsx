import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: { template: "%s — synthetix-ui", default: "synthetix-ui" },
  description: "Librería de componentes UI para React con Tailwind CSS",
};

const setInitialTheme = `(function() {
  try {
    const storedTheme = localStorage.getItem('synthetix-ui-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme === 'dark' || (!storedTheme && prefersDark) ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (error) {
    // Ignore
  }
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Script id="init-theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        {children}
      </body>
    </html>
  );
}
