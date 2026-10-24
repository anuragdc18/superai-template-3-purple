import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  ClipboardList,
  Clock,
  Dribbble,
  FileText,
  Headphones,
  IndianRupee,
  Instagram,
  MapPin,
  MessageCircle,
  Minus,
  PenTool,
  Plus,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Upload,
  Users,
} from "lucide-react";
import { CATEGORIES, POPULAR, SLIDES, serviceUrl, waLink } from "../lib/site";
import { telHref, useSite } from "../queries/site";
import { LeadForm } from "../components/lead-form";
import { IconDot, P, catStyle } from "../components/pastel";

function SectionHead({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${text ? "mb-9" : "mb-11"}`}>
      {eyebrow && <p className="eyebrow !mb-1">{eyebrow}</p>}
      <h2 className="text-[32px] leading-[1.25] sm:text-[40px]">{title}</h2>
      {text && <p className="mt-3 text-[17px] font-medium">{text}</p>}
    </div>
  );
}

// ───────────────────────── hero ─────────────────────────

function Hero() {
  const s = SLIDES[0];
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f3eafd_0%,#f7ecf5_45%,#fdf0e8_100%)]">
      {/* pastel blobs */}
      <span className="float-slow pointer-events-none absolute left-[8.3%] top-[65px] -z-10 hidden h-40 w-40 rounded-full bg-[#f9e9be] md:block" />
      <span
        className="float-slow pointer-events-none absolute right-[10%] top-[113px] -z-10 hidden h-56 w-56 rounded-full bg-[#e1d5f8] md:block"
        style={{ animationDelay: "-3s" }}
      />
      <span className="pointer-events-none absolute -bottom-12 left-[35.2%] -z-10 hidden h-24 w-24 rounded-full bg-[#f8cee0] md:block" />

      <div className="container-x flex flex-col items-center pb-10 pt-14 text-center sm:pt-20">
        <span className="rise inline-flex items-center gap-2 rounded-full bg-[#f9dcd8] px-4 py-1.5 text-[13.5px] font-semibold text-brand">
          <span className="h-2 w-2 rounded-full bg-brand" /> {s.tag}
        </span>
        <h1 className="rise mt-6 max-w-[780px] text-[40px] leading-[1.08] sm:text-[56px] lg:text-[66px]" style={{ animationDelay: "80ms" }}>
          {s.title}
        </h1>
        <p className="rise mt-6 max-w-[640px] text-[17px] font-medium leading-relaxed sm:text-[19px]" style={{ animationDelay: "160ms" }}>
          {s.text}
        </p>
        <div className="rise mt-9 flex flex-wrap justify-center gap-3" style={{ animationDelay: "240ms" }}>
          <a href="#enquiry" className="btn-brand h-[55px]">
            {s.cta || "Get Free Consultation"} <ArrowRight className="h-4 w-4" />
          </a>
          <Link to={s.link} className="btn-outline h-[55px]">
            {s.linkText}
          </Link>
        </div>

        <div className="rise mt-10 flex max-w-[900px] flex-wrap justify-center gap-2.5 sm:mt-14 sm:gap-4" style={{ animationDelay: "320ms" }}>
          {CATEGORIES.map((c) => {
            const st = catStyle(c.slug);
            return (
              <Link
                key={c.slug}
                to={`/services/${c.slug}`}
                className="flex h-11 items-center gap-2 rounded-full bg-white pl-1.5 pr-3.5 text-[13px] font-bold text-navy sm:h-[60px] sm:gap-3 sm:pl-2.5 sm:pr-5 sm:text-[15.5px] shadow-[0_12px_30px_-16px_rgba(139,92,246,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-14px_rgba(139,92,246,0.55)]"
              >
                <span className="sm:hidden"><IconDot color={st.pill} icon={st.icon} size={32} iconSize={15} /></span>
                <span className="hidden sm:inline-flex"><IconDot color={st.pill} icon={st.icon} /></span>
                {c.title}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── enquiry + stats ─────────────────────────

const STATS = [
  { icon: Star, big: "4.8", small: "Google Rating", bg: "#e9defc", fill: true },
  { icon: Users, big: "1,000+", small: "Happy Clients", bg: "#f6e1ec" },
  { icon: MapPin, big: "Pan-India", small: "Service", bg: "#e5e8f4" },
  { icon: ShieldCheck, big: "100%", small: "Online Process", bg: "#f2e0f2" },
];

function EnquiryAndStats() {
  return (
    <section id="enquiry" className="relative scroll-mt-40 bg-surface pb-12">
      <div className="container-x relative">
        <div className="relative z-10 rounded-[30px] border border-line bg-white p-6 shadow-[0_24px_50px_-26px_rgba(139,92,246,0.45)] sm:p-7">
          <p className="mb-4 text-[16px] font-bold text-navy">
            Get a free call from our expert <span className="font-medium text-body">— tell us what you need</span>
          </p>
          <LeadForm cta="Get Free Call" />
        </div>
        <div className="mt-11 grid grid-cols-2 gap-y-7 lg:grid-cols-4">
          {STATS.map((t) => (
            <div key={t.small} className="flex items-center justify-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full text-royal" style={{ background: t.bg }}>
                <t.icon className={`h-5 w-5 ${t.fill ? "fill-current" : ""}`} />
              </span>
              <div>
                <p className="text-[21px] font-bold leading-tight text-navy">{t.big}</p>
                <p className="text-[15px] font-medium text-navy/80">{t.small}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── category circles ─────────────────────────

function RingCard({ slug, title, text, image }: { slug: string; title: string; text: string; image: string }) {
  const st = catStyle(slug);
  return (
    <Link to={`/services/${slug}`} className="group flex flex-col items-center text-center">
      <span className="relative block h-[150px] w-[150px] rounded-full p-[7px] transition duration-300 group-hover:-translate-y-1.5 sm:h-[232px] sm:w-[232px] sm:p-[10px]" style={{ background: st.ring }}>
        <span className="block h-full w-full rounded-full bg-page p-[4px] sm:p-[6px]">
          <img src={image} alt="" loading="lazy" className="h-full w-full rounded-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        </span>
        <span
          className="absolute bottom-[2px] right-[8px] grid h-10 w-10 place-items-center rounded-full border-[3px] border-white text-navy shadow-sm sm:bottom-[8px] sm:right-[18px] sm:h-[54px] sm:w-[54px] sm:border-4"
          style={{ background: st.badge }}
        >
          <st.icon className="h-5 w-5" />
        </span>
      </span>
      <h3 className="mt-4 text-[17px] leading-tight sm:text-[22px]">{title}</h3>
      <p className="mt-2 max-w-[245px] text-[13.5px] font-medium leading-snug sm:text-[15.5px]">{text}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-bold sm:px-4 sm:text-[14.5px] text-royal shadow-[0_8px_20px_-12px_rgba(139,92,246,0.5)] transition group-hover:gap-2.5">
        See services <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

function Categories() {
  const site = useSite();
  return (
    <section className="bg-page pb-20 pt-[88px]">
      <div className="container-x">
        <SectionHead eyebrow="Our Services" title="What Do You Need Help With?" text="Pick a category. Each one has a clear list of services." />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-11 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <RingCard key={c.slug} slug={c.slug} title={c.title} text={c.short} image={c.image} />
          ))}
          <a href={telHref(site.phone)} className="group flex flex-col items-center text-center">
            <span className="grid h-[150px] w-[150px] place-items-center rounded-full border-[3px] border-dashed border-royal text-royal transition group-hover:bg-white sm:mt-[58px] sm:h-[208px] sm:w-[208px]">
              <Headphones className="h-10 w-10 sm:h-14 sm:w-14" strokeWidth={2} />
            </span>
            <h3 className="mt-4 text-[17px] leading-tight sm:mt-[34px] sm:text-[22px]">Not sure?</h3>
            <p className="mt-2 text-[13.5px] font-medium sm:text-[15.5px]">Call us free · {site.phone}</p>
          </a>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── popular ─────────────────────────

const POP_STYLE: { color: string; icon: typeof FileText }[] = [
  { color: P.violet, icon: FileText },
  { color: P.orange, icon: FileText },
  { color: P.green, icon: FileText },
  { color: P.pink, icon: FileText },
  { color: P.blue, icon: PenTool },
  { color: P.yellow, icon: Dribbble },
  { color: P.cyan, icon: Instagram },
  { color: P.violet, icon: Bot },
];

function Popular() {
  return (
    <section className="bg-surface pb-20 pt-[88px]">
      <div className="container-x">
        <SectionHead eyebrow="Most Asked" title="Most Popular Services" text="These are what most of our customers start with." />
        <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR.map((p, idx) => {
            const st = POP_STYLE[idx % POP_STYLE.length];
            return (
              <Link
                key={p.name}
                to={serviceUrl(p.cat, p.name)}
                className="soft-card group flex items-start gap-4 p-5 transition lg:min-h-[141px] hover:-translate-y-1 hover:shadow-[0_24px_44px_-22px_rgba(139,92,246,0.5)]"
              >
                <IconDot color={st.color} icon={st.icon} size={48} iconSize={20} />
                <div>
                  <h3 className="text-[17px] font-semibold leading-[23px] tracking-[-0.005em]">{p.name}</h3>
                  <p className="mt-[3px] flex items-center gap-1.5 text-[14.5px] font-medium">
                    <Clock className="h-3.5 w-3.5" /> {p.days}
                  </p>
                  <span className="mt-[7px] inline-flex items-center gap-1.5 text-[14.5px] font-bold text-royal transition group-hover:gap-2.5">
                    Enquire <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── steps ─────────────────────────

const STEPS = [
  { icon: ClipboardList, title: "Tell Us What You Need", text: "Fill the form or call us. It takes 1 minute." },
  { icon: Upload, title: "Share Your Documents", text: "Send them on WhatsApp or email. No office visit." },
  { icon: BadgeCheck, title: "We Get It Done", text: "You get updates at every step until it's complete." },
];

function Process() {
  return (
    <section className="bg-page pb-[92px] pt-[88px]">
      <div className="container-x">
        <SectionHead eyebrow="How It Works" title="Simple 3-Step Process" text="No office visits. No confusing forms." />
        <div className="relative grid gap-10 md:grid-cols-3 md:gap-6">
          <span className="pointer-events-none absolute left-[20.5%] right-[20.5%] top-[43px] hidden border-t-2 border-dashed border-royal md:block" />
          {STEPS.map((s, idx) => (
            <div key={s.title} className="relative text-center">
              <span className="relative mx-auto grid h-[88px] w-[88px] place-items-center rounded-full bg-royal text-white ring-[14px] ring-page">
                <s.icon className="h-8 w-8" />
              </span>
              <p className="mt-5 text-[13px] font-bold uppercase tracking-[0.1em] text-brand">Step {idx + 1}</p>
              <h3 className="mt-1.5 text-[24px] leading-tight">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[330px] text-[16.5px] font-medium leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── trust + reviews ─────────────────────────

const WHY = [
  { icon: Sparkles, color: P.violet, title: "One place for everything", text: "Registration, branding, website and marketing — no running around." },
  { icon: IndianRupee, color: P.orange, title: "Clear pricing", text: "You know the full cost before we start. No hidden charges." },
  { icon: Smartphone, color: P.green, title: "Fully online", text: "Do everything from your phone, from anywhere in India." },
  { icon: Headphones, color: P.pink, title: "Real experts", text: "CA, CS and design experts guide you at every step." },
];

const REVIEWS = [
  { name: "Ravi K.", city: "Hyderabad", text: "My GST and company registration were done in a week. Very smooth, and they explained everything simply." },
  { name: "Priya S.", city: "Bengaluru", text: "They designed our logo and website together. Looks very professional and customers notice it." },
  { name: "Arjun M.", city: "Pune", text: "Our Instagram enquiries doubled in 2 months. The team posts on time every week." },
];

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-[#f59e0b]">
      {[0, 1, 2, 3, 4].map((k) => (
        <Star key={k} className={`${className} fill-current`} />
      ))}
    </span>
  );
}

function TrustAndReviews() {
  const site = useSite();
  return (
    <section className="bg-surface pb-20 pt-[88px]">
      <div className="container-x">
        <SectionHead eyebrow={`Why ${site.siteName}`} title="Why Businesses Trust Us" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.title} className="soft-card p-7 lg:min-h-[268px]">
              <IconDot color={w.color} icon={w.icon} size={56} iconSize={24} />
              <h3 className="mt-5 text-[21px] leading-[1.4]">{w.title}</h3>
              <p className="mt-2 text-[15.5px] font-medium leading-[23px]">{w.text}</p>
            </div>
          ))}
        </div>

        <div className="mb-7 mt-[66px] flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[28px] leading-tight">What Our Clients Say</h3>
          <span className="flex items-center gap-2 text-[15px] font-semibold text-navy">
            <Stars /> 4.8 on Google
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="soft-card p-6 pb-7">
              <Stars />
              <blockquote className="mt-3 text-[16.5px] font-medium leading-[1.58] text-navy">"{r.text}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-royal text-[15px] font-bold text-white">{r.name[0]}</span>
                <span>
                  <span className="block text-[16px] font-bold leading-tight text-navy">{r.name}</span>
                  <span className="block text-[13.5px] font-medium leading-tight">{r.city}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── FAQ ─────────────────────────

const FAQS = [
  { q: "Do I need to visit your office?", a: "No. Everything is done online. You can share documents on WhatsApp or email." },
  { q: "How long does GST registration take?", a: "Usually 3 to 7 working days, once we have all your documents." },
  { q: "Can you do registration and the website together?", a: "Yes. Many clients start with registration and logo, then add a website. We offer combo prices." },
  { q: "How do I pay?", a: "You can pay by UPI, debit/credit card or bank transfer. You get a proper GST invoice." },
  { q: "I'm not sure which registration I need. Can you help?", a: "Yes — that's what the free consultation is for. Our expert will suggest the right option for you." },
];

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((f, idx) => {
        const isOpen = open === idx;
        return (
          <div key={f.q} className="rounded-[28px] border border-line bg-white shadow-[0_14px_34px_-24px_rgba(139,92,246,0.45)]">
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className={`flex w-full items-center justify-between gap-4 px-6 text-left text-[17.5px] font-bold text-navy ${isOpen ? "pb-2.5 pt-5" : "py-5"}`}
              aria-expanded={isOpen}
            >
              {f.q}
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface text-royal">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="px-6 pb-[18px] text-[16.5px] font-medium">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Faq() {
  return (
    <section className="bg-page pt-[88px]">
      <div className="container-x">
        <SectionHead eyebrow="FAQ" title="Common Questions" />
        <div className="mx-auto max-w-[720px]">
          <FaqList items={FAQS} />
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── CTA ─────────────────────────

export function CtaBand() {
  const site = useSite();
  return (
    <section className="bg-page py-20">
      <div className="container-x">
        <div className="rounded-[40px] bg-surface px-6 pb-[65px] pt-[70px] text-center shadow-[0_24px_50px_-30px_rgba(139,92,246,0.5)] sm:px-12">
          <h2 className="text-[32px] leading-[1.25] sm:text-[46px]">Ready to Grow Your Business?</h2>
          <p className="mx-auto mt-[18px] max-w-lg text-[17.5px] font-medium">Talk to our expert today. The first consultation is free.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-brand h-[55px]">
              Get Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={waLink(site.whatsapp)} target="_blank" rel="noreferrer" className="btn-wa h-[55px]">
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <>
      <Hero />
      <EnquiryAndStats />
      <Categories />
      <Popular />
      <Process />
      <TrustAndReviews />
      <Faq />
      <CtaBand />
    </>
  );
}
