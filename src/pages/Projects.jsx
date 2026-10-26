import { useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import { tracks } from "../data/demoData.js";

const examples = [
  {
    track: tracks[0],
    title: "Community Learning Website",
    student: "Amina Ahmadi",
    desc: "A responsive programme website that organises learning resources, community updates and key information in a clear, mobile-friendly experience.",
    tag: "Web design",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1000&q=85",
    color: "violet",
  },
  {
    track: tracks[0],
    title: "Student Portfolio",
    student: "Samiullah Azizi",
    desc: "A personal portfolio presenting selected coding exercises, project outcomes and professional contact information in one place.",
    tag: "Portfolio",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85",
    color: "blue",
  },
  {
    track: tracks[0],
    title: "Local Event Website",
    student: "Shabnam Etemadi",
    desc: "An accessible event page with a clear schedule, registration guidance and responsive sections for mobile and desktop visitors.",
    tag: "Frontend",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=85",
    color: "cyan",
  },
  {
    track: tracks[1],
    title: "Local Business Content Plan",
    student: "Farid Rahimi",
    desc: "A four-week content plan with audience themes, publishing cadence and practical ideas tailored to a small local business.",
    tag: "Content strategy",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85",
    color: "pink",
  },
  {
    track: tracks[1],
    title: "Social Media Campaign",
    student: "Marwa Safi",
    desc: "A sample campaign framework covering audience segments, creative direction, weekly messages and simple engagement measures.",
    tag: "Campaign",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=85",
    color: "orange",
  },
  {
    track: tracks[1],
    title: "Email Marketing Plan",
    student: "Wahid Sultani",
    desc: "A concise email sequence designed to introduce a service, answer common questions and guide readers toward a clear next step.",
    tag: "Marketing",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
    color: "violet",
  },
  {
    track: tracks[2],
    title: "Handmade Products Store",
    student: "Laila Mohammadi",
    desc: "An online shop concept with organised product categories, useful descriptions and a straightforward path from browsing to enquiry.",
    tag: "Online store",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85",
    color: "green",
  },
  {
    track: tracks[2],
    title: "Freelance Service Catalogue",
    student: "Jawad Hashimi",
    desc: "A service catalogue that defines deliverables, expected turnaround, working steps and the information needed to begin a client project.",
    tag: "Freelancing",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85",
    color: "blue",
  },
  {
    track: tracks[2],
    title: "Product Listing Kit",
    student: "Roya Ferozi",
    desc: "A consistent set of product listings with clear benefits, category labels and image guidance for a small online seller.",
    tag: "E-commerce",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=85",
    color: "orange",
  },
  {
    track: tracks[3],
    title: "Small Business Budget Book",
    student: "Omid Karimi",
    desc: "A bookkeeping workbook concept for recording income and expenses, reviewing monthly totals and keeping routine records organised.",
    tag: "Bookkeeping",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=85",
    color: "green",
  },
  {
    track: tracks[3],
    title: "Sales Analysis Dashboard",
    student: "Nadia Yousufi",
    desc: "A compact reporting dashboard that turns sales records into readable totals, category comparisons and practical observations.",
    tag: "Data analysis",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85",
    color: "cyan",
  },
  {
    track: tracks[3],
    title: "Expense Tracker",
    student: "Nasir Qasimi",
    desc: "A structured expense log with categories, dates and monthly summaries to support routine financial review and better record keeping.",
    tag: "Spreadsheets",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
    color: "violet",
  },
  {
    track: tracks[4],
    title: "AI Study Planner",
    student: "Zahra Noori",
    desc: "A study-planning prototype that organises tasks, suggests session outlines and demonstrates thoughtful use of AI for learning support.",
    tag: "AI tools",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=85",
    color: "pink",
  },
  {
    track: tracks[4],
    title: "FAQ Assistant Demo",
    student: "Bilal Nawabi",
    desc: "A demonstration assistant that groups common service questions and provides concise, consistent answers for routine enquiries.",
    tag: "Digital services",
    image:
      "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1000&q=85",
    color: "blue",
  },
  {
    track: tracks[4],
    title: "AI Productivity Toolkit",
    student: "Mursal Latif",
    desc: "A practical workflow collection showing how AI can support first drafts, summaries and task planning with human review.",
    tag: "Productivity",
    image:
      "https://images.unsplash.com/photo-1675557009875-436f8e4e6f5c?auto=format&fit=crop&w=1000&q=85",
    color: "orange",
  },
];

const tones = {
  violet: "from-[#17102f] to-[#35106d]",
  blue: "from-[#111b3d] to-[#252b68]",
  cyan: "from-[#102c3a] to-[#164e63]",
  pink: "from-[#35102f] to-[#701a57]",
  orange: "from-[#382014] to-[#71351d]",
  green: "from-[#102d2b] to-[#145448]",
};

export default function Projects() {
  const [track, setTrack] = useState("All tracks");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [trackOpen, setTrackOpen] = useState(false);
  const filtered = useMemo(
    () =>
      examples.filter(
        (project) =>
          (track === "All tracks" || project.track === track) &&
          `${project.title} ${project.student} ${project.track} ${project.desc}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [track, query],
  );

  return (
    <AdminLayout>
      <section className="-mx-4 -mt-4 mb-7 bg-gradient-to-r from-[#17102f] via-[#35106d] to-[#4c1d95] px-5 py-8 text-white sm:-mx-6 sm:-mt-6 sm:px-8 sm:py-10 lg:-mx-7 lg:-mt-7 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-violet-200">
          PRACTICAL LEARNING · SHOWCASE
        </p>
        <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Learner projects
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100 sm:text-base">
              Explore practical portfolio examples from across the five learning
              tracks, including digital products, campaign concepts, business
              tools and AI-supported workflows.
            </p>
          </div>
          <div className="shrink-0 border-l-2 border-violet-300/70 pl-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-200">
              Portfolio examples
            </p>
            <p className="mt-1 text-3xl font-black">
              {examples.length}
              <span className="ml-2 text-sm font-semibold text-violet-200">
                projects
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="mb-7 grid gap-3 border-b border-violet-200 bg-white p-4 sm:grid-cols-[minmax(0,1fr)_minmax(240px,340px)] sm:p-5">
        <label className="flex min-w-0 items-center gap-3 border-b-2 border-slate-200 px-3 py-2.5 transition focus-within:border-violet-800">
          <i
            className="fa-solid fa-magnifying-glass text-violet-800"
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search project, learner or learning track"
            aria-label="Search projects"
            className="min-w-0 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="px-1 text-sm font-bold text-violet-800"
            >
              Clear
            </button>
          )}
        </label>
        <div className="relative min-w-0">
          <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[10px] font-extrabold uppercase tracking-[.16em] text-violet-700">
            Track
          </span>
          <button
            type="button"
            aria-label="Filter by learning track"
            aria-haspopup="listbox"
            aria-expanded={trackOpen}
            onClick={() => setTrackOpen((open) => !open)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setTrackOpen(false);
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setTrackOpen(true);
              }
            }}
            className={`flex min-h-[48px] w-full items-center justify-between gap-3 border bg-white py-3 pl-[76px] pr-4 text-left text-sm font-semibold text-slate-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-violet-300 ${trackOpen ? "border-violet-700 ring-2 ring-violet-100" : "border-slate-300 hover:border-violet-500"}`}
          >
            <span className="min-w-0 truncate">
              {track === "All tracks" ? "All learning tracks" : track}
            </span>
            <i
              className={`fa-solid fa-chevron-down shrink-0 text-xs text-violet-800 transition-transform ${trackOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
          {trackOpen && (
            <>
              <button
                type="button"
                aria-label="Close learning track menu"
                className="fixed inset-0 z-20 cursor-default"
                onClick={() => setTrackOpen(false)}
              />
              <div
                role="listbox"
                aria-label="Learning tracks"
                className="absolute right-0 top-[calc(100%+6px)] z-30 max-h-72 w-full overflow-y-auto border border-violet-200 bg-white p-1.5 shadow-xl shadow-violet-950/15"
              >
                {["All tracks", ...tracks].map((item) => {
                  const active = track === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        setTrack(item);
                        setTrackOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-sm transition ${active ? "bg-violet-700 font-bold text-white" : "text-slate-700 hover:bg-violet-50 hover:text-violet-900"}`}
                    >
                      <span>
                        {item === "All tracks" ? "All learning tracks" : item}
                      </span>
                      {active && (
                        <i
                          className="fa-solid fa-check text-xs"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <article
              key={project.title}
              className={`group flex min-w-0 flex-col overflow-hidden bg-gradient-to-br ${tones[project.color]} text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="relative h-48 shrink-0 overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={`${project.title} illustrative preview`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17102f]/45 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-[10px] font-extrabold uppercase leading-5 tracking-[.15em] text-violet-200">
                  {project.track}
                </p>
                <h3 className="mt-2 text-xl font-extrabold leading-snug text-white">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-violet-100">
                  {project.desc}
                </p>
                <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-white/20 pt-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[.16em] text-violet-200">
                      Learner
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">
                      {project.student}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    className="inline-flex shrink-0 items-center gap-2 border-b border-violet-200/70 pb-1 text-sm font-bold text-white transition hover:border-white hover:text-violet-100"
                  >
                    View details{" "}
                    <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-violet-300 bg-white px-6 py-14 text-center">
          <i
            className="fa-solid fa-folder-open text-3xl text-violet-700"
            aria-hidden="true"
          />
          <h3 className="mt-4 text-lg font-bold text-slate-900">
            No matching projects
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Try another search term or choose a different learning track.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setTrack("All tracks");
            }}
            className="mt-4 border-b-2 border-violet-800 pb-1 text-sm font-bold text-violet-900"
          >
            Clear filters
          </button>
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className={`w-full max-w-xl overflow-hidden bg-gradient-to-br ${tones[selected.color]} text-white shadow-2xl`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selected.image}
              alt={`${selected.title} illustrative preview`}
              className="h-52 w-full object-cover"
            />
            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-violet-200">
                {selected.track}
              </p>
              <h3
                id="project-detail-title"
                className="mt-3 text-2xl font-black"
              >
                {selected.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-violet-100">
                {selected.desc}
              </p>
              <div className="mt-5 border-t border-white/20 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-violet-200">
                  Learner
                </p>
                <p className="mt-1 font-bold">{selected.student}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mt-7 border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Close details
              </button>
            </div>
          </div>
        </div>
      )}
      <p className="mt-7 text-xs leading-5 text-slate-500">
        Portfolio entries are illustrative demonstration examples for the
        interface, not verified programme submissions.
      </p>
    </AdminLayout>
  );
}
