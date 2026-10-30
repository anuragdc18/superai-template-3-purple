import { useEffect } from "react";
import { Link, useLocation, useParams } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Headphones,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { findService, serviceUrl, slugify, waLink } from "../lib/site";
import { PackageCards, usePackagesFor } from "../components/content-ui";
import { useContent } from "../queries/content";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";
import { telHref, useSite } from "../queries/site";
import { CtaBand, FaqList } from "./index";
import { IconDot, P, catStyle } from "../components/pastel";

const STEPS = [
  { title: "Free Call", text: "Tell us what you need. We explain everything simply." },
  { title: "Share Details", text: "Send documents or details on WhatsApp. No office visit." },
  { title: "We Do the Work", text: "Our expert handles it and updates you on every step." },
  { title: "Done", text: "You get the final certificate / files on WhatsApp and email." },
];

function Block({ icon, title, tone = P.violet, children }: { icon: typeof Users; title: string; tone?: string; children: React.ReactNode }) {
  return (
    <section className="soft-card p-6 sm:p-7">
      <h2 className="flex items-center gap-3 text-[23px]">
        <IconDot color={tone} icon={icon} size={44} iconSize={19} />
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Ticks({ items, cols = false }: { items: string[]; cols?: boolean }) {
  return (
    <ul className={`grid gap-3 ${cols ? "sm:grid-cols-2" : ""}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-[16px] font-medium text-navy">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function ServicePage() {
  const { cat: catSlug, service: serviceSlug } = useParams<{ cat: string; service: string }>();
  const { cat, service } = findService(catSlug, serviceSlug);
  const site = useSite();
  const waMsg = useContent().whatsapp;
  const pkgs = usePackagesFor(catSlug, service?.name);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [catSlug, serviceSlug]);

  const edits = useContent().services;
  const [, navigate] = useLocation();
  const moved = !service ? edits.find((e) => e.cat === catSlug && e.original && slugify(e.original) === serviceSlug && !e.hidden && e.name !== e.original) : undefined;
  useEffect(() => {
    if (moved) navigate(serviceUrl(moved.cat, moved.name), { replace: true });
  }, [moved, navigate]);

  if (!cat || !service) {
    return (
      <div className="container-x py-32 text-center">
        <h1 className="text-[36px]">Service not found</h1>
        <Link to={cat ? `/services/${cat.slug}` : "/"} className="btn-brand mt-6">
          {cat ? `See all ${cat.title}` : "Go Home"}
        </Link>
      </div>
    );
  }

  const who = service.who ?? cat.who;
  const includes = service.includes ?? cat.includes;
  const docs = service.docs ?? cat.docs;
  const related = cat.services.filter((s) => s.name !== service.name).slice(0, 4);
  const isCert = cat.slug === "microsoft-certifications";
  const tone = catStyle(cat.slug);
  const faqs = [
    ...(isCert ? [] : [{
      q: `How long does ${service.name} take?`,
      a: service.days
        ? `Usually ${service.days}. We tell you the exact timeline on the free call.`
        : "It depends on your needs. We give you a clear timeline on the free call.",
    }]),
    { q: "How much does it cost?", a: "The price depends on your needs. Our expert shares a clear price on the free call — no hidden charges." },
    { q: "Do I need to visit your office?", a: "No. Everything is done online — on phone and WhatsApp — from anywhere in India." },
    { q: "Will you help after the work is done?", a: "Yes. You can call or WhatsApp us any time if you have questions later." },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f3eafd_0%,#f7ecf5_55%,#fdf0e8_100%)]">
        <span className="float-slow pointer-events-none absolute right-[6%] top-10 -z-10 hidden h-48 w-48 rounded-full bg-[#e1d5f8] md:block" />
        <span className="pointer-events-none absolute -bottom-12 left-[44%] -z-10 hidden h-24 w-24 rounded-full bg-[#f9e9be] md:block" />
        <div className="container-x grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-lg:text-center">
            <nav className="flex flex-wrap items-center gap-1.5 text-[14px] font-semibold text-body max-lg:justify-center">
              <Link to="/" className="hover:text-royal">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to={`/services/${cat.slug}`} className="hover:text-royal">{cat.title}</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-royal">{service.name}</span>
            </nav>
            <h1 className="rise mt-5 text-[38px] leading-[1.1] sm:text-[54px]">{service.name}</h1>
            <p className="rise mt-5 max-w-xl text-[18px] font-medium leading-relaxed max-lg:mx-auto" style={{ animationDelay: "100ms" }}>
              {service.text}
            </p>
            <div className="rise mt-6 flex flex-wrap gap-2.5 text-[14px] font-bold text-navy max-lg:justify-center" style={{ animationDelay: "160ms" }}>
              {service.days && (
                <span className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 shadow-[0_10px_24px_-16px_rgba(139,92,246,0.6)]">
                  <IconDot color={P.violet} icon={Clock} size={28} iconSize={14} /> {service.days}
                </span>
              )}
              <span className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 shadow-[0_10px_24px_-16px_rgba(139,92,246,0.6)]">
                <IconDot color={P.green} icon={ShieldCheck} size={28} iconSize={14} /> 100% online
              </span>
              <span className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 shadow-[0_10px_24px_-16px_rgba(139,92,246,0.6)]">
                <IconDot color={P.pink} icon={Headphones} size={28} iconSize={14} /> Free expert call
              </span>
            </div>
            <div className="rise mt-8 flex flex-wrap gap-3 max-lg:justify-center lg:hidden" style={{ animationDelay: "220ms" }}>
              <a href="#get-started" className="btn-brand">Get Free Consultation <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="hidden justify-center lg:flex">
            <span className="relative block h-[320px] w-[320px] rounded-full p-[12px]" style={{ background: tone.ring }}>
              <span className="block h-full w-full rounded-full bg-white p-[7px]">
                <img src={cat.image} alt="" className="h-full w-full rounded-full object-cover" />
              </span>
              <span className="absolute bottom-3 right-7 grid h-16 w-16 place-items-center rounded-full border-4 border-white text-navy" style={{ background: tone.badge }}>
                <tone.icon className="h-6 w-6" />
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="bg-page py-14 sm:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-6">
            <Block icon={Users} title="Who Is This For?">
              <Ticks items={who} />
            </Block>

            <Block icon={BadgeCheck} title="What You Get" tone={P.green}>
              <Ticks items={includes} cols />
            </Block>

            {docs && docs.length > 0 && (
              <Block icon={FileText} title="Documents Needed" tone={P.orange}>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {docs.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 rounded-2xl bg-page px-4 py-3 text-[15px] font-medium text-navy ring-1 ring-line">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-royal" /> {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[14.5px] font-medium">Not sure about a document? Don't worry — we'll guide you on the call.</p>
              </Block>
            )}

            <Block icon={Clock} title="How It Works" tone={P.pink}>
              <ol className="grid gap-4 sm:grid-cols-2">
                {STEPS.map((st, i) => (
                  <li key={st.title} className="flex gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-royal text-[15px] font-bold text-white">{i + 1}</span>
                    <span>
                      <span className="block text-[16px] font-bold text-navy">{st.title}</span>
                      <span className="block text-[15px] font-medium leading-relaxed">{st.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Block>

            {pkgs.length > 0 && (
              <div>
                <h2 className="mb-5 text-[26px]">Packages & Pricing</h2>
                <PackageCards packages={pkgs} compact />
              </div>
            )}

            <div>
              <h2 className="mb-5 text-[26px]">Common Questions</h2>
              <FaqList items={faqs} />
            </div>

            {related.length > 0 && (
              <div>
                <h2 className="mb-5 text-[26px]">Related Services</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.name}
                      to={serviceUrl(cat.slug, r.name)}
                      className="soft-card group flex items-center justify-between gap-3 px-5 py-4 hover:-translate-y-0.5"
                    >
                      <span>
                        <span className="block font-bold text-navy">{r.name}</span>
                        {r.days && <span className="block text-[13.5px] font-medium">{r.days}</span>}
                      </span>
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-surface text-royal transition group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside id="get-started" className="scroll-mt-40 space-y-4 lg:sticky lg:top-40">
            <div className="soft-card overflow-hidden">
              <div className="bg-surface px-6 py-5">
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-brand">Get Started</p>
                <h3 className="mt-1 text-[22px]">Talk to an Expert — Free</h3>
                <p className="mt-1 text-[14.5px] font-medium">We'll call you back within 30 minutes.</p>
              </div>
              <div className="p-6">
                <LeadForm key={service.name} layout="stack" source={`service:${serviceSlug}`} defaultService={service.name} cta="Get Free Call" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a href={telHref(site.phone)} className="flex items-center justify-center gap-2 rounded-full bg-white py-3.5 font-bold text-royal ring-2 ring-royal hover:bg-royal hover:text-white">
                <Phone className="h-4 w-4" /> Call Us
              </a>
              <a
                href={waLink(site.whatsapp, waMsg.serviceMessages[service.name] || waMsg.serviceMessage.replace("{service}", service.name))}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-wa py-3.5 font-bold text-white hover:brightness-95"
              >
                <WaIcon /> WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
