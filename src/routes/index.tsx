import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "motion/react";
import {
  CalendarClock,
  UsersRound,
  PackageSearch,
  LineChart,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Sparkles,
  CalendarCheck,
  Contact,
  Handshake,
  Boxes,
  Wallet,
  FileBarChart,
  Star,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo, Card, Dashboard, CalendarMock, MiniChart, Bars, PhoneMock, EASE } from "@/components/landing/mockups";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moonbox Salon — Your Salon. Beautifully Managed." },
      { name: "description", content: "Manage appointments, staff, customers, inventory and finances from one beautifully organized salon management system." },
      { property: "og:title", content: "Moonbox Salon — Smart Salon Management" },
      { property: "og:description", content: "Appointments, staff, customers, inventory and finances in one beautifully organized system." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const links = [
  ["Home", "home"],
  ["Features", "features"],
  ["How It Works", "how"],
  ["Benefits", "benefits"],
  ["FAQ", "faq"],
] as const;

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float";
const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1, ease: EASE } }),
};

function Reveal({ children, i = 0, className }: { children: React.ReactNode; i?: number; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      {children}
    </motion.div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <Reveal><p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">{eyebrow}</p></Reveal>
      <Reveal i={1}><h2 className="text-3xl font-extrabold text-foreground sm:text-5xl">{title}</h2></Reveal>
      {sub && <Reveal i={2}><p className="mt-4 text-lg text-muted-foreground">{sub}</p></Reveal>}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "glass border-b border-border py-3" : "py-5")}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5" aria-label="Main">
        <a href="#home" aria-label="Moonbox Salon home"><Logo /></a>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map(([l, id]) => (
            <li key={id}>
              <a href={`#${id}`} className="group relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {l}
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 lg:flex">
          <a href="#features" className="px-3 text-sm font-semibold text-foreground hover:text-primary">Explore Features</a>
          <a href="#cta" className={cn(btnPrimary, "py-2.5")}>Get Started</a>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass mx-4 mt-3 rounded-2xl border border-border p-4 shadow-float lg:hidden">
          {links.map(([l, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-medium text-foreground hover:bg-lavender">{l}</a>
          ))}
          <a href="#cta" onClick={() => setOpen(false)} className={cn(btnPrimary, "mt-2 w-full")}>Get Started</a>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -220]);
  const rot = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 12, 0]);
  return (
    <section id="home" ref={ref} className="relative overflow-hidden pb-24 pt-32 lg:pt-40">
      <motion.div className="bg-hero absolute inset-0 -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} />
      <div className="absolute -right-32 top-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2">
        <div>
          {[
            <p key="e" className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-primary shadow-soft"><Sparkles className="h-3.5 w-3.5" /> SMART SALON MANAGEMENT</p>,
            <h1 key="h" className="text-5xl font-extrabold leading-[1.02] text-foreground sm:text-6xl xl:text-7xl">Your Salon.<br /><span className="text-gradient">Beautifully Managed.</span></h1>,
            <p key="p" className="mt-6 max-w-lg text-lg text-muted-foreground">Manage appointments, staff, customers, inventory and finances from one beautifully organized system.</p>,
            <div key="b" className="mt-9 flex flex-wrap gap-3">
              <a href="#cta" className={btnPrimary}>Get Started <ArrowRight className="h-4 w-4" /></a>
              <a href="#product" className={btnGhost}>Explore the System</a>
            </div>,
            <p key="r" className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-success" /> Everything your salon needs, in one place.</p>,
          ].map((el, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: EASE }}>
              {el}
            </motion.div>
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-xl [perspective:1600px]">
          <motion.div style={{ rotateX: rot }} initial={{ opacity: 0, y: 120, rotateY: -14 }} animate={{ opacity: 1, y: 0, rotateY: -8 }} transition={{ duration: 1.3, delay: 0.7, ease: EASE }} className="[transform-style:preserve-3d]">
            <Dashboard />
          </motion.div>

          <motion.div style={{ y: y1 }} className="absolute -left-6 -top-10 hidden sm:block" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 1.2, ease: EASE }}>
            <Card className="animate-floaty w-48 p-3 shadow-float">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Next booking</p>
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-lavender text-primary"><CalendarClock className="h-4 w-4" /></span>
                <div><p className="text-sm font-bold text-foreground">Balayage</p><p className="text-xs text-muted-foreground">10:30 · Chair 2</p></div>
              </div>
            </Card>
          </motion.div>

          <motion.div style={{ y: y2 }} className="absolute -bottom-12 -right-4 hidden sm:block" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 1.4, ease: EASE }}>
            <Card className="animate-floaty-slow w-56 p-4 shadow-float">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground">AP</span>
                <div><p className="text-sm font-bold text-foreground">Amaya Perera</p><p className="text-xs text-muted-foreground">12 visits · Color lover</p></div>
              </div>
              <div className="mt-3 flex gap-1">{[0, 1, 2, 3, 4].map((s) => <Star key={s} className="h-3.5 w-3.5 fill-warning text-warning" />)}</div>
            </Card>
          </motion.div>

          <motion.div className="absolute -right-6 top-6 hidden md:block" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6, duration: 0.8, ease: EASE }}>
            <span className="animate-floaty flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-float">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" /> Confirmed
            </span>
          </motion.div>

          <motion.div style={{ y: y2 }} className="animate-floaty-slow absolute -left-16 bottom-10 -z-10 h-28 w-28 rounded-[2rem] bg-gradient-primary opacity-30 blur-[2px]" />
          <motion.div style={{ y: y1 }} className="animate-floaty absolute -top-16 right-20 -z-10 h-16 w-16 rounded-full bg-cyan/40 blur-[1px]" />
        </div>
      </div>
    </section>
  );
}

