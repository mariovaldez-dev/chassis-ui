import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 px-8 py-10 max-w-3xl mx-auto">
          <div className="prose">{children}</div>
        </main>
      </div>
    </Providers>
  );
}
