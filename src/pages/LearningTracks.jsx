import { useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";

const initialTracks = [
  {
    id: "web",
    name: "Web Development & Coding",
    category: "Technology",
    icon: "fa-code",
    accent: "violet",
    description:
      "Build practical skills for creating websites and coding projects.",
  },
  {
    id: "marketing",
    name: "Digital Marketing & Content",
    category: "Digital Business",
    icon: "fa-bullhorn",
    accent: "blue",
    description:
      "Learn digital content planning, audience research and campaign practice.",
  },
  {
    id: "commerce",
    name: "E-Commerce & Freelancing",
    category: "Digital Business",
    icon: "fa-cart-shopping",
    accent: "orange",
    description: "Explore online selling, digital services and freelance work.",
  },
  {
    id: "data",
    name: "Data Analytics & Bookkeeping",
    category: "Data & Finance",
    icon: "fa-chart-column",
    accent: "teal",
    description:
      "Develop skills in organising data, reporting and digital bookkeeping.",
  },
  {
    id: "ai",
    name: "AI Tools & Digital Services",
    category: "Emerging Technology",
    icon: "fa-wand-magic-sparkles",
    accent: "rose",
    description:
      "Apply AI tools responsibly to practical digital tasks and services.",
  },
];

const accents = {
  violet: {
    icon: "bg-violet-100 text-violet-700",
    border: "border-violet-300",
    ring: "ring-violet-100",
    dot: "bg-violet-600",
    text: "text-violet-700",
    soft: "bg-violet-50",
    line: "bg-violet-200",
  },
  blue: {
    icon: "bg-blue-100 text-blue-700",
    border: "border-blue-300",
    ring: "ring-blue-100",
    dot: "bg-blue-600",
    text: "text-blue-700",
    soft: "bg-blue-50",
    line: "bg-blue-200",
  },
  orange: {
    icon: "bg-orange-100 text-orange-700",
    border: "border-orange-300",
    ring: "ring-orange-100",
    dot: "bg-orange-500",
    text: "text-orange-700",
    soft: "bg-orange-50",
    line: "bg-orange-200",
  },
  teal: {
    icon: "bg-teal-100 text-teal-700",
    border: "border-teal-300",
    ring: "ring-teal-100",
    dot: "bg-teal-600",
    text: "text-teal-700",
    soft: "bg-teal-50",
    line: "bg-teal-200",
  },
  rose: {
    icon: "bg-rose-100 text-rose-700",
    border: "border-rose-300",
    ring: "ring-rose-100",
    dot: "bg-rose-600",
    text: "text-rose-700",
    soft: "bg-rose-50",
    line: "bg-rose-200",
  },
};

// Planning structure only. Replace phase labels/details with the approved HBC syllabus when available.
const phases = [
  {
    title: "Foundations",
    weeks: "Weeks 1–4",
    sessions: 12,
    detail:
      "Introduce essential concepts, tools and working methods for this learning track.",
    icon: "fa-compass",
  },
  {
    title: "Core Skills",
    weeks: "Weeks 5–8",
    sessions: 12,
    detail:
      "Build core skills through guided lessons, short exercises and instructor feedback.",
    icon: "fa-layer-group",
  },
  {
    title: "Practical Work",
    weeks: "Weeks 9–12",
    sessions: 12,
    detail:
      "Apply skills in class activities and weekly homework with clear due dates.",
    icon: "fa-laptop-code",
  },
  {
    title: "Final Project",
    weeks: "Weeks 13–16",
    sessions: 12,
    detail:
      "Plan, develop and present a practical project demonstrating the skills learned.",
    icon: "fa-flag-checkered",
  },
];

const workflow = [
  {
    title: "Lesson materials",
    detail: "PowerPoint slides prepared and organised by HBC administration.",
    icon: "fa-file-powerpoint",
    accent: "violet",
  },
  {
    title: "Class activities",
    detail:
      "A practical exercise linked to each lesson and recorded by the instructor.",
    icon: "fa-people-group",
    accent: "blue",
  },
  {
    title: "Daily homework",
    detail: "Google Classroom assignment link, submission status and due date.",
    icon: "fa-list-check",
    accent: "teal",
  },
  {
    title: "Weekly & final projects",
    detail: "Practical work organised separately from daily lesson activities.",
    icon: "fa-diagram-project",
    accent: "orange",
  },
];

function SectionHeading({ number, eyebrow, title, description, trailing }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div className="flex min-w-0 items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-100 text-xs font-extrabold text-violet-800">
          {number}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-violet-700">
            {eyebrow}
          </p>
          <h3 className="mt-1 text-lg font-extrabold tracking-tight text-slate-950">
            {title}
          </h3>
          {description && (
            <p className="mt-1 max-w-3xl text-sm leading-5 text-slate-600">
              {description}
            </p>
          )}
        </div>
      </div>
      {trailing}
    </div>
  );
}