const problems = [
  [CalendarClock, "Booking Confusion", "Missed appointments and overlapping bookings make every day harder."],
  [UsersRound, "Staff Management", "Keeping track of shifts, responsibilities and daily performance takes time."],
  [PackageSearch, "Stock and Expenses", "Manual records make it difficult to keep track of product usage and business expenses."],
  [LineChart, "Business Visibility", "Without organized reports, understanding your salon's performance becomes difficult."],
] as const;

function Problems() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="The everyday struggle" title="Running Your Salon Should Feel Easier." sub="Less time managing paperwork. More time growing your business." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(([Icon, t, d], i) => (
            <motion.div key={t} initial={{ opacity: 0, y: 40, scale: 0.95, filter: "grayscale(1)" }} whileInView={{ opacity: 1, y: 0, scale: 1, filter: "grayscale(0)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}>
              <Card className="group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-float">
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-lavender text-primary transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"><Icon className="h-6 w-6" /></span>
                <h3 className="mb-2 text-lg font-bold text-foreground">{t}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{d}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const chaos = [
  { x: -260, y: -140, r: -18, label: "Paper booking" },
  { x: 240, y: -120, r: 14, label: "Sticky note" },
  { x: -220, y: 150, r: 10, label: "Customer list" },
  { x: 260, y: 130, r: -12, label: "Stock record" },
  { x: 0, y: -200, r: 22, label: "Expense slip" },
  { x: 0, y: 210, r: -20, label: "Staff shift" },
];

function Transition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const dashOpacity = useTransform(p, [0.55, 0.8], [0, 1]);
  const dashScale = useTransform(p, [0.55, 0.85], [0.85, 1]);
  const chaosText = useTransform(p, [0, 0.35], [1, 0]);
  const orderText = useTransform(p, [0.4, 0.65], [0, 1]);
  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="bg-hero absolute inset-0 -z-10 opacity-60" />
        <div className="absolute top-24 text-center sm:top-28">
          <motion.p style={{ opacity: chaosText }} className="text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">From daily chaos…</motion.p>
          <motion.h2 style={{ opacity: orderText }} className="mt-2 px-5 text-3xl font-extrabold text-foreground sm:text-5xl">…to <span className="text-gradient">Beautifully Organized.</span></motion.h2>
        </div>
        <div className="relative h-[340px] w-full max-w-3xl px-5">
          {chaos.map((c, i) => (
            <ChaosCard key={c.label} c={c} i={i} p={p} />
          ))}
          <motion.div style={{ opacity: dashOpacity, scale: dashScale }} className="absolute inset-x-5 top-1/2 -translate-y-1/2 sm:inset-x-16">
            <Dashboard compact />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ChaosCard({ c, i, p }: { c: (typeof chaos)[number]; i: number; p: ReturnType<typeof useSpring> }) {
  const col = i % 3, row = Math.floor(i / 3);
  const x = useTransform(p, [0, 0.55], [c.x, (col - 1) * 150]);
  const y = useTransform(p, [0, 0.55], [c.y, (row - 0.5) * 80]);
  const rotate = useTransform(p, [0, 0.55], [c.r, 0]);
  const opacity = useTransform(p, [0.55, 0.75], [1, 0]);
  return (
    <motion.div style={{ x, y, rotate, opacity }} className="absolute left-1/2 top-1/2 -ml-[70px] -mt-[32px]">
      <div className="w-[140px] rounded-xl border border-border bg-card p-3 shadow-float">
        <div className="mb-2 h-1.5 w-10 rounded-full bg-primary/40" />
        <p className="text-xs font-semibold text-foreground">{c.label}</p>
        <div className="mt-2 space-y-1"><div className="h-1 rounded bg-muted" /><div className="h-1 w-2/3 rounded bg-muted" /></div>
      </div>
    </motion.div>
  );
}

function Product() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [25, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.88, 1]);
  const yA = useTransform(scrollYProgress, [0.2, 0.6], [80, -20]);
  const yB = useTransform(scrollYProgress, [0.3, 0.7], [120, 0]);
  return (
    <section id="product" ref={ref} className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="Product" title="Meet Your Salon's New Command Center." sub="One system to help you stay organized, serve your customers and understand your business." />
        <div className="relative [perspective:1800px]">
          <motion.div style={{ rotateX, scale }} className="hidden md:block">
            <Dashboard className="mx-auto max-w-4xl" />
          </motion.div>
          <div className="md:hidden"><Dashboard compact /></div>
          <motion.div style={{ y: yA }} className="absolute -left-4 top-1/3 hidden w-60 lg:block">
            <Card className="p-4 shadow-float">
              <p className="mb-3 text-xs font-semibold text-foreground">Staff activity</p>
              {["Ishara · Stylist", "Ruwan · Barber", "Sachi · Nails"].map((s, i) => (
                <div key={s} className="mb-2 flex items-center gap-2">
                  <span className="h-7 w-7 rounded-full bg-lavender" />
                  <span className="flex-1 text-xs text-foreground">{s}</span>
                  <span className={cn("h-2 w-2 rounded-full", i === 2 ? "bg-warning" : "bg-success")} />
                </div>
              ))}
            </Card>
          </motion.div>
          <motion.div style={{ y: yB }} className="absolute -right-4 bottom-0 hidden w-56 lg:block">
            <Card className="p-4 shadow-float">
              <p className="mb-2 text-xs font-semibold text-foreground">Inventory</p>
              {[["Shampoo", 78], ["Hair color", 34], ["Nail gel", 56]].map(([n, v]) => (
                <div key={n} className="mb-2">
                  <div className="mb-1 flex justify-between text-[10px] text-muted-foreground"><span>{n}</span><span>{v}%</span></div>
                  <div className="h-1.5 rounded-full bg-muted"><motion.div className="h-full rounded-full bg-gradient-primary" initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }} /></div>
                </div>
              ))}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CustomerMock() {
  return (
    <Card className="p-5 shadow-float">
      <motion.div initial={{ height: 72 }} whileInView={{ height: "auto" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3, ease: EASE }} className="overflow-hidden">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground">NR</span>
          <div><p className="font-bold text-foreground">Nethmi Rajapaksa</p><p className="text-xs text-muted-foreground">Customer since 2024</p></div>
        </div>
        <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Service history</p>
        {["Bridal trial · Mar 12", "Keratin treatment · Feb 02", "Haircut & style · Jan 10"].map((s) => (
          <div key={s} className="mb-2 flex items-center justify-between rounded-xl bg-muted px-3 py-2 text-sm text-foreground"><span>{s}</span><CheckCircle2 className="h-4 w-4 text-success" /></div>
        ))}
      </motion.div>
    </Card>
  );
}

function StaffMock() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[["Ishara", "Senior Stylist", "9–5"], ["Ruwan", "Barber", "10–6"], ["Sachi", "Nail Artist", "11–7"], ["Malith", "Colorist", "9–3"]].map(([n, r, h], i) => (
        <motion.div key={n} initial={{ opacity: 0, scale: 0.7, rotate: i % 2 ? 8 : -8 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}>
          <Card className="p-4">
            <span className="mb-3 block h-10 w-10 rounded-full bg-lavender" />
            <p className="font-bold text-foreground">{n}</p>
            <p className="text-xs text-primary">{r}</p>
            <p className="mt-2 text-xs text-muted-foreground">Shift {h}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function FinanceMock() {
  return (
    <Card className="p-5 shadow-float">
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-lavender p-3"><p className="text-xs text-muted-foreground">Income (sample)</p><p className="text-xl font-bold text-foreground">Rs 248k</p></div>
        <div className="rounded-xl bg-muted p-3"><p className="text-xs text-muted-foreground">Expenses (sample)</p><p className="text-xl font-bold text-foreground">Rs 96k</p></div>
      </div>
      <Bars />
      <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d}>{d}</span>)}</div>
    </Card>
  );
}

function InventoryMock() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[["Argan Oil", "In stock"], ["Shampoo", "In stock"], ["Hair Dye", "Low"], ["Nail Gel", "In stock"], ["Face Mask", "Low"], ["Serum", "In stock"]].map(([n, s], i) => (
        <motion.div key={n} initial={{ opacity: 0, y: 40, x: (i % 3 - 1) * 30 }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}>
          <Card className="p-3">
            <div className="mb-2 aspect-square rounded-xl bg-gradient-primary opacity-80" style={{ filter: `hue-rotate(${i * 25}deg)` }} />
            <p className="truncate text-xs font-semibold text-foreground">{n}</p>
            <span className={cn("text-[10px] font-semibold", s === "Low" ? "text-warning" : "text-success")}>{s}</span>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function ReportsMock() {
  return (
    <Card className="space-y-4 p-5 shadow-float">
      <div className="grid grid-cols-3 gap-2">{[["Services", "142"], ["Clients", "98"], ["Avg. ticket", "Rs 3.4k"]].map(([k, v]) => <div key={k} className="rounded-xl border border-border p-2.5"><p className="text-[10px] text-muted-foreground">{k}</p><p className="font-bold text-foreground">{v}</p></div>)}</div>
      <MiniChart className="h-24" />
      <Bars values={[30, 55, 45, 70, 85, 60]} className="h-16" />
      <p className="text-center text-[10px] text-muted-foreground">Illustrative sample data</p>
    </Card>
  );
}

const features = [
  [CalendarCheck, "Appointment Management", "Every Appointment, Under Control.", "Organize your daily bookings and maintain a clearer view of your salon schedule.", CalendarMock],
  [Contact, "Customer Management", "Build Better Customer Relationships.", "Keep customer details organized and make everyday service management easier.", CustomerMock],
  [Handshake, "Staff Management", "Keep Your Team Organized.", "View your team's information and organize daily salon operations more clearly.", StaffMock],
  [Wallet, "Income & Expenses", "Understand Your Salon's Finances.", "Organize income and expenses to build a clearer picture of daily business activity.", FinanceMock],
  [Boxes, "Inventory Management", "Know What Your Salon Needs.", "Keep product information and stock records organized in one place.", InventoryMock],
  [FileBarChart, "Business Reports", "Turn Daily Activity Into Clarity.", "View organized information that helps you understand your salon's operations.", ReportsMock],
] as const;

function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="Features" title="Everything in One Beautiful Place." />
        <div className="space-y-28">
          {features.map(([Icon, tag, h, d, Mock], i) => (
            <div key={tag} className="grid items-center gap-12 lg:grid-cols-2">
              <div className={cn(i % 2 && "lg:order-2")}>
                <Reveal><span className="mb-4 inline-flex items-center gap-2 rounded-full bg-lavender px-3 py-1 text-xs font-bold text-primary"><Icon className="h-3.5 w-3.5" />{tag}</span></Reveal>
                <Reveal i={1}><h3 className="text-3xl font-extrabold text-foreground sm:text-4xl">{h}</h3></Reveal>
                <Reveal i={2}><p className="mt-4 max-w-md text-lg text-muted-foreground">{d}</p></Reveal>
              </div>
              <Reveal i={1} className="mx-auto w-full max-w-md"><Mock /></Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  ["01", "Organize Your Salon", "Bring daily salon information into one organized workflow."],
  ["02", "Manage Daily Operations", "View bookings, customers, staff and other salon activities more clearly."],
  ["03", "Make Better-Informed Decisions", "Use organized records and reports to understand your business."],
];

function How() {
  return (
    <section id="how" className="bg-muted/50 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="How it works" title="Simple to Understand. Beautifully Organized." />
        <div className="relative grid gap-10 md:grid-cols-3">
          <motion.div className="absolute left-[16%] right-[16%] top-7 hidden h-0.5 origin-left bg-gradient-primary md:block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE }} />
          <motion.div className="absolute bottom-0 left-7 top-0 w-0.5 origin-top bg-gradient-primary md:hidden" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE }} />
          {steps.map(([n, t, d], i) => (
            <Reveal key={n} i={i + 1} className="relative flex gap-5 md:block md:text-center">
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-card font-extrabold text-primary shadow-float md:mx-auto">{n}</span>
              <div><h3 className="mb-2 text-xl font-bold text-foreground md:mt-6">{t}</h3><p className="text-muted-foreground">{d}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  [CalendarCheck, "A clearer daily schedule."],
  [Contact, "Better-organized customer information."],
  [Handshake, "Easier staff coordination."],
  [Boxes, "Organized inventory records."],
  [Wallet, "Greater visibility into income and expenses."],
  [FileBarChart, "More structured business reporting."],
] as const;

function Benefits() {
  return (
    <section id="benefits" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="Benefits" title="Designed Around the Way Salons Work." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([Icon, t], i) => (
            <Reveal key={t} i={i % 3}>
              <Card className="group flex items-center gap-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-float">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-lavender text-primary transition-colors duration-300 group-hover:bg-gradient-primary group-hover:text-primary-foreground"><Icon className="h-5 w-5" /></span>
                <p className="font-semibold text-foreground">{t}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Devices() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const x = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const xP = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const op = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  return (
    <section ref={ref} className="overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="Any screen" title="Beautiful on Every Screen." sub="A consistent Moonbox Salon experience across desktop and mobile views." />
        <div className="relative flex flex-col items-center gap-8 md:block">
          <motion.div style={{ x, opacity: op }} className="mx-auto w-full max-w-3xl">
            <div className="rounded-t-2xl border-[10px] border-b-0 border-navy bg-navy"><Dashboard className="rounded-lg shadow-none" /></div>
            <div className="mx-auto h-4 w-[110%] -translate-x-[4.5%] rounded-b-2xl bg-navy/90 shadow-float" />
          </motion.div>
          <motion.div style={{ x: xP, opacity: op }} className="md:absolute md:-bottom-6 md:right-4 lg:right-10">
            <PhoneMock className="md:rotate-6" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  ["What is Moonbox Salon?", "Moonbox Salon is a salon management system by Moonbox Digital that brings appointments, customers, staff, inventory and finances together in one organized place."],
  ["How can Moonbox Salon help my salon?", "It helps you keep a clearer daily schedule, organized customer details, easier staff coordination and better visibility into your salon's activity."],
  ["What can I manage with the system?", "Appointments, customer information, staff details, inventory records, income and expenses, and business reports."],
  ["Can I view the system on different screen sizes?", "Yes. The interface is designed to present clearly on both larger screens and mobile-sized views."],
  ["How can I learn more or get started?", "Use the Get Started button on this page to take the next step with Moonbox Salon."],
];

function Faq() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHead eyebrow="FAQ" title="Questions, Answered." />
        <Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="rounded-2xl border border-border bg-card px-6 shadow-soft">
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section id="cta" className="px-5 py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-border bg-lavender px-6 py-20 text-center shadow-float sm:px-12">
        <div className="bg-hero absolute inset-0" />
        <div className="relative">
          <Reveal><h2 className="mx-auto max-w-3xl text-4xl font-extrabold text-foreground sm:text-6xl">Give Your Salon a <span className="text-gradient">Smarter Way</span> to Work.</h2></Reveal>
          <Reveal i={1}><p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">Bring your daily salon operations together with Moonbox Salon.</p></Reveal>
          <Reveal i={2} className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#home" className={btnPrimary}>Get Started <ArrowRight className="h-4 w-4" /></a>
            <a href="#features" className={btnGhost}>Explore Features</a>
          </Reveal>
          <Reveal i={3} className="mx-auto mt-14 max-w-2xl"><div className="animate-floaty-slow"><Dashboard /></div></Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">A smart salon management system by Moonbox Digital — appointments, staff, customers, inventory and finances, beautifully organized.</p>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {links.map(([l, id]) => <li key={id}><a href={`#${id}`} className="text-muted-foreground transition-colors hover:text-primary">{l}</a></li>)}
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-7xl px-5 text-xs text-muted-foreground">© {new Date().getFullYear()} Moonbox Digital. All rights reserved.</p>
    </footer>
  );
}

function Index() {
  return (
    <main className="overflow-x-clip">
      <Nav />
      <Hero />
      <Problems />
      <Transition />
      <Product />
      <Features />
      <How />
      <Benefits />
      <Devices />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
