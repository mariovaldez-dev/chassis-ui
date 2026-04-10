import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Badge,
  Spinner,
  Switch,
  Checkbox,
  Textarea,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  Accordion,
  Toaster,
  useToast,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@synthetix-ui/core";

/* ── Dark mode toggle ────────────────────────────────────────── */

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label="Cambiar tema"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-accent"
    >
      {dark ? (
        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      )}
    </button>
  );
}

/* ── Install snippet with copy ───────────────────────────────── */

function InstallSnippet() {
  const [copied, setCopied] = useState(false);
  const cmd = "npm install @synthetix-ui/core";
  const copy = () => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      className="group flex items-center gap-3 rounded-lg border border-border bg-muted/60 px-4 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
    >
      <span className="text-muted-foreground select-none">$</span>
      <span>{cmd}</span>
      <span className="ml-2 text-muted-foreground transition-colors group-hover:text-foreground">
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        )}
      </span>
    </button>
  );
}

/* ── Section wrapper ─────────────────────────────────────────── */

function Section({ id, label, children }: { id?: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      {children}
    </section>
  );
}

/* ── Pagination helpers ──────────────────────────────────────── */

function getPages(current: number, total: number): (number | "e")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "e", total];
  if (current >= total - 3) return [1, "e", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "e", current - 1, current, current + 1, "e", total];
}

/* ── FAQ data ────────────────────────────────────────────────── */

const FAQ = [
  { id: "q1", trigger: "¿Cómo instalo un componente?", content: "Ejecuta npx @synthetix-ui add <componente> para copiar el componente a tu proyecto, o instala @synthetix-ui/core para usarlo como dependencia npm." },
  { id: "q2", trigger: "¿Tiene soporte para dark mode?", content: "Sí. Añade la clase .dark al elemento <html> y el preset de Tailwind aplica automáticamente los tokens de color correctos." },
  { id: "q3", trigger: "¿Es compatible con Next.js?", content: "Totalmente. Los componentes client-side llevan 'use client'. Para Next.js 15+, puedes importarlos directamente." },
];

/* ── Main app ────────────────────────────────────────────────── */

