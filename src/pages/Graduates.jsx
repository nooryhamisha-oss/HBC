import { useEffect, useMemo, useRef, useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import { graduates, tracks } from "../data/demoData.js";

const TRACK_COLORS = [
  "from-violet-700 via-purple-700 to-indigo-800",
  "from-fuchsia-700 via-purple-700 to-violet-900",
  "from-indigo-700 via-violet-700 to-purple-900",
  "from-purple-700 via-pink-700 to-fuchsia-900",
  "from-violet-800 via-indigo-800 to-slate-900",
];

const normalize = (value) =>
  String(value ?? "")
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const getInitials = (first, last) => {
  const initials = `${String(first ?? "")
    .trim()
    .charAt(0)}${String(last ?? "")
    .trim()
    .charAt(0)}`;

  return initials.trim().toUpperCase() || "G";
};

const getTrackName = (track) => {
  if (typeof track === "string") return track;
  return track?.name ?? track?.title ?? "";
};

const formatDate = (value) => {
  if (!value) return "Not recorded";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <circle
        cx="10.8"
        cy="10.8"
        r="6.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StyledSelect({ label, value, options, onChange, icon }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative min-w-0">
      <label className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-slate-500">
        {label}
      </label>

      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={`flex min-h-[54px] w-full items-center gap-3 rounded-xl border bg-white px-4 py-3 text-left transition-all duration-200 focus:outline-none focus:ring-4 ${
          open
            ? "border-violet-500 ring-violet-500/10"
            : "border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-violet-500/10"
        }`}
      >
        <span className="shrink-0 text-violet-700">{icon}</span>

        <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-800">
          {selected?.label ?? "Choose an option"}
        </span>

        <ChevronIcon
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={label}
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10"
        >
          {options.map((option) => {
            const active = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500 ${
                  active
                    ? "bg-violet-50 font-bold text-violet-800"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    active ? "bg-violet-600" : "bg-slate-200"
                  }`}
                />

                <span className="min-w-0 flex-1">{option.label}</span>

                {active && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 shrink-0 text-violet-700"
                  >
                    <path
                      d="m5 12 4 4L19 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function GraduateCard({ graduate, index, view }) {
  const fullName =
    `${graduate.first ?? ""} ${graduate.last ?? ""}`.trim() ||
    "Unnamed graduate";

  const gradient = TRACK_COLORS[index % TRACK_COLORS.length];

  return (
    <article
      className={`group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5 ${
        view === "list" ? "flex flex-col sm:flex-row" : "flex flex-col"
      }`}
    >
      <div
        className={`relative isolate overflow-hidden bg-gradient-to-br ${gradient} p-5 text-white ${
          view === "list"
            ? "sm:flex sm:w-64 sm:shrink-0 sm:flex-col sm:justify-center"
            : "min-h-[164px]"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-12 -z-10 h-40 w-40 rounded-full border-[22px] border-white/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-14 left-1/3 -z-10 h-32 w-32 rounded-full bg-fuchsia-300/20 blur-2xl"
        />

        <div className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/85">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 shrink-0"
            >
              <path
                d="m3 9 9-5 9 5-9 5-9-5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M7 12v5c3.2 2.4 6.8 2.4 10 0v-5M21 9v6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            Graduate profile
          </span>

          <span className="shrink-0 rounded-lg border border-white/20 bg-black/10 px-2.5 py-1.5 text-[11px] font-bold text-white">
            {graduate.id || "ID unavailable"}
          </span>
        </div>

        <div className="mt-6 flex min-w-0 items-center gap-4">
          <div className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-2xl border-2 border-white/70 bg-white text-xl font-black tracking-wide text-violet-800 shadow-lg shadow-black/10">
            {getInitials(graduate.first, graduate.last)}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="break-words text-lg font-extrabold leading-snug text-white">
              {fullName}
            </h2>

            <p className="mt-2 flex items-start gap-1.5 text-sm leading-5 text-white/80">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 h-4 w-4 shrink-0"
              >
                <path
                  d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
              <span className="break-words">
                {graduate.province || "Location not recorded"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <section>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-slate-400">
            Learning track
          </p>

          <div className="mt-3 flex items-start gap-3 rounded-xl border border-violet-100 bg-violet-50/70 p-3.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-violet-700 shadow-sm">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
              >
                <path
                  d="m12 3 9 5-9 5-9-5 9-5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="m3 12 9 5 9-5M3 16l9 5 9-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <p className="min-w-0 break-words pt-1 text-sm font-bold leading-6 text-violet-900">
              {graduate.track || "Track not recorded"}
            </p>
          </div>
        </section>

        <section className="mt-5 flex-1">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-700">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m10 9-3 3 3 3m4-6 3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-500">
              Final project
            </p>
          </div>

          <p className="mt-3 break-words text-sm font-semibold leading-6 text-slate-800">
            {graduate.project || "Project not recorded"}
          </p>
        </section>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-400">
              Graduation date
            </p>

            <p className="mt-1.5 text-sm font-bold text-slate-700">
              {formatDate(graduate.graduated)}
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold text-slate-500">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-3.5 w-3.5"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="11"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M8 10V7a4 4 0 0 1 8 0v3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            Record
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Graduates() {
  const [query, setQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("All tracks");
  const [sortBy, setSortBy] = useState("name");
  const [view, setView] = useState("grid");

  const trackOptions = useMemo(() => {
    const importedTracks = Array.isArray(tracks) ? tracks : [];
    const graduateTracks = Array.isArray(graduates)
      ? graduates.map((graduate) => graduate.track)
      : [];

    return [
      ...new Set(
        [...importedTracks.map(getTrackName), ...graduateTracks]
          .filter(Boolean)
          .map((item) => String(item).trim())
          .filter(Boolean),
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredGraduates = useMemo(() => {
    const records = Array.isArray(graduates) ? graduates : [];
    const searchTerm = normalize(query);

    const filtered = records.filter((graduate) => {
      const fullName = `${graduate.first ?? ""} ${graduate.last ?? ""}`;

      const searchableFields = [
        fullName,
        graduate.first,
        graduate.last,
        graduate.id,
        graduate.project,
        graduate.province,
        graduate.track,
        graduate.graduated,
      ];

      const matchesSearch =
        !searchTerm ||
        searchableFields.some((field) => normalize(field).includes(searchTerm));

      const matchesTrack =
        selectedTrack === "All tracks" ||
        normalize(graduate.track) === normalize(selectedTrack);

      return matchesSearch && matchesTrack;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "track") {
        return String(a.track ?? "").localeCompare(String(b.track ?? ""));
      }

      if (sortBy === "newest" || sortBy === "oldest") {
        const dateA = Date.parse(a.graduated ?? "");
        const dateB = Date.parse(b.graduated ?? "");

        const validA = Number.isNaN(dateA) ? null : dateA;
        const validB = Number.isNaN(dateB) ? null : dateB;

        if (validA === null && validB === null) return 0;
        if (validA === null) return 1;
        if (validB === null) return -1;

        return sortBy === "newest" ? validB - validA : validA - validB;
      }

      const nameA = `${a.first ?? ""} ${a.last ?? ""}`.trim();
      const nameB = `${b.first ?? ""} ${b.last ?? ""}`.trim();

      return nameA.localeCompare(nameB);
    });
  }, [query, selectedTrack, sortBy]);

  const hasFilters = query.trim() !== "" || selectedTrack !== "All tracks";

  const resetFilters = () => {
    setQuery("");
    setSelectedTrack("All tracks");
    setSortBy("name");
  };

  return (
    <AdminLayout>
      <main className="min-w-0 space-y-6 pb-8">
        <section className="relative isolate overflow-hidden rounded-3xl bg-[#21103f] p-6 text-white shadow-xl shadow-violet-950/10 sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 -z-10 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 right-1/3 -z-10 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl"
          />

          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wide text-violet-100">
              <span className="h-2 w-2 rounded-full bg-teal-300" />
              HBC · LEARNER OUTCOMES
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Graduate Community
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-violet-100 sm:text-base">
              Explore graduate profiles, learning tracks, final projects, and
              recorded completion dates in one place.
            </p>
          </div>

          <div className="relative mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-5">
            {["Profile directory", "Learning tracks", "Final projects"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-violet-100"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </section>

        <section
          aria-label="Graduate search and filters"
          className="relative z-20 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="graduate-search"
                className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-slate-500"
              >
                Search graduates
              </label>

              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  id="graduate-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Name, ID, project, province, or track..."
                  autoComplete="off"
                  className="min-h-[54px] w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:w-[460px]">
              <StyledSelect
                label="Learning track"
                value={selectedTrack}
                onChange={setSelectedTrack}
                icon={
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                  >
                    <path
                      d="m12 3 9 5-9 5-9-5 9-5Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m3 12 9 5 9-5M3 16l9 5 9-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                options={[
                  { value: "All tracks", label: "All Tracks" },
                  ...trackOptions.map((name) => ({
                    value: name,
                    label: name,
                  })),
                ]}
              />

              <StyledSelect
                label="Sort results"
                value={sortBy}
                onChange={setSortBy}
                icon={
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                  >
                    <path
                      d="M8 4v16m0-16L4.5 8M8 4l3.5 4M16 20V4m0 16-3.5-4m3.5 4 3.5-4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                options={[
                  { value: "name", label: "Sort by name" },
                  { value: "track", label: "Sort by track" },
                  {
                    value: "newest",
                    label: "Graduation: newest first",
                  },
                  {
                    value: "oldest",
                    label: "Graduation: oldest first",
                  },
                ]}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p aria-live="polite" className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-extrabold text-slate-800">
                {filteredGraduates.length}
              </span>{" "}
              graduates
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {hasFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-violet-700 transition hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                  >
                    <path
                      d="M3 11a9 9 0 1 1 2.6 6.4M3 4v7h7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Reset filters
                </button>
              )}

              <div
                aria-label="Layout options"
                className="flex rounded-xl border border-slate-200 bg-slate-50 p-1"
              >
                <button
                  type="button"
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                  className={`rounded-lg p-2 transition focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    view === "grid"
                      ? "bg-violet-700 text-white shadow-sm"
                      : "text-slate-500 hover:bg-white hover:text-slate-800"
                  }`}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                  >
                    <rect
                      x="3.5"
                      y="3.5"
                      width="7"
                      height="7"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <rect
                      x="13.5"
                      y="3.5"
                      width="7"
                      height="7"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <rect
                      x="3.5"
                      y="13.5"
                      width="7"
                      height="7"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <rect
                      x="13.5"
                      y="13.5"
                      width="7"
                      height="7"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                  className={`rounded-lg p-2 transition focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    view === "list"
                      ? "bg-violet-700 text-white shadow-sm"
                      : "text-slate-500 hover:bg-white hover:text-slate-800"
                  }`}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                  >
                    <path
                      d="M9 5h11M9 12h11M9 19h11M4 5h.01M4 12h.01M4 19h.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {filteredGraduates.length > 0 ? (
          <section
            aria-label="Graduate profiles"
            className={
              view === "grid"
                ? "grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3"
                : "flex flex-col gap-4"
            }
          >
            {filteredGraduates.map((graduate, index) => (
              <GraduateCard
                key={
                  graduate.id ?? `${graduate.first}-${graduate.last}-${index}`
                }
                graduate={graduate}
                index={index}
                view={view}
              />
            ))}
          </section>
        ) : (
          <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center sm:px-10">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-violet-50 text-violet-700">
              <SearchIcon className="h-8 w-8" />
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-slate-900">
              No graduates found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              No records match your current search and filter settings. Try
              another keyword or reset your filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
            >
              Reset search and filters
            </button>
          </section>
        )}

        <footer className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>HBC Graduate Directory</p>
          <p>
            Displayed records depend on the data currently available to this
            application.
          </p>
        </footer>
      </main>
    </AdminLayout>
  );
}
