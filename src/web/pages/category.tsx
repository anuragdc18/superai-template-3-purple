import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowRight, Clock, ChevronRight } from "lucide-react";
import { CATEGORIES, serviceUrl, slugify } from "../lib/site";
import { LeadForm } from "../components/lead-form";
import { CtaBand } from "./index";
import { IconDot, P, catStyle } from "../components/pastel";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const cat = CATEGORIES.find((c) => c.slug === slug);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
        el.classList.add("ring-2", "ring-royal");
        setTimeout(() => el.classList.remove("ring-2", "ring-royal"), 2200);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [slug]);

  if (!cat) {
    return (
      <div className="container-x py-32 text-center">
        <h1 className="text-[36px]">Page not found</h1>
        <Link to="/" className="btn-brand mt-6">Go Home</Link>
      </div>
    );
  }

  const st = catStyle(cat.slug);
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f3eafd_0%,#f7ecf5_55%,#fdf0e8_100%)]">
        <span className="float-slow pointer-events-none absolute -left-24 bottom-6 -z-10 hidden h-40 w-40 rounded-full bg-[#f9e9be] xl:block" />
        <span className="pointer-events-none absolute -bottom-10 right-[38%] -z-10 hidden h-24 w-24 rounded-full bg-[#f8cee0] md:block" />
        <div className="container-x grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr]">
          <div className="max-lg:text-center">
            <nav className="flex items-center gap-1.5 text-[14px] font-semibold text-body max-lg:justify-center">
              <Link to="/" className="hover:text-royal">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-royal">{cat.title}</span>
            </nav>
            <h1 className="rise mt-5 text-[40px] leading-[1.1] sm:text-[56px]">{cat.title}</h1>
            <p className="rise mt-5 max-w-xl text-[18px] font-medium leading-relaxed max-lg:mx-auto" style={{ animationDelay: "100ms" }}>{cat.intro}</p>
            <div className="rise mt-8 flex flex-wrap gap-3 max-lg:justify-center" style={{ animationDelay: "180ms" }}>
              <a href="#enquire" className="btn-brand h-[55px]">
                Get Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <span className="inline-flex h-[55px] items-center rounded-full bg-white/70 px-6 text-[15px] font-bold text-navy">
                {cat.services.length} {cat.slug === "microsoft-certifications" ? "exams" : "services"} · 100% online
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <span className="relative block h-[300px] w-[300px] rounded-full p-[12px] sm:h-[360px] sm:w-[360px]" style={{ background: st.ring }}>
              <span className="block h-full w-full rounded-full bg-white p-[7px]">
                <img src={cat.image} alt="" className="h-full w-full rounded-full object-cover" />
              </span>
              <span className="absolute bottom-4 right-8 grid h-16 w-16 place-items-center rounded-full border-4 border-white text-navy" style={{ background: st.badge }}>
                <st.icon className="h-6 w-6" />
              </span>
            </span>
          </div>
        </div>
      </section>

      <div className="border-b border-line bg-white">
        <div className="container-x flex gap-2.5 overflow-x-auto py-4">
          {CATEGORIES.map((c) => {
            const cs = catStyle(c.slug);
            const active = c.slug === cat.slug;
            return (
              <Link
                key={c.slug}
                to={`/services/${c.slug}`}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-4 text-[14.5px] font-bold transition ${
                  active ? "bg-royal text-white" : "bg-page text-navy ring-1 ring-line hover:ring-royal/40"
                }`}
              >
                <IconDot color={cs.pill} icon={cs.icon} size={30} iconSize={14} />
                {c.title}
              </Link>
            );
          })}
        </div>
      </div>

      <section className="bg-page py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow">{cat.slug === "microsoft-certifications" ? "Exams" : "Services"}</p>
            <h2 className="text-[30px] leading-tight sm:text-[38px]">{cat.slug === "microsoft-certifications" ? "All Microsoft Certifications" : `All ${cat.title} Services`}</h2>
            <p className="mt-3 text-[16.5px] font-medium">{cat.slug === "microsoft-certifications" ? 'Tap "Learn more" to see who it is for and what you get.' : 'Tap "Learn more" to see details, documents and time taken.'}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cat.services.map((s, i) => {
                const tone = [P.violet, P.orange, P.green, P.pink, P.blue, P.yellow, P.cyan][i % 7];
                return (
                  <div key={s.name} id={slugify(s.name)} className="soft-card flex scroll-mt-40 flex-col p-5 transition hover:-translate-y-0.5">
                    <div className="flex items-start gap-3.5">
                      <IconDot color={tone} icon={st.icon} size={44} iconSize={18} />
                      <div>
                        <h3 className="text-[17px] font-bold leading-snug">{s.name}</h3>
                        <p className="mt-1.5 text-[15px] font-medium leading-relaxed">{s.text}</p>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pl-[58px] pt-4">
                      <Link to={serviceUrl(cat.slug, s.name)} className="inline-flex items-center gap-1.5 whitespace-nowrap text-[14.5px] font-bold text-royal hover:gap-2.5">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </Link>
                      {s.days ? (
                        <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-surface px-2.5 py-1 text-[12.5px] font-semibold text-body">
                          <Clock className="h-3.5 w-3.5" /> {s.days}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <aside id="enquire" className="soft-card scroll-mt-40 p-6 sm:p-7 lg:sticky lg:top-40">
            <h3 className="text-[24px]">Get a Free Call</h3>
            <p className="mt-1.5 text-[15px] font-medium">Our expert will call you and explain everything.</p>
            <div className="mt-5">
              <LeadForm layout="stack" source={`category:${cat.slug}`} defaultService={cat.services[0].name} cta="Get Free Call" />
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