export function App() {
  const { toast } = useToast();
  const [paginaDefault, setPaginaDefault] = useState(3);
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [progress, setProgress] = useState(62);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="bottom-right" />

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-primary" />
            <span className="text-sm font-semibold">synthetix-ui</span>
          </div>
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground sm:flex">
            <a href="#buttons" className="transition-colors hover:text-foreground">Buttons</a>
            <a href="#forms" className="transition-colors hover:text-foreground">Forms</a>
            <a href="#cards" className="transition-colors hover:text-foreground">Cards</a>
            <a href="#feedback" className="transition-colors hover:text-foreground">Feedback</a>
            <a
              href={import.meta.env.VITE_DOCS_URL ?? "https://synthetix-ui-docs.vercel.app"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-foreground"
            >
              Docs
              <svg xmlns="http://www.w3.org/2000/svg" width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-20 px-6 py-20">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-6 text-center">
          <Badge variant="primary" className="text-xs">v0.1.0 — disponible en npm</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Componentes UI para{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              React
            </span>
          </h1>
          <p className="max-w-lg text-base text-muted-foreground">
            Librería de componentes accesibles construidos con Tailwind CSS.
            Instálalos como paquete npm o cópialos directo a tu proyecto.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button size="lg" onClick={() => document.getElementById("buttons")?.scrollIntoView({ behavior: "smooth" })}>
              Ver componentes
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <a
                href={import.meta.env.VITE_DOCS_URL ?? "https://synthetix-ui-docs.vercel.app"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                Ver documentacion
                <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </Button>
            <InstallSnippet />
          </div>
          {/* Stats */}
          <div className="flex gap-8 pt-2 text-sm text-muted-foreground">
            {[["30+", "Componentes"], ["100%", "TypeScript"], ["A11y", "Accesible"]].map(([val, lbl]) => (
              <div key={lbl} className="flex flex-col items-center gap-0.5">
                <span className="text-lg font-semibold text-foreground">{val}</span>
                <span>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Buttons ──────────────────────────────────────────── */}
        <Section id="buttons" label="Buttons">
          <div className="rounded-xl border bg-card p-6 space-y-5">
            <div>
              <p className="mb-3 text-xs text-muted-foreground">Variantes</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="link">Link</Button>
                <Button isLoading>Loading</Button>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs text-muted-foreground">Tamaños</p>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant="outline">Small</Button>
                <Button size="md" variant="outline">Medium</Button>
                <Button size="lg" variant="outline">Large</Button>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs text-muted-foreground">Con Tooltip</p>
              <TooltipProvider>
                <div className="flex flex-wrap gap-2">
                  {(["Guardar", "Compartir", "Eliminar"] as const).map((label) => (
                    <Tooltip key={label}>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm">{label}</Button>
                      </TooltipTrigger>
                      <TooltipContent>{label} acción</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </div>
          </div>
        </Section>

        {/* ── Forms ────────────────────────────────────────────── */}
        <Section id="forms" label="Form elements">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-sm font-medium">Inputs</h3>
              <Input label="Nombre" placeholder="Mario Flores" />
              <Input label="Email" type="email" placeholder="mario@ejemplo.com" />
              <Input label="Con error" errorText="Este campo es obligatorio" placeholder="..." />
            </div>
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-sm font-medium">Controles</h3>
              <Select
                label="País"
                placeholder="Selecciona un país"
                options={[
                  { value: "mx", label: "México" },
                  { value: "es", label: "España" },
                  { value: "ar", label: "Argentina" },
                  { value: "co", label: "Colombia" },
                ]}
              />
              <Textarea label="Mensaje" placeholder="Escribe tu mensaje..." rows={3} />
              <div className="flex flex-col gap-3 pt-1">
                <Checkbox
                  label="Acepto los términos y condiciones"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <Switch
                  label={`Notificaciones ${switchOn ? "activadas" : "desactivadas"}`}
                  checked={switchOn}
                  onCheckedChange={setSwitchOn}
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ── Cards ────────────────────────────────────────────── */}
        <Section id="cards" label="Cards">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Default</CardTitle>
                <CardDescription>Borde sutil + shadow-sm</CardDescription>
              </CardHeader>
              <CardBody>Ideal para contenido general.</CardBody>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">Ver más</Button>
              </CardFooter>
            </Card>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated</CardTitle>
                <CardDescription>Shadow-md para jerarquía</CardDescription>
              </CardHeader>
              <CardBody>Resalta contenido importante.</CardBody>
              <CardFooter>
                <Button size="sm" className="w-full">Acción</Button>
              </CardFooter>
            </Card>
            <Card variant="flat">
              <CardHeader>
                <CardTitle>Flat</CardTitle>
                <CardDescription>Sin borde, fondo muted</CardDescription>
              </CardHeader>
              <CardBody>Perfecto para áreas secundarias.</CardBody>
              <CardFooter>
                <Button size="sm" variant="ghost" className="w-full">Explorar</Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* ── Feedback ─────────────────────────────────────────── */}
        <Section id="feedback" label="Feedback & Status">
          <div className="grid gap-4 sm:grid-cols-2">

            {/* Badges */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-sm font-medium">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success" dot>Online</Badge>
                <Badge variant="warning" dot>Advertencia</Badge>
                <Badge variant="danger">Error</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="primary" onRemove={() => {}}>Removable</Badge>
                <Badge variant="success" onRemove={() => {}}>Tag</Badge>
              </div>
            </div>

            {/* Spinners */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-sm font-medium">Spinners & Progress</h3>
              <div className="flex items-center gap-4">
                <Spinner size="xs" />
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="xl" />
              </div>
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progreso</span><span>{progress}%</span>
                </div>
                <Progress value={progress} />
                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="outline" onClick={() => setProgress(p => Math.max(0, p - 10))}>−10</Button>
                  <Button size="sm" variant="outline" onClick={() => setProgress(p => Math.min(100, p + 10))}>+10</Button>
                </div>
              </div>
            </div>

            {/* Toasts */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-sm font-medium">Toast notifications</h3>
              <div className="flex flex-wrap gap-2">
                {([
                  { variant: "success", label: "Éxito", desc: "Cambios guardados correctamente." },
                  { variant: "danger",  label: "Error", desc: "No se pudo completar la acción." },
                  { variant: "warning", label: "Aviso", desc: "Revisa los datos antes de continuar." },
                  { variant: "info",    label: "Info",  desc: "Tienes 3 notificaciones nuevas." },
                ] as const).map(({ variant, label, desc }) => (
                  <Button
                    key={variant}
                    size="sm"
                    variant="outline"
                    onClick={() => toast({ title: label, description: desc, variant })}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Dialog */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-sm font-medium">Dialog</h3>
              <p className="text-sm text-muted-foreground">Modal accesible con trampa de foco y cierre con Escape.</p>
              <Button variant="outline" onClick={() => setDialogOpen(true)}>Abrir dialog</Button>
              <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogHeader onClose={() => setDialogOpen(false)}>
                  <p className="text-sm font-semibold">Confirmar acción</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    ¿Estás seguro de que quieres continuar? Esta acción no se puede deshacer.
                  </p>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={() => {
                    setDialogOpen(false);
                    toast({ title: "Acción confirmada", variant: "success" });
                  }}>
                    Confirmar
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
          </div>
        </Section>

        {/* ── Tabs + Accordion ─────────────────────────────────── */}
        <Section label="Contenido">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-sm font-medium">Tabs</h3>
              <Tabs defaultValue="npm">
                <TabsList>
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                  <TabsTrigger value="yarn">yarn</TabsTrigger>
                </TabsList>
                <TabsContent value="npm" className="mt-3">
                  <code className="rounded bg-muted px-2 py-1 text-xs">npm install @synthetix-ui/core</code>
                </TabsContent>
                <TabsContent value="pnpm" className="mt-3">
                  <code className="rounded bg-muted px-2 py-1 text-xs">pnpm add @synthetix-ui/core</code>
                </TabsContent>
                <TabsContent value="yarn" className="mt-3">
                  <code className="rounded bg-muted px-2 py-1 text-xs">yarn add @synthetix-ui/core</code>
                </TabsContent>
              </Tabs>
            </div>
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-sm font-medium">FAQ</h3>
              <Accordion items={FAQ} />
            </div>
          </div>
        </Section>

        {/* ── Avatars ──────────────────────────────────────────── */}
        <Section label="Avatars">
          <div className="rounded-xl border bg-card p-6">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10">
                <AvatarFallback>MF</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/20 text-primary">JD</AvatarFallback>
              </Avatar>
              {/* Avatar stack */}
              <div className="flex -space-x-2 ml-4">
                {["MF", "JD", "AB", "CR"].map((initials) => (
                  <Avatar key={initials} className="h-8 w-8 ring-2 ring-background">
                    <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted ring-2 ring-background text-xs text-muted-foreground">
                  +5
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Pagination ───────────────────────────────────────── */}
        <Section label="Pagination">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Default */}
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border bg-card p-6">
              <p className="text-xs text-muted-foreground">Default</p>
              <div className="inline-flex items-center rounded-xl border bg-background shadow-sm px-2 py-1.5 gap-0.5">
                <PaginationPrevious
                  onClick={() => setPaginaDefault(p => Math.max(1, p - 1))}
                  aria-disabled={paginaDefault === 1}
                  className={`h-8 px-2.5 rounded-lg text-xs ${paginaDefault === 1 ? "pointer-events-none opacity-40" : ""}`}
                />
                {getPages(paginaDefault, 10).map((p, i) =>
                  p === "e" ? (
                    <PaginationEllipsis key={`e${i}`} className="h-8 w-8" />
                  ) : (
                    <PaginationLink
                      key={p}
                      isActive={p === paginaDefault}
                      onClick={() => setPaginaDefault(p)}
                      className="h-8 w-8 rounded-lg text-xs"
                    >
                      {p}
                    </PaginationLink>
                  )
                )}
                <PaginationNext
                  onClick={() => setPaginaDefault(p => Math.min(10, p + 1))}
                  aria-disabled={paginaDefault === 10}
                  className={`h-8 px-2.5 rounded-lg text-xs ${paginaDefault === 10 ? "pointer-events-none opacity-40" : ""}`}
                />
              </div>
            </div>

            {/* Rounded pill */}
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border bg-card p-6">
              <p className="text-xs text-muted-foreground">Rounded</p>
              <Pagination>
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious className="h-8 px-2 rounded-full border" onClick={() => {}} />
                  </PaginationItem>
                  {[1, 2, 3, 4, 5].map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={p === 1}
                        className={`h-8 w-8 rounded-full text-xs ${p === 1 ? "bg-primary text-primary-foreground" : ""}`}
                        onClick={() => {}}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext className="h-8 px-2 rounded-full border" onClick={() => {}} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </Section>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer className="flex flex-col items-center gap-2 border-t pt-10 text-center text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-sm bg-primary" />
            <span className="font-medium text-foreground">synthetix-ui</span>
          </div>
          <p>Construido con React + Tailwind CSS · Disponible en npm</p>
          <code className="rounded bg-muted px-2 py-0.5">npm install @synthetix-ui/core</code>
        </footer>

      </main>
    </div>
  );
}