export default function LearningTracks() {
  const [tracks, setTracks] = useState(initialTracks);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("web");
  const [expandedPhase, setExpandedPhase] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [notice, setNotice] = useState("");

  const filteredTracks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query
      ? tracks.filter((track) =>
          `${track.name} ${track.category} ${track.description}`
            .toLowerCase()
            .includes(query),
        )
      : tracks;
  }, [tracks, search]);
  const selectedTrack =
    tracks.find((track) => track.id === selectedId) ||
    filteredTracks[0] ||
    null;
  const selectedAccent = selectedTrack
    ? accents[selectedTrack.accent] || accents.violet
    : accents.violet;

  function addTrack(event) {
    event.preventDefault();
    const name = newName.trim();
    if (!name) return;
    const track = {
      id: `draft-${Date.now()}`,
      name,
      category: "New track",
      icon: "fa-book-open",
      accent: "violet",
      description: newDescription.trim() || "Description to be added.",
      isDraft: true,
    };
    setTracks((current) => [...current, track]);
    setSelectedId(track.id);
    setSearch("");
    setNewName("");
    setNewDescription("");
    setShowAddForm(false);
    setNotice("Track added to this session preview.");
  }

  return (
    <AdminLayout>
      <main className="mx-auto w-full max-w-[1500px] space-y-5 pb-8 text-slate-900">
        {/* Page header: restrained colour, strong hierarchy */}
        <section className="overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-white to-indigo-50 shadow-sm">
          <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="min-w-0">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-violet-800">
                <i className="fa-solid fa-route" /> Programme curriculum
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Learning Tracks
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Choose a learning path, follow its stages in order, and review
                the materials and activities connected to the programme.
              </p>
            </div>
            <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-white/90 lg:min-w-[345px]">
              {[
                {
                  label: "Learning tracks",
                  value: tracks.length,
                  icon: "fa-layer-group",
                },
                {
                  label: "Programme length",
                  value: "4 months",
                  icon: "fa-calendar",
                },
                { label: "Total sessions", value: "48", icon: "fa-book-open" },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`min-w-0 px-2 py-3 text-center sm:px-4 ${index ? "border-l border-slate-200" : ""}`}
                >
                  <i
                    className={`fa-solid ${item.icon} mb-1.5 text-sm text-violet-700`}
                  />
                  <p className="text-[10px] font-semibold leading-4 text-slate-600">
                    {item.label}
                  </p>
                  <p className="mt-1 text-base font-black leading-5 text-slate-950 sm:text-lg">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-violet-100 bg-white/60 px-5 py-3 text-xs text-slate-600 sm:px-7">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-600" /> 3 sessions
              per week
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-600" /> Hybrid
              learning
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500" /> Practical
              activities and projects
            </span>
          </div>
        </section>

        {/* Step 1: choose a track */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <SectionHeading
            number="01"
            eyebrow="Start here"
            title="Choose a learning track"
            description="Select one track to load its roadmap and learning activities."
            trailing={
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="relative block sm:w-64">
                  <span className="sr-only">Search tracks</span>
                  <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search learning tracks..."
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddForm((value) => !value)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-200"
                >
                  <i className="fa-solid fa-plus" /> Add track
                </button>
              </div>
            }
          />

          {showAddForm && (
            <form
              onSubmit={addTrack}
              className="mb-4 grid gap-3 rounded-xl border border-violet-200 bg-violet-50 p-4 sm:grid-cols-[1fr_1.4fr_auto] sm:items-end"
            >
              <label className="block text-xs font-bold text-slate-800">
                Track name
                <input
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  required
                  placeholder="Enter track name"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </label>
              <label className="block text-xs font-bold text-slate-800">
                Description
                <input
                  value={newDescription}
                  onChange={(event) => setNewDescription(event.target.value)}
                  placeholder="Short description (optional)"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </label>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="rounded-lg bg-violet-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-violet-800"
                >
                  Add to preview
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          {notice && (
            <div
              role="status"
              className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-teal-200 bg-teal-50 px-3.5 py-2.5 text-xs font-medium text-teal-900"
            >
              <span>
                <i className="fa-solid fa-circle-check mr-2" />
                {notice}
              </span>
              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss message"
                className="rounded p-1 hover:bg-teal-100"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          )}

          {filteredTracks.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {filteredTracks.map((track) => {
                const color = accents[track.accent] || accents.violet;
                const active = selectedTrack?.id === track.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(track.id);
                      setExpandedPhase(0);
                    }}
                    aria-pressed={active}
                    className={`group relative flex min-h-[122px] min-w-0 items-start gap-3 rounded-xl border p-3.5 text-left transition duration-150 focus:outline-none focus:ring-4 ${active ? `${color.border} ${color.soft} ${color.ring} ring-2 shadow-sm` : `border-slate-200 ${color.soft} hover:${color.border} hover:shadow-sm focus:ring-violet-100`}`}
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${color.icon}`}
                    >
                      <i className={`fa-solid ${track.icon} text-base`} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-extrabold leading-5 text-slate-950">
                        {track.name}
                      </span>
                      <span className="mt-1.5 block text-xs leading-4 text-slate-600">
                        {track.category}
                        {track.isDraft ? " · Draft" : ""}
                      </span>
                    </span>
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-1 rounded-t-full ${active ? color.dot : "bg-transparent"}`}
                    />
                    {active && (
                      <i
                        className={`fa-solid fa-circle-check absolute right-2.5 top-2.5 text-xs ${color.text}`}
                        aria-label="Selected"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
              No learning tracks match your search.
            </div>
          )}
        </section>

        {selectedTrack && (
          <>
            {/* Step 2: compact track overview, not a full-screen purple block */}
            <section className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
              <div className="h-1.5 bg-gradient-to-r from-violet-700 via-indigo-500 to-teal-500" />
              <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="flex min-w-0 items-start gap-4">
                  <span
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${selectedAccent.icon}`}
                  >
                    <i className={`fa-solid ${selectedTrack.icon} text-xl`} />
                  </span>
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-violet-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />{" "}
                        Selected learning track
                      </span>
                      {selectedTrack.isDraft && (
                        <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold text-orange-800">
                          Draft
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black leading-tight tracking-tight text-slate-950 sm:text-2xl">
                      {selectedTrack.name}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                      {selectedTrack.description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:min-w-[270px]">
                  <div className="rounded-xl border border-violet-100 bg-violet-50 p-3">
                    <p className="text-[11px] font-semibold text-violet-800">
                      Duration
                    </p>
                    <p className="mt-1 text-base font-black text-slate-950">
                      4 months
                    </p>
                    <p className="text-xs text-slate-600">16 weeks</p>
                  </div>
                  <div className="rounded-xl border border-teal-100 bg-teal-50 p-3">
                    <p className="text-[11px] font-semibold text-teal-800">
                      Schedule
                    </p>
                    <p className="mt-1 text-base font-black text-slate-950">
                      48 sessions
                    </p>
                    <p className="text-xs text-slate-600">3 per week</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 3: clear beginning-to-end roadmap */}
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <SectionHeading
                number="02"
                eyebrow="Follow in order"
                title="Learning roadmap"
                description="Move from Stage 1 to Stage 4. Select a stage to view its purpose and learning focus."
                trailing={
                  <div className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">
                    <i className="fa-solid fa-route text-violet-700" /> Stage 1{" "}
                    <i className="fa-solid fa-arrow-right text-slate-400" />{" "}
                    Stage 4
                  </div>
                }
              />
              <div className="mb-4 flex items-center gap-2 text-[11px] font-bold text-slate-600">
                <span className="rounded-full bg-violet-100 px-2.5 py-1 text-violet-800">
                  START
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-violet-300 via-blue-300 to-teal-300" />
                <span className="rounded-full bg-teal-100 px-2.5 py-1 text-teal-800">
                  FINISH
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {phases.map((phase, index) => {
                  const stageColors = [
                    accents.violet,
                    accents.blue,
                    accents.teal,
                    accents.orange,
                  ];
                  const color = stageColors[index];
                  return (
                    <article
                      key={phase.title}
                      className={`relative flex min-w-0 flex-col overflow-hidden rounded-xl border ${color.border} ${color.soft} shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
                    >
                      <div className={`h-1.5 w-full ${color.dot}`} />
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`grid h-11 w-11 place-items-center rounded-xl ${color.icon}`}
                          >
                            <i className={`fa-solid ${phase.icon} text-base`} />
                          </span>
                          <span className="rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-700">
                            {phase.weeks}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <span
                            className={`text-[10px] font-black ${color.text}`}
                          >
                            STAGE {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`h-1 w-1 rounded-full ${color.dot}`}
                          />
                        </div>
                        <h4 className="mt-1.5 text-sm font-extrabold text-slate-950">
                          {phase.title}
                        </h4>
                        <p className={`mt-1 text-xs font-bold ${color.text}`}>
                          {phase.sessions} sessions
                        </p>
                        <div className="mt-3 flex-1 border-t border-white/90 pt-3">
                          <p className="text-xs leading-5 text-slate-700">
                            {phase.detail}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              <p className="mt-4 flex items-start gap-2 rounded-lg bg-slate-50 px-3.5 py-3 text-xs leading-5 text-slate-600">
                <i className="fa-solid fa-circle-info mt-0.5 text-violet-700" />
                <span>
                  Stage names are a planning structure. Replace them with the
                  approved HBC curriculum when the official lesson sequence is
                  available.
                </span>
              </p>
            </section>

            {/* Step 4: materials follow the roadmap */}
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
              <SectionHeading
                number="03"
                eyebrow="Supports every stage"
                title="Learning activities & materials"
                description="These resources support delivery and practice throughout the selected learning track."
                trailing={
                  <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                    <i className="fa-solid fa-link text-teal-700" /> Linked to
                    the roadmap
                  </span>
                }
              />
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {workflow.map((item) => {
                  const color = accents[item.accent];
                  return (
                    <article
                      key={item.title}
                      className="flex min-w-0 gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
                    >
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${color.icon}`}
                      >
                        <i className={`fa-solid ${item.icon}`} />
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-sm font-extrabold text-slate-950">
                          {item.title}
                        </h4>
                        <p className="mt-1.5 text-xs leading-5 text-slate-600">
                          {item.detail}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-violet-200 bg-violet-50 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-violet-700">
                    <i className="fa-solid fa-display" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Hybrid classroom delivery
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-700">
                      In-person and online learners follow the same lesson.
                      Online learners join the classroom through Google Meet.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-teal-700">
                    <i className="fa-solid fa-clipboard-check" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Assessment workflow
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-700">
                      Instructors record class activity and homework. Mentors
                      record attendance. The final score is out of 100;
                      weighting is not yet confirmed.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </AdminLayout>
  );
}
