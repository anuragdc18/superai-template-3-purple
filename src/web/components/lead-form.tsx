import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { CATEGORIES } from "../lib/site";
import { useCreateLead } from "../queries/leads";
import { useContent } from "../queries/content";

type Props = {
  layout?: "row" | "stack";
  source?: string;
  defaultService?: string;
  cta?: string;
  withEmail?: boolean;
  withMessage?: boolean;
};

export function LeadForm({
  layout = "row",
  source = "home",
  defaultService = "",
  cta = "Call Me Back",
  withEmail = false,
  withMessage = false,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(defaultService);
  const packages = useContent().packages;
  const known = (s: string) =>
    s === "Not sure / Other" || CATEGORIES.some((c) => c.services.some((x) => x.name === s)) || packages.some((p) => `${p.name} package` === s);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const create = useCreateLead();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const digits = phone.replace(/\D/g, "").slice(-10);
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[6-9]\d{9}$/.test(digits)) return setError("Please enter a valid 10-digit mobile number.");
    if (!service) return setError("Please select a service.");
    create.mutate(
      { name, phone: digits, email, service, message, source },
      { onError: () => setError("Something went wrong. Please call or WhatsApp us.") },
    );
  };

  if (create.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-wa/15"><CheckCircle2 className="h-8 w-8 text-wa" /></span>
        <p className="text-lg font-semibold text-navy">Thank you, {name.split(" ")[0]}!</p>
        <p className="text-[15px]">Our expert will call you on +91 {phone.replace(/\D/g, "").slice(-10)} within 30 minutes.</p>
      </div>
    );
  }

  const row = layout === "row";
  return (
    <form onSubmit={submit} noValidate>
      <div className={row ? "grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]" : "grid gap-3"}>
        <input aria-label="Your name" className="field" placeholder="Your name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input
          aria-label="Mobile number"
          className="field"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={10}
          placeholder="10-digit mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
        />
        {withEmail && (
          <input aria-label="Email" className="field" type="email" placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} />
        )}
        <label className="relative">
          <span className="sr-only">Service</span>
          <select
            aria-label="Select service"
            className={`field appearance-none !pr-11 ${service ? "" : "!text-[#5d5275]"}`}
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">What do you need?</option>
            {CATEGORIES.map((c) => (
              <optgroup key={c.slug} label={c.title}>
                {c.services.filter((s) => c.menuItems.includes(s.name) || s.name === service).map((s) => (
                  <option key={s.name} value={s.name} className="text-navy">
                    {s.name}
                  </option>
                ))}
              </optgroup>
            ))}
            {packages.length > 0 && (
              <optgroup label="Packages">
                {packages.map((p) => (
                  <option key={p.id} value={`${p.name} package`} className="text-navy">
                    {p.name} package
                  </option>
                ))}
              </optgroup>
            )}
            {service && !known(service) && (
              <option value={service} className="text-navy">
                {service}
              </option>
            )}
            <option value="Not sure / Other" className="text-navy">
              Not sure / Other
            </option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy" />
        </label>
        {withMessage && (
          <textarea
            aria-label="Message"
            className="field !h-28 py-3.5"
            placeholder="Tell us a little about your business (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        )}
        <button type="submit" disabled={create.isPending} className="btn-brand h-[55px] whitespace-nowrap">
          {create.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {create.isPending ? "Sending..." : cta}
          {!create.isPending && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
      {(error || !row) && (
        <p className={`mt-3 text-[13.5px] font-medium ${error ? "text-red-600" : "text-body"} ${row ? "text-center md:text-left" : ""}`}>
          {error ?? "Free call. No spam. We reply within 30 minutes."}
        </p>
      )}
    </form>
  );
}
