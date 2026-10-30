import { useEffect } from "react";
import { useSearch } from "wouter";
import { useContent } from "../queries/content";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { waLink } from "../lib/site";
import { telHref, useSite } from "../queries/site";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";

const TONES = ["#c4b5fd", "#fdba74", "#86efac", "#f9a8d4", "#93c5fd", "#fde68a", "#a5f3fc"];

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const site = useSite();
  const wa = useContent().whatsapp;
  const preset = new URLSearchParams(useSearch()).get("service") ?? "";
  const items: { icon: typeof Phone; label: string; value: string; href?: string }[] = [
    { icon: Phone, label: "Call us", value: site.phone, href: telHref(site.phone) },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Clock, label: "Working hours", value: site.hours },
    ...site.phones.map((p) => ({ icon: Phone, label: p.label || "Phone", value: p.number, href: telHref(p.number) })),
    ...site.emails.map((m) => ({ icon: Mail, label: m.label || "Email", value: m.email, href: `mailto:${m.email}` })),
    ...(site.addresses.length
      ? site.addresses.map((a) => ({ icon: MapPin, label: a.label || "Office", value: a.line, href: a.mapUrl || undefined }))
      : [{ icon: MapPin, label: "Office", value: site.city, href: undefined }]),
  ];
  const socials = (
    [
      ["facebook", Facebook],
      ["instagram", Instagram],
      ["linkedin", Linkedin],
      ["youtube", Youtube],
    ] as const
  ).filter(([k]) => site.socials[k]);
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f3eafd_0%,#f7ecf5_50%,#fdf0e8_100%)] py-14 sm:py-20">
      <span className="float-slow pointer-events-none absolute -left-16 bottom-24 -z-10 hidden h-40 w-40 rounded-full bg-[#f9e9be] md:block" />
      <span className="pointer-events-none absolute -bottom-16 right-[8%] -z-10 hidden h-56 w-56 rounded-full bg-[#e1d5f8] md:block" />
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f9dcd8] px-4 py-1.5 text-[13.5px] font-semibold text-brand"><span className="h-2 w-2 rounded-full bg-brand" /> Contact Us</span>
          <h1 className="mt-5 text-[40px] leading-[1.1] sm:text-[54px]">Let's Talk About Your Business</h1>
          <p className="mt-5 max-w-md text-[18px] font-medium">Fill the form and our expert will call you within 30 minutes. The first consultation is free.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {items.map((it, i) => {
              const inner = (
                <>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-navy" style={{ background: TONES[i % TONES.length] }}><it.icon className="h-5 w-5" /></span>
                  <span>
                    <span className="block text-[13.5px] font-semibold">{it.label}</span>
                    <span className="block whitespace-pre-line font-bold text-navy">{it.value}</span>
                  </span>
                </>
              );
              return it.href ? (
                <a key={it.label + it.value} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="soft-card flex items-center gap-3 p-4 transition hover:-translate-y-0.5">{inner}</a>
              ) : (
                <div key={it.label + it.value} className="soft-card flex items-center gap-3 p-4">{inner}</div>
              );
            })}
          </div>
          <a href={waLink(site.whatsapp, site.bot.whatsappMessage)} target="_blank" rel="noreferrer" className="btn-wa mt-7">
            <WaIcon /> Chat on WhatsApp
          </a>
          {wa.secondNumber && (
            <a href={waLink(wa.secondNumber, site.bot.whatsappMessage)} target="_blank" rel="noreferrer" className="btn-wa mt-7 ml-3">
              <WaIcon /> WhatsApp {wa.secondLabel || "us"}
            </a>
          )}
          {socials.length > 0 && (
            <div className="mt-6 flex gap-2">
              {socials.map(([k, Icon]) => (
                <a key={k} href={site.socials[k]} target="_blank" rel="noreferrer" aria-label={k} className="grid h-11 w-11 place-items-center rounded-full bg-white text-royal shadow-sm hover:bg-royal hover:text-white">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="soft-card p-6 sm:p-8">
          <h2 className="text-[28px]">Request a Free Call</h2>
          <p className="mt-1.5 text-[15px] font-medium">Takes less than a minute.</p>
          <div className="mt-6">
            <LeadForm layout="stack" source="contact" cta="Get Free Consultation" withEmail withMessage defaultService={preset} />
          </div>
        </div>
      </div>
    </section>
  );
}
