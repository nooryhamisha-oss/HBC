import { useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";

const tracks = [
  {
    id: "web",
    name: "Web Development & Coding",
    short: "Web & Code",
    icon: "fa-code",
    color: "violet",
    people: [
      {
        id: "p1",
        name: "Amina Ahmadi",
        initials: "AA",
        role: "Frontend Developer Intern",
        host: "CodeLab Tech",
        status: "Ready for review",
      },
      {
        id: "p2",
        name: "Omid Farahani",
        initials: "OF",
        role: "Web Developer Intern",
        host: "NextGen Solutions",
        status: "Shortlisted",
      },
    ],
  },
  {
    id: "marketing",
    name: "Digital Marketing & Content",
    short: "Marketing",
    icon: "fa-bullhorn",
    color: "sky",
    people: [
      {
        id: "p3",
        name: "Nadia Rahimi",
        initials: "NR",
        role: "Content Creator Intern",
        host: "Bright Media",
        status: "Shortlisted",
      },
      {
        id: "p4",
        name: "Hamed Qasemi",
        initials: "HQ",
        role: "Social Media Intern",
        host: "Pixel Agency",
        status: "Ready for review",
      },
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Freelancing",
    short: "E-Commerce",
    icon: "fa-cart-shopping",
    color: "teal",
    people: [
      {
        id: "p5",
        name: "Fatemeh Karimi",
        initials: "FK",
        role: "Online Store Intern",
        host: "ShopWise",
        status: "Placement matched",
      },
      {
        id: "p6",
        name: "Reza Amini",
        initials: "RA",
        role: "Freelance Support Intern",
        host: "Freelance Hub",
        status: "Shortlisted",
      },
    ],
  },
  {
    id: "data",
    name: "Data Analytics & Bookkeeping",
    short: "Data",
    icon: "fa-chart-column",
    color: "orange",
    people: [
      {
        id: "p7",
        name: "Elham Sadat",
        initials: "ES",
        role: "Data Analyst Intern",
        host: "DataVista",
        status: "Ready for review",
      },
      {
        id: "p8",
        name: "Ali Jafari",
        initials: "AJ",
        role: "Bookkeeping Intern",
        host: "FinancePlus",
        status: "Placement matched",
      },
    ],
  },
  {
    id: "ai",
    name: "AI Tools & Digital Services",
    short: "AI Services",
    icon: "fa-wand-magic-sparkles",
    color: "pink",
    people: [
      {
        id: "p9",
        name: "Mehrdad Hosseini",
        initials: "MH",
        role: "AI Tools Intern",
        host: "FutureTech",
        status: "Shortlisted",
      },
      {
        id: "p10",
        name: "Zahra Nikpour",
        initials: "ZN",
        role: "Digital Assistant Intern",
        host: "Smart Solutions",
        status: "Ready for review",
      },
    ],
  },
];

const placements = [
  {
    person: "Fatemeh Karimi",
    role: "Online Store Intern",
    track: "E-Commerce & Freelancing",
    host: "ShopWise",
    supervisor: "To be assigned",
    status: "Host confirmed",
  },
  {
    person: "Nadia Rahimi",
    role: "Content Creator Intern",
    track: "Digital Marketing & Content",
    host: "Bright Media",
    supervisor: "Site mentor assigned",
    status: "In progress",
  },
];

const milestones = [
  {
    title: "Practical project review",
    person: "Amina Ahmadi",
    track: "Web Development & Coding",
    due: "Week 4",
    status: "Upcoming",
    color: "violet",
  },
  {
    title: "Mentor feedback",
    person: "Nadia Rahimi",
    track: "Digital Marketing & Content",
    due: "Week 5",
    status: "Awaiting feedback",
    color: "sky",
  },
];

const outcomes = [
  {
    title: "Supervisor evaluation",
    detail:
      "Review professional skills, reliability and communication with the host supervisor.",
    status: "Pending",
    icon: "fa-clipboard-check",
    color: "sky",
  },
  {
    title: "Final project & reflection",
    detail:
      "Record the final deliverable, skills demonstrated and recommended next step.",
    status: "Not submitted",
    icon: "fa-flag-checkered",
    color: "teal",
  },
];

const navItems = [
  { id: "overview", label: "Overview", icon: "fa-compass" },
  { id: "candidates", label: "Candidates", icon: "fa-users" },
  { id: "placements", label: "Placements", icon: "fa-building" },
  {
    id: "milestones",
    label: "Projects & milestones",
    icon: "fa-code-branch",
  },
  {
    id: "outcomes",
    label: "Completion & outcomes",
    icon: "fa-award",
  },
];

const colorMap = {
  violet: {
    icon: "bg-violet-100 text-violet-700 ring-violet-200",
    text: "text-violet-700",
    border: "border-violet-200",
    glow: "from-violet-50",
  },
  sky: {
    icon: "bg-sky-100 text-sky-700 ring-sky-200",
    text: "text-sky-700",
    border: "border-sky-200",
    glow: "from-sky-50",
  },
  teal: {
    icon: "bg-teal-100 text-teal-700 ring-teal-200",
    text: "text-teal-700",
    border: "border-teal-200",
    glow: "from-teal-50",
  },
  orange: {
    icon: "bg-orange-100 text-orange-700 ring-orange-200",
    text: "text-orange-700",
    border: "border-orange-200",
    glow: "from-orange-50",
  },
  pink: {
    icon: "bg-pink-100 text-pink-700 ring-pink-200",
    text: "text-pink-700",
    border: "border-pink-200",
    glow: "from-pink-50",
  },
};

function Status({ children }) {
  const styles = {
    "Ready for review": "border-violet-200 bg-violet-50 text-violet-700",
    Shortlisted: "border-sky-200 bg-sky-50 text-sky-700",
    "Placement matched": "border-teal-200 bg-teal-50 text-teal-700",
    "Host confirmed": "border-teal-200 bg-teal-50 text-teal-700",
    "In progress": "border-sky-200 bg-sky-50 text-sky-700",
    Upcoming: "border-violet-200 bg-violet-50 text-violet-700",
    "Awaiting feedback": "border-orange-200 bg-orange-50 text-orange-700",
    Pending: "border-orange-200 bg-orange-50 text-orange-700",
    "Not submitted": "border-slate-200 bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[11px] font-semibold ${
        styles[children] || styles.Pending
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

function Heading({ kicker, title, detail, action }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-violet-600">
          {kicker}
        </p>

        <h2 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {title}
        </h2>

        {detail && (
          <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-500">
            {detail}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

function PersonRow({ person, track, onSelect, active }) {
  const c = colorMap[track.color];

  return (
    <button
      type="button"
      onClick={() =>
        onSelect({
          ...person,
          track: track.name,
          color: track.color,
        })
      }
      className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-slate-100 px-4 py-3.5 text-left transition last:border-b-0 hover:bg-violet-50 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] ${
        active ? "bg-violet-50" : "bg-white"
      }`}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[11px] font-bold ring-1 ${c.icon}`}
        >
          {person.initials}
        </span>

        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-slate-900">
            {person.name}
          </span>
          <span className="mt-1 block truncate text-xs text-slate-500">
            {person.role}
          </span>
        </span>
      </span>

      <span className="hidden min-w-0 sm:block">
        <span className="block truncate text-xs text-slate-700">
          {person.host}
        </span>
        <span className="mt-1 block text-[10px] uppercase tracking-wider text-slate-400">
          Host organisation
        </span>
      </span>

      <span className="flex items-center gap-2">
        <span className="hidden md:inline-flex">
          <Status>{person.status}</Status>
        </span>
        <i className="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 transition group-hover:text-violet-600" />
      </span>
    </button>
  );
}

export default function Internships() {
  const [active, setActive] = useState("overview");
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState("");

  const announce = (text) => setNotice(text);

  const people = useMemo(
    () =>
      tracks.flatMap((track) =>
        track.people.map((person) => ({
          ...person,
          track: track.name,
          color: track.color,
        })),
      ),
    [],
  );

  return (
    <AdminLayout>
      <div className="min-w-0 bg-white text-slate-900">
        <main className="min-w-0 px-4 py-5 sm:px-6 lg:px-8">
          {/* Internship hero — no secondary navy header or search bar */}
          <section className="relative overflow-hidden rounded-[26px] border border-violet-200 bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-950 px-6 py-7 sm:px-8 sm:py-8">
            <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border border-violet-200/10" />
            <div className="pointer-events-none absolute -right-4 -top-10 h-52 w-52 rounded-full border border-violet-200/[.07]" />

            <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/20 bg-violet-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-violet-100">
                  <i className="fa-solid fa-briefcase" />
                  HBC career experience
                </span>

                <h2 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                  Build the bridge from learning to work.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-violet-100/75">
                  Review candidate readiness, coordinate host placements, follow
                  practical projects and close each internship with meaningful
                  feedback.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-300/15 text-violet-100">
                    <i className="fa-solid fa-user-group text-lg" />
                  </span>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Candidate directory
                    </p>
                    <p className="mt-1 text-xs text-violet-100/60">
                      Organised by learning track
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-300/15 text-teal-100">
                    <i className="fa-solid fa-route text-lg" />
                  </span>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Placement journey
                    </p>
                    <p className="mt-1 text-xs text-violet-100/60">
                      From matching to final review
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <nav
            aria-label="Internship sections"
            className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActive(item.id);
                  setSelected(null);
                  setNotice("");
                }}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition ${
                  active === item.id
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-950/20"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-800"
                }`}
              >
                <i className={`fa-solid ${item.icon}`} />
                {item.label}
              </button>
            ))}
          </nav>

          {notice && (
            <div
              role="status"
              className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-xs text-violet-800"
            >
              <span>
                <i className="fa-solid fa-circle-info mr-2" />
                {notice}
              </span>

              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss message"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          )}

          {(active === "overview" || active === "candidates") && (
            <section className="pt-7">
              <Heading
                kicker={
                  active === "overview"
                    ? "Programme overview"
                    : "Selection pipeline"
                }
                title={
                  active === "overview"
                    ? "Learning tracks & candidates"
                    : "Candidate readiness"
                }
                detail={
                  active === "overview"
                    ? "Browse participants by specialisation, then open a profile to review the next step."
                    : "Check each participant's learning record before confirming internship eligibility."
                }
              />

              {active === "overview" && (
                <div className="mb-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    {
                      label: "Review candidates",
                      note: "Confirm attendance and learning activity",
                      icon: "fa-user-check",
                      color: "violet",
                      target: "candidates",
                    },
                    {
                      label: "Match a host",
                      note: "Agree on role and supervisor",
                      icon: "fa-building-circle-check",
                      color: "teal",
                      target: "placements",
                    },
                    {
                      label: "Track project work",
                      note: "Keep deliverables and feedback visible",
                      icon: "fa-code-branch",
                      color: "sky",
                      target: "milestones",
                    },
                    {
                      label: "Review completion",
                      note: "Record final evaluation and next step",
                      icon: "fa-award",
                      color: "pink",
                      target: "outcomes",
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setActive(item.target)}
                      className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-violet-300 hover:bg-violet-50"
                    >
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${colorMap[item.color].icon}`}
                      >
                        <i className={`fa-solid ${item.icon}`} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-slate-900">
                          {item.label}
                        </span>
                        <span className="mt-1.5 block text-xs leading-5 text-slate-500">
                          {item.note}
                        </span>
                      </span>

                      <i className="fa-solid fa-arrow-up-right-from-square mt-1 text-[10px] text-slate-400 group-hover:text-violet-600" />
                    </button>
                  ))}
                </div>
              )}

              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Participants by learning track
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Each track includes its assigned interns and current host
                    details.
                  </p>
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-slate-500">
                  Directory view
                </span>
              </div>

              <div className="space-y-4">
                {tracks.map((track) => {
                  const c = colorMap[track.color];

                  return (
                    <section
                      key={track.id}
                      className={`overflow-hidden rounded-2xl border ${c.border} bg-gradient-to-r ${c.glow} via-white to-white`}
                    >
                      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
                        <div className="flex items-center gap-3">
                          <span
                            className={`grid h-10 w-10 place-items-center rounded-xl ring-1 ${c.icon}`}
                          >
                            <i className={`fa-solid ${track.icon}`} />
                          </span>

                          <div>
                            <h3 className="text-sm font-bold text-slate-900">
                              {track.name}
                            </h3>
                            <p className="mt-1 text-[11px] text-slate-500">
                              {track.people.length} demo profiles in this track
                            </p>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold uppercase tracking-[.16em] ${c.text}`}
                        >
                          {track.short}
                        </span>
                      </div>

                      <div>
                        {track.people.map((person) => (
                          <PersonRow
                            key={person.id}
                            person={person}
                            track={track}
                            active={selected?.id === person.id}
                            onSelect={setSelected}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>

              {selected && (
                <section className="mt-5 rounded-2xl border border-violet-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-xl text-xs font-bold ring-1 ${colorMap[selected.color].icon}`}
                      >
                        {selected.initials}
                      </span>

                      <div>
                        <p className="font-bold text-slate-900">
                          {selected.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {selected.role} · {selected.track}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    >
                      Close <i className="fa-solid fa-xmark ml-1" />
                    </button>
                  </div>

                  <div className="mt-5 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Host organisation
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-slate-800">
                        {selected.host}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Current status
                      </p>
                      <div className="mt-1.5">
                        <Status>{selected.status}</Status>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Suggested next step
                      </p>
                      <p className="mt-1.5 text-sm text-slate-600">
                        Verify learning records and confirm eligibility.
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </section>
          )}

          {active === "placements" && (
            <section className="pt-7">
              <Heading
                kicker="Host coordination"
                title="Placement directory"
                detail="Review the host organisation, internship role and supervisor assignment."
                action={
                  <button
                    type="button"
                    onClick={() =>
                      announce(
                        "Connect the placement form to the HBC data source to save new placements.",
                      )
                    }
                    className="rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-violet-500"
                  >
                    <i className="fa-solid fa-plus mr-2" />
                    Add placement
                  </button>
                }
              />

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="hidden grid-cols-[1.1fr_1fr_1fr_auto] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 md:grid">
                  <span>Participant / role</span>
                  <span>Host organisation</span>
                  <span>Supervisor</span>
                  <span>Status</span>
                </div>

                {placements.map((p, i) => (
                  <div
                    key={p.person}
                    className={`grid gap-3 p-4 sm:p-5 md:grid-cols-[1.1fr_1fr_1fr_auto] md:items-center ${
                      i ? "border-t border-slate-100" : ""
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {p.person}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{p.role}</p>
                      <p className="mt-1 text-[11px] text-violet-700">
                        {p.track}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 md:hidden">
                        Host organisation
                      </p>
                      <p className="text-sm text-slate-700">{p.host}</p>
                    </div>

                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 md:hidden">
                        Supervisor
                      </p>
                      <p className="text-sm text-slate-700">{p.supervisor}</p>
                    </div>

                    <div>
                      <Status>{p.status}</Status>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {active === "milestones" && (
            <section className="pt-7">
              <Heading
                kicker="During the placement"
                title="Projects & milestones"
                detail="Follow practical deliverables, review timing and mentor feedback."
                action={
                  <button
                    type="button"
                    onClick={() =>
                      announce(
                        "Connect the milestone form to save a new project checkpoint.",
                      )
                    }
                    className="rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-violet-500"
                  >
                    <i className="fa-solid fa-plus mr-2" />
                    Add milestone
                  </button>
                }
              />

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {milestones.map((item, i) => (
                  <div
                    key={item.title}
                    className={`grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center ${
                      i ? "border-t border-slate-100" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-1 ${colorMap[item.color].icon}`}
                      >
                        <i className="fa-solid fa-list-check" />
                      </span>

                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-slate-500">
                          {item.person} · {item.track}
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                          Review window: {item.due}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Status>{item.status}</Status>
                      <button
                        type="button"
                        onClick={() =>
                          announce(
                            `Milestone details for ${item.person} will be available when project records are connected.`,
                          )
                        }
                        className="text-xs font-bold text-violet-700 hover:text-violet-900"
                      >
                        Review <i className="fa-solid fa-arrow-right ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {active === "outcomes" && (
            <section className="pt-7">
              <Heading
                kicker="Final review"
                title="Completion & outcomes"
                detail="Record final project evidence, supervisor feedback and each participant's next step."
              />

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {outcomes.map((item, i) => (
                  <div
                    key={item.title}
                    className={`grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center ${
                      i ? "border-t border-slate-100" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-1 ${colorMap[item.color].icon}`}
                      >
                        <i className={`fa-solid ${item.icon}`} />
                      </span>

                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-500">
                          {item.detail}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Status>{item.status}</Status>
                      <button
                        type="button"
                        onClick={() =>
                          announce(
                            `Open the ${item.title.toLowerCase()} checklist when completion records are connected.`,
                          )
                        }
                        className="text-xs font-bold text-violet-700 hover:text-violet-900"
                      >
                        Open review{" "}
                        <i className="fa-solid fa-arrow-right ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-violet-200 bg-violet-50 p-4">
                <i className="fa-solid fa-circle-check mt-0.5 text-violet-700" />

                <div>
                  <p className="text-xs font-bold text-violet-900">
                    Completion rule
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Close an internship after the final project and supervisor
                    feedback have been reviewed and the participant's next step
                    has been recorded.
                  </p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </AdminLayout>
  );
}
