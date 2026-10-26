import { useMemo, useState, useEffect, useRef } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import { students, tracks } from "../data/demoData.js";

const trackTones = [
  {
    icon: "fa-code",
    text: "text-violet-800",
    bg: "bg-violet-100",
    bar: "bg-violet-500",
  },
  {
    icon: "fa-bullhorn",
    text: "text-indigo-800",
    bg: "bg-indigo-100",
    bar: "bg-indigo-500",
  },
  {
    icon: "fa-store",
    text: "text-blue-800",
    bg: "bg-blue-100",
    bar: "bg-blue-500",
  },
  {
    icon: "fa-chart-column",
    text: "text-sky-800",
    bg: "bg-sky-100",
    bar: "bg-sky-500",
  },
  {
    icon: "fa-wand-magic-sparkles",
    text: "text-purple-800",
    bg: "bg-purple-100",
    bar: "bg-purple-500",
  },
];

export default function Participants() {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("All tracks");
  const [trackOpen, setTrackOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (trackRef.current && !trackRef.current.contains(event.target))
        setTrackOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") {
        setTrackOpen(false);
        setSelected(null);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const filtered = useMemo(
    () =>
      students.filter((s) => {
        const text =
          `${s.first} ${s.last} ${s.id} ${s.province} ${s.track} ${s.cohort}`.toLowerCase();
        return (
          (track === "All tracks" || s.track === track) &&
          text.includes(query.trim().toLowerCase())
        );
      }),
    [query, track],
  );

  return (
    <AdminLayout>
      <div className="mb-6 overflow-hidden border border-violet-100 bg-white shadow-sm">
        {/* The shared AdminLayout header is used above; no duplicate page header here. */}

        <div className="border-b border-violet-200 bg-[#f1edff] p-3 sm:p-4">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(250px,350px)]">
            <label className="flex min-w-0 items-center gap-3 border border-violet-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
              <i className="fa-solid fa-magnifying-glass text-violet-700" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search learner, ID, province or track..."
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="text-slate-400 hover:text-violet-700"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </label>
            <div
              ref={trackRef}
              className="relative border border-violet-200 bg-white shadow-sm"
            >
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={trackOpen}
                onClick={() => setTrackOpen((v) => !v)}
                className="flex min-h-[48px] w-full items-center gap-3 px-4 text-left"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-violet-700">
                  TRACK
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">
                  {track}
                </span>
                <i
                  className={`fa-solid fa-chevron-down text-xs text-violet-700 transition-transform ${trackOpen ? "rotate-180" : ""}`}
                />
              </button>
              {trackOpen && (
                <div
                  role="listbox"
                  aria-label="Filter by learning track"
                  className="absolute left-0 right-0 top-[calc(100%+5px)] z-30 border border-violet-100 bg-white p-1.5 shadow-xl"
                >
                  {["All tracks", ...tracks].map((item, i) => {
                    const tone = trackTones[i - 1];
                    return (
                      <button
                        key={item}
                        type="button"
                        role="option"
                        aria-selected={track === item}
                        onClick={() => {
                          setTrack(item);
                          setTrackOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition ${track === item ? "bg-violet-50 font-bold text-violet-900" : "text-slate-700 hover:bg-slate-50"}`}
                      >
                        <span
                          className={`grid h-7 w-7 place-items-center ${tone ? `${tone.bg} ${tone.text}` : "bg-violet-100 text-violet-700"}`}
                        >
                          <i
                            className={`fa-solid ${tone?.icon || "fa-layer-group"} text-xs`}
                          />
                        </span>
                        <span className="flex-1">
                          {item === "All tracks" ? "All learning tracks" : item}
                        </span>
                        {track === item && (
                          <i className="fa-solid fa-check text-violet-700" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="px-4 pb-5 pt-5 sm:px-6 sm:pt-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-violet-700">
                PARTICIPANT DIRECTORY
              </p>
              <h2 className="mt-1 text-xl font-black text-slate-900">
                All learners
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {(query || track !== "All tracks") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setTrack("All tracks");
                  }}
                  className="text-xs font-bold text-violet-700 hover:text-violet-900"
                >
                  <i className="fa-solid fa-rotate-left mr-1" /> Reset filters
                </button>
              )}
            </div>
          </div>

          {filtered.length ? (
            <div className="overflow-hidden border border-violet-100 bg-white shadow-sm">
              <div className="hidden grid-cols-[minmax(220px,1.35fr)_minmax(220px,1.5fr)_minmax(100px,.65fr)_100px_32px] gap-4 border-b border-violet-100 bg-[#faf9ff] px-4 py-3 text-[9px] font-extrabold uppercase tracking-[.15em] text-slate-500 sm:grid sm:px-5">
                <span>Learner</span>
                <span>Learning track</span>
                <span>Cohort</span>
                <span>Status</span>
                <span />
              </div>
              <div className="divide-y divide-slate-100">
                {filtered.map((s) => {
                  const idx = Math.max(0, tracks.indexOf(s.track));
                  const tone = trackTones[idx];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelected(s)}
                      className="group grid w-full grid-cols-1 gap-3 px-4 py-4 text-left transition hover:bg-violet-50/60 sm:grid-cols-[minmax(220px,1.35fr)_minmax(220px,1.5fr)_minmax(100px,.65fr)_100px_32px] sm:items-center sm:gap-4 sm:px-5"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className={`grid h-10 w-10 shrink-0 place-items-center text-xs font-extrabold ${tone.bg} ${tone.text}`}
                        >{`${s.first?.[0] || ""}${s.last?.[0] || ""}`}</span>
                        <span className="min-w-0">
                          <strong className="block truncate text-sm font-extrabold text-slate-900">
                            {s.first} {s.last}
                          </strong>
                          <small className="mt-1 block text-[11px] text-slate-500">
                            {s.id}{" "}
                            <span className="px-1 text-slate-300">·</span>{" "}
                            {s.province}
                          </small>
                        </span>
                      </span>
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center ${tone.bg} ${tone.text}`}
                        >
                          <i className={`fa-solid ${tone.icon} text-xs`} />
                        </span>
                        <span className="text-sm font-semibold text-slate-700">
                          {s.track}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <span className={`h-2 w-2 rounded-full ${tone.bar}`} />
                        {s.cohort}
                      </span>
                      <span>
                        <span className="inline-flex items-center gap-1.5 border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {s.status}
                        </span>
                      </span>
                      <span className="hidden text-right text-slate-400 transition group-hover:text-violet-700 sm:block">
                        <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-violet-100 bg-[#faf9ff] px-4 py-3 text-[10px] text-slate-500 sm:px-5">
                <span>Showing filtered participant records</span>
                <span className="font-bold tracking-wider text-violet-700">
                  HBC <span className="px-1 text-violet-300">•</span> LEARNER
                  RECORDS
                </span>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-violet-200 bg-white px-6 py-14 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center bg-violet-100 text-violet-700">
                <i className="fa-solid fa-magnifying-glass" />
              </span>
              <h3 className="mt-4 font-extrabold text-slate-900">
                No matching learners
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try another search or choose a different learning track.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTrack("All tracks");
                }}
                className="mt-4 bg-violet-800 px-4 py-2.5 text-xs font-bold text-white hover:bg-violet-900"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4"
          onClick={() => setSelected(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="participant-profile-title"
            className="relative w-full max-w-lg border border-violet-100 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#211632] via-[#4c1d95] to-[#6d28d9] p-6 text-white">
              <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-violet-200">
                LEARNER PROFILE
              </p>
              <h2
                id="participant-profile-title"
                className="mt-2 text-2xl font-black"
              >
                {selected.first} {selected.last}
              </h2>
              <p className="mt-1 text-sm text-violet-100">
                {selected.id} · {selected.province}
              </p>
            </div>
            <div className="grid gap-3 p-6 sm:grid-cols-2">
              {[
                ["Learning track", selected.track],
                ["Cohort", selected.cohort],
                ["Status", selected.status],
                ["Enrolment date", selected.enrolled],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border border-violet-100 bg-[#faf9ff] p-4"
                >
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {value || "Not provided"}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-end border-t border-slate-100 p-4">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="bg-violet-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-900"
              >
                Close profile
              </button>
            </div>
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
