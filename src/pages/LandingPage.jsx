import { useState } from "react";
import { Link } from "react-router-dom";

const OFFICIAL_SITE = "https://hbcxconsulting.com/";

const navigation = [
  { label: "Overview", href: "#home" },
  { label: "About HBC", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Sectors", href: "#sectors" },
  { label: "Insights", href: "#insights" },
];

const capabilities = [
  {
    number: "01",
    title: "Strategic Consulting",
    description:
      "Strategic guidance to help organizations navigate change and make informed decisions.",
    tag: "STRATEGY",
  },
  {
    number: "02",
    title: "Digital Transformation",
    description:
      "Technology-led approaches to adapt, improve operations, and explore opportunities.",
    tag: "TECHNOLOGY",
  },
  {
    number: "03",
    title: "Sustainability",
    description:
      "Long-term thinking that considers environmental, social, and economic progress.",
    tag: "SUSTAINABILITY",
  },
  {
    number: "04",
    title: "International Development",
    description:
      "Development-focused expertise for organizations, communities, and inclusive growth.",
    tag: "DEVELOPMENT",
  },
];

const sectors = [
  {
    number: "01",
    title: "Social Sector",
    detail: "Development and social impact",
  },
  { number: "02", title: "Healthcare", detail: "Health-focused solutions" },
  { number: "03", title: "Technology", detail: "Digital innovation" },
  { number: "04", title: "Financial Services", detail: "Innovation and risk" },
  {
    number: "05",
    title: "Energy & Environment",
    detail: "Sustainability and climate",
  },
  {
    number: "06",
    title: "Consumer & Retail",
    detail: "Markets and customer experience",
  },
];

function Arrow({ diagonal = true }) {
  return (
    <span aria-hidden="true" className="ml-2 inline-block leading-none">
      {diagonal ? "↗" : "→"}
    </span>
  );
}

function Brand() {
  return (
    <Link
      to="/"
      className="group flex shrink-0 items-center gap-3"
      aria-label="Horizon Bridge Consulting home"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#B778F5]/60 bg-[#171020] text-[12px] font-black tracking-[-.08em] text-white shadow-[0_0_22px_rgba(168,85,247,.12)]">
        HBC
      </span>
      <span className="leading-none">
        <span className="block text-[12px] font-bold tracking-[.13em] text-[#F0EDF5] sm:text-[13px]">
          HORIZON BRIDGE
        </span>
        <span className="mt-1.5 block text-[9px] font-semibold tracking-[.24em] text-[#B5ADBF]">
          CONSULTING
        </span>
      </span>
    </Link>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#C99AF8] sm:text-[11px]">
      {children}
    </p>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#0B0A0F] text-[#E5E0EA] antialiased selection:bg-[#A855F7] selection:text-white">
      <header className="sticky top-0 z-50 border-b border-white/[.09] bg-[#0B0A0F]/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <Brand />
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navigation.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-lg px-3 py-2.5 text-[12px] font-semibold transition-colors hover:bg-white/[.045] hover:text-white ${index === 0 ? "text-[#F0EAF7]" : "text-[#B5ADBF]"}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Link
            to="/login"
            className="hidden items-center rounded-lg bg-[#A855F7] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#9333EA] focus:outline-none focus:ring-2 focus:ring-[#D8B4FE] focus:ring-offset-2 focus:ring-offset-[#0B0A0F] lg:inline-flex"
          >
            Staff sign in <Arrow />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 px-3 text-sm text-[#E5E0EA] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="hbc-mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="text-xl leading-none">
              {menuOpen ? "×" : "☰"}
            </span>
            <span>{menuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
        {menuOpen && (
          <nav
            id="hbc-mobile-nav"
            className="border-t border-white/10 bg-[#100D15] px-5 py-3 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex max-w-[1440px] flex-col gap-1 sm:px-3">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-sm text-[#C7C0D0] transition hover:bg-white/[.05] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/login"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center rounded-lg bg-[#A855F7] px-4 py-3 text-sm font-bold text-white"
              >
                Staff sign in <Arrow />
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Each navigation destination is designed as a compact, near-viewport section. */}
      <section
        id="home"
        className="relative isolate flex scroll-mt-[72px] items-center border-b border-white/[.08] lg:min-h-[calc(100svh-72px)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -right-32 -top-36 h-[28rem] w-[28rem] rounded-full bg-[#7E22CE]/15 blur-[110px]" />
          <div className="absolute bottom-0 left-[18%] h-56 w-56 rounded-full bg-[#A855F7]/[.07] blur-[90px]" />
          <div className="absolute inset-0 opacity-[.07] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        </div>
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.06fr_.94fr] lg:gap-12 lg:px-12 lg:py-12 xl:gap-16">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#A855F7]/35 bg-[#A855F7]/[.08] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#D4B3F6] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C084FC]" />
              Strategy · Technology · Development
            </div>
            <h1 className="max-w-3xl text-[2.65rem] font-semibold leading-[1.06] tracking-[-.06em] text-[#EAE6EF] sm:text-6xl lg:text-[4.25rem] xl:text-[4.8rem]">
              Diverse expertise.
              <br />
              <span className="bg-gradient-to-r from-[#E0C5FA] via-[#C084FC] to-[#AD69F1] bg-clip-text text-transparent">
                Meaningful impact.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#BDB5C7] sm:text-base sm:leading-7">
              Horizon Bridge Consulting works across strategy, technology, and
              development to help organizations address challenges and explore
              practical ways forward.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#capabilities"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#A855F7] px-5 py-3 text-sm font-bold text-white shadow-[0_6px_24px_rgba(168,85,247,.16)] transition hover:bg-[#9333EA] focus:outline-none focus:ring-2 focus:ring-[#D8B4FE]"
              >
                Explore capabilities <Arrow />
              </a>
              <a
                href="#about"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/20 bg-white/[.02] px-5 py-3 text-sm font-semibold text-[#E5E0EA] transition hover:border-[#A855F7]/60 hover:bg-[#A855F7]/[.06]"
              >
                Discover HBC <Arrow diagonal={false} />
              </a>
            </div>
            <div className="mt-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.15em] text-[#9E95AB]">
              <span className="h-px w-8 bg-[#B778F5]" />
              Strategic thinking · Practical delivery
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
            <div className="relative overflow-hidden rounded-[1.35rem] border border-white/[.12] bg-[#100D15] p-5 shadow-2xl shadow-black/30 sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-white/[.10] pb-4">
                <div>
                  <Eyebrow>HBC / At a glance</Eyebrow>
                  <h2 className="mt-2 text-xl font-semibold tracking-[-.035em] text-[#EAE6EF] sm:text-2xl">
                    Connecting the bigger picture.
                  </h2>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#A855F7]/35 bg-[#A855F7]/10 text-xl text-[#D4B3F6]">
                  ✳
                </span>
              </div>
              <div className="mt-4 space-y-2.5">
                {[
                  [
                    "A",
                    "Strategic insight",
                    "Clarify challenges and identify direction.",
                  ],
                  [
                    "B",
                    "Technology & innovation",
                    "Apply technology with purpose.",
                  ],
                  [
                    "C",
                    "Sustainable development",
                    "Keep long-term progress in view.",
                  ],
                ].map(([letter, title, description]) => (
                  <div
                    key={letter}
                    className="group flex items-center gap-3.5 rounded-xl border border-white/[.08] bg-white/[.02] p-3.5 transition hover:border-[#A855F7]/40 hover:bg-[#A855F7]/[.05] sm:p-4"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#A855F7]/15 text-xs font-black text-[#D4B3F6]">
                      {letter}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-[#E5E0EA]">
                        {title}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-[#AAA1B5]">
                        {description}
                      </p>
                    </div>
                    <span className="text-base text-[#C084FC]">↗</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/[.10] pt-3 text-[9px] font-semibold uppercase tracking-[.15em] text-[#9E95AB]">
                <span>Horizon Bridge Consulting</span>
                <span className="text-[#C99AF8]">HBC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="flex scroll-mt-[72px] items-center border-b border-white/[.08] bg-[#100D15] lg:min-h-[calc(100svh-72px)]"
      >
        <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-16 lg:px-12 lg:py-14">
          <div>
            <Eyebrow>01 / About HBC</Eyebrow>
            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-[1.12] tracking-[-.045em] text-[#EAE6EF] sm:text-4xl xl:text-5xl">
              A broader view.
              <br />
              <span className="text-[#AFA6BB]">A practical way forward.</span>
            </h2>
            <div className="mt-6 h-1 w-16 rounded-full bg-[#A855F7]" />
          </div>
          <div className="max-w-2xl lg:border-l lg:border-white/[.12] lg:pl-10">
            <p className="text-base leading-7 text-[#D0C9D8] sm:text-lg sm:leading-8">
              Horizon Bridge Consulting is a consulting firm working with
              organizations across industries to help them adapt, innovate, and
              grow.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#B5ADBF] sm:text-base">
              Its public-facing work brings together strategic thinking,
              technology, and practical execution to address organizational and
              development challenges.
            </p>
            <a
              href={`${OFFICIAL_SITE}company-overview/`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center text-sm font-bold text-[#D4B3F6] transition hover:text-white"
            >
              Read HBC’s company overview <Arrow />
            </a>
            <p className="mt-5 text-[11px] leading-5 text-[#8F869B]">
              Prototype content for demonstration; final wording should be
              confirmed against HBC’s current official materials.
            </p>
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="flex scroll-mt-[72px] items-center border-b border-white/[.08] bg-[#0B0A0F] lg:min-h-[calc(100svh-72px)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>02 / Capabilities</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-.045em] text-[#EAE6EF] sm:text-4xl">
                Expertise with a purpose.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#B5ADBF] sm:text-base">
              Explore key areas presented in this initial HBC website concept.
            </p>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((item) => (
              <article
                key={item.number}
                className="group relative flex min-h-[210px] flex-col overflow-hidden rounded-xl border border-white/[.10] bg-[#121019] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#A855F7]/50 sm:min-h-[230px] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[.15em] text-[#C99AF8]">
                    {item.number}
                  </span>
                  <span className="text-base text-[#AFA6BB] transition group-hover:text-[#D4B3F6]">
                    ↗
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-snug text-[#E5E0EA]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#B5ADBF]">
                  {item.description}
                </p>
                <span className="mt-4 border-t border-white/[.09] pt-3 text-[9px] font-bold tracking-[.18em] text-[#C99AF8]">
                  {item.tag}
                </span>
              </article>
            ))}
          </div>
          <div className="mt-5 flex justify-start sm:justify-end">
            <a
              href={`${OFFICIAL_SITE}services/`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-sm font-bold text-[#D4B3F6] transition hover:text-white"
            >
              View services on HBC’s website <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section
        id="sectors"
        className="flex scroll-mt-[72px] items-center border-b border-white/[.08] bg-[#100D15] lg:min-h-[calc(100svh-72px)]"
      >
        <div className="mx-auto grid w-full max-w-[1440px] gap-7 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-12 lg:px-12 lg:py-14">
          <div>
            <Eyebrow>03 / Sectors</Eyebrow>
            <h2 className="mt-3 max-w-sm text-3xl font-semibold leading-tight tracking-[-.045em] text-[#EAE6EF] sm:text-4xl">
              Different sectors.
              <br />
              <span className="text-[#AFA6BB]">Connected challenges.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#B5ADBF] sm:text-base">
              This concept groups example industry areas for easy exploration.
              Please verify the final sector list against HBC’s current official
              website before publication.
            </p>
            <a
              href={`${OFFICIAL_SITE}#industries`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center text-sm font-bold text-[#D4B3F6] transition hover:text-white"
            >
              Explore HBC’s website <Arrow />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {sectors.map((sector) => (
              <a
                key={sector.number}
                href={`${OFFICIAL_SITE}#industries`}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-[82px] items-center gap-3.5 rounded-xl border border-white/[.09] bg-[#121019] p-4 transition hover:border-[#A855F7]/45 hover:bg-[#17121F]"
              >
                <span className="text-[10px] font-bold tracking-[.12em] text-[#C99AF8]">
                  {sector.number}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[#E5E0EA]">
                    {sector.title}
                  </span>
                  <span className="mt-1 block text-xs text-[#AFA6BB]">
                    {sector.detail}
                  </span>
                </span>
                <span className="text-[#AFA6BB] transition group-hover:text-[#D4B3F6]">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="insights"
        className="flex scroll-mt-[72px] items-center border-b border-white/[.08] bg-[#0B0A0F] lg:min-h-[calc(100svh-72px)]"
      >
        <div className="mx-auto grid w-full max-w-[1240px] gap-7 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-12 lg:py-14">
          <div>
            <Eyebrow>04 / Insights</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-[-.045em] text-[#EAE6EF] sm:text-4xl xl:text-5xl">
              Ideas grounded in real-world challenges.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#B5ADBF] sm:text-base">
              Visit HBC’s official website to explore the organization’s
              published perspectives and updates. This sample does not invent
              individual articles or research titles.
            </p>
          </div>
          <a
            href={OFFICIAL_SITE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#A855F7]/50 px-5 py-3 text-sm font-bold text-[#D4B3F6] transition hover:bg-[#A855F7]/10 hover:text-white"
          >
            Visit official HBC website <Arrow />
          </a>
        </div>
      </section>

      <section
        id="staff-access"
        className="flex scroll-mt-[72px] items-center bg-[#100D15] lg:min-h-[calc(100svh-72px)]"
      >
        <div className="mx-auto w-full max-w-[1240px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="relative overflow-hidden rounded-2xl border border-[#A855F7]/35 bg-[#171020] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-[#A855F7]/10 blur-[70px]"
            />
            <div className="relative max-w-2xl">
              <Eyebrow>Internal workspace</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-.035em] text-[#EAE6EF] sm:text-3xl">
                HBC team access
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#B5ADBF] sm:text-base">
                Open the staff sign-in page for this project prototype. The
                sign-in experience is separate from HBC’s public website.
              </p>
            </div>
            <Link
              to="/login"
              className="relative mt-5 inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-[#A855F7] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#9333EA] focus:outline-none focus:ring-2 focus:ring-[#D8B4FE] lg:mt-0"
            >
              Staff sign in <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[.08] bg-[#09080C]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <Brand />
          <nav
            className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#B5ADBF]"
            aria-label="Footer navigation"
          >
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-[#D4B3F6]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={OFFICIAL_SITE}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#D4B3F6]"
            >
              Official website
            </a>
            <Link to="/login" className="transition hover:text-[#D4B3F6]">
              Staff sign in
            </Link>
          </nav>
          <p className="text-xs text-[#9E95AB]">
            HBC · Horizon Bridge Consulting
          </p>
        </div>
      </footer>
    </main>
  );
}
