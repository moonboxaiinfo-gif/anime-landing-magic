import { motion } from "motion/react";
import {
  Calendar,
  Users,
  Scissors,
  Package,
  BarChart3,
  LayoutDashboard,
  Wallet,
  Bell,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-foreground", className)}>
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--primary-glow)" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#lg)" />
        <path d="M20.5 8.5a8 8 0 1 0 3 12.6A7 7 0 0 1 20.5 8.5Z" fill="var(--primary-foreground)" />
      </svg>
      Moonbox<span className="font-medium text-muted-foreground">Salon</span>
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-2xl border border-border bg-card shadow-soft", className)}>{children}</div>;
}

const bookings = [
  { t: "09:00", n: "Amaya P.", s: "Hair Color", c: "bg-primary/15 text-primary", st: "Confirmed" },
  { t: "10:30", n: "Nethmi R.", s: "Bridal Trial", c: "bg-cyan/20 text-foreground", st: "In chair" },
  { t: "12:00", n: "Kavin S.", s: "Haircut", c: "bg-success/20 text-foreground", st: "Booked" },
  { t: "14:15", n: "Dilini F.", s: "Facial", c: "bg-warning/25 text-foreground", st: "Booked" },
];

export function MiniChart({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 200 70" className={cn("w-full", className)} aria-hidden>
      <defs>
        <linearGradient id="cf" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 55 C20 50 30 30 50 35 S80 50 100 30 S140 10 160 20 S190 8 200 5 L200 70 L0 70Z"
        fill="url(#cf)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: delay + 0.8 }}
      />
      <motion.path
        d="M0 55 C20 50 30 30 50 35 S80 50 100 30 S140 10 160 20 S190 8 200 5"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay, ease: EASE }}
      />
    </svg>
  );
}

export function Bars({ values = [40, 65, 50, 80, 60, 95, 75], className }: { values?: number[]; className?: string }) {
  return (
    <div className={cn("flex h-24 items-end gap-2", className)}>
      {values.map((v, i) => (
        <motion.div
          key={i}
          className={cn("flex-1 rounded-t-md", i === values.length - 2 ? "bg-gradient-primary" : "bg-lavender")}
          initial={{ height: 0 }}
          whileInView={{ height: `${v}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 * i, ease: EASE }}
        />
      ))}
    </div>
  );
}

const nav = [LayoutDashboard, Calendar, Users, Scissors, Package, Wallet, BarChart3];

export function Dashboard({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-card shadow-float", className)}>
      <div className="flex">
        <aside className="hidden w-14 flex-col items-center gap-3 border-r border-border bg-muted/60 py-4 sm:flex">
          <div className="h-7 w-7 rounded-lg bg-gradient-primary" />
          {nav.map((I, i) => (
            <span key={i} className={cn("grid h-8 w-8 place-items-center rounded-lg text-muted-foreground", i === 0 && "bg-card text-primary shadow-soft")}>
              <I className="h-4 w-4" />
            </span>
          ))}
        </aside>
        <div className="flex-1 p-4">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Today</p>
              <p className="text-sm font-bold text-foreground">Good morning, Studio</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1 rounded-full border border-border px-3 py-1 text-[10px] text-muted-foreground md:flex">
                <Search className="h-3 w-3" /> Search
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-lavender text-primary"><Bell className="h-3.5 w-3.5" /></span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Appointments", "24"],
              ["Customers", "186"],
              ["Staff on duty", "6"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-border p-2.5">
                <p className="truncate text-[10px] text-muted-foreground">{k}</p>
                <p className="text-lg font-bold text-foreground">{v}</p>
              </div>
            ))}
          </div>
          <div className={cn("mt-3 grid gap-3", compact ? "grid-cols-1" : "grid-cols-5")}>
            <div className={cn("rounded-xl border border-border p-3", !compact && "col-span-3")}>
              <div className="mb-1 flex items-center justify-between">
                <p className="text-xs font-semibold text-foreground">Revenue overview</p>
                <span className="rounded-full bg-lavender px-2 py-0.5 text-[9px] font-medium text-primary">Sample</span>
              </div>
              <MiniChart className="h-20" delay={0.6} />
            </div>
            {!compact && (
              <div className="col-span-2 space-y-1.5 rounded-xl border border-border p-3">
                <p className="text-xs font-semibold text-foreground">Upcoming</p>
                {bookings.slice(0, 3).map((b) => (
                  <div key={b.t} className="flex items-center gap-2">
                    <span className="text-[9px] font-medium text-muted-foreground">{b.t}</span>
                    <span className={cn("flex-1 truncate rounded-md px-1.5 py-1 text-[9px] font-semibold", b.c)}>{b.s}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CalendarMock() {
  return (
    <Card className="p-5 shadow-float">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-bold text-foreground">Thursday schedule</p>
        <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-primary">4 bookings</span>
      </div>
      <div className="space-y-2.5">
        {bookings.map((b, i) => (
          <div key={b.t} className="flex items-center gap-3">
            <span className="w-11 text-xs font-medium text-muted-foreground">{b.t}</span>
            <motion.div
              className={cn("flex flex-1 items-center justify-between rounded-xl px-3 py-2.5", b.c)}
              initial={{ opacity: 0, x: i % 2 ? 80 : -80, rotate: i % 2 ? 6 : -6 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.12 * i, ease: EASE }}
            >
              <span>
                <span className="block text-sm font-semibold">{b.s}</span>
                <span className="text-xs opacity-75">{b.n}</span>
              </span>
              <span className="rounded-full bg-card/80 px-2 py-0.5 text-[10px] font-semibold text-foreground">{b.st}</span>
            </motion.div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function PhoneMock({ className }: { className?: string }) {
  return (
    <div className={cn("w-[200px] rounded-[2.2rem] border-[6px] border-navy bg-card p-3 shadow-float", className)}>
      <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-navy/80" />
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Today</p>
      <p className="mb-3 text-sm font-bold text-foreground">24 appointments</p>
      <MiniChart className="mb-3 h-12" />
      <div className="space-y-1.5">
        {bookings.map((b) => (
          <div key={b.t} className={cn("rounded-lg px-2 py-1.5 text-[10px] font-semibold", b.c)}>
            {b.t} · {b.s}
          </div>
        ))}
      </div>
    </div>
  );
}
