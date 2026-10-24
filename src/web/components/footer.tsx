import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { CATEGORIES, serviceUrl } from "../lib/site";
import { telHref, useSite } from "../queries/site";
import { Logo } from "./header";

export function Footer() {
  const site = useSite();
  const reg = CATEGORIES[0];
  const brandDesign = [CATEGORIES[1], CATEGORIES[2]];
  const digital = [CATEGORIES[3], CATEGORIES[4], CATEGORIES[5], CATEGORIES[6]];
  return (
    <footer className="bg-surface text-body">
      <div className="container-x grid gap-10 pb-16 pt-16 md:grid-cols-2 lg:grid-cols-[366px_292px_291px_1fr] lg:gap-0">
        <div>
          <Logo />
          <p className="mt-5 max-w-[290px] text-[16px] font-medium leading-relaxed">
            {site.tagline}
          </p>
          <div className="mt-[18px] space-y-[7px] text-[16px] font-medium">
            <a href={telHref(site.phone)} className="flex items-center gap-2 hover:text-royal"><Phone className="h-4 w-4 text-body" /> {site.phone}</a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-royal"><Mail className="h-4 w-4 text-body" /> {site.email}</a>
            {site.addresses.length ? (
              site.addresses.map((a, i) => (
                <p key={i} className="flex items-start gap-2"><MapPin className="mt-1 h-4 w-4 shrink-0 text-body" /> <span className="whitespace-pre-line">{a.line}</span></p>
              ))
            ) : (
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-body" /> {site.city}</p>
            )}
          </div>
          <div className={`flex gap-2 ${Object.values(site.socials).some(Boolean) ? "mt-5" : "hidden"}`}>
            {(
              [
                ["facebook", Facebook],
                ["instagram", Instagram],
                ["linkedin", Linkedin],
                ["youtube", Youtube],
              ] as const
            )
              .filter(([k]) => site.socials[k])
              .map(([k, Icon]) => (
                <a key={k} href={site.socials[k]} target="_blank" rel="noreferrer" aria-label={k} className="grid h-10 w-10 place-items-center rounded-full bg-white text-royal shadow-sm hover:bg-royal hover:text-royal">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3.5 text-[17px] font-bold">Registration</h4>
          <ul className="space-y-2 text-[16px] font-medium">
            {reg.menuItems.slice(0, 6).map((m) => (
              <li key={m}><Link to={serviceUrl("registration", m)} className="hover:text-royal">{m}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3.5 text-[17px] font-bold">Branding & Design</h4>
          <ul className="space-y-2 text-[16px] font-medium">
            {brandDesign.flatMap((c) => c.menuItems.slice(0, 3).map((m) => (
              <li key={c.slug + m}><Link to={serviceUrl(c.slug, m)} className="hover:text-royal">{m}</Link></li>
            )))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3.5 text-[17px] font-bold">Digital</h4>
          <ul className="space-y-2 text-[16px] font-medium">
            {digital.map((c) => (
              <li key={c.slug}><Link to={`/services/${c.slug}`} className="hover:text-royal">{c.title}</Link></li>
            ))}
            <li><Link to="/contact" className="hover:text-royal">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#e3d6f7]">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-[14px] font-medium sm:flex-row">
          <p>© {new Date().getFullYear()} {site.siteName}. All rights reserved.</p>
          <p>Serving businesses across India</p>
        </div>
      </div>
    </footer>
  );
}

