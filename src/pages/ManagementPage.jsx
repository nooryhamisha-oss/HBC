import { useMemo, useState, useRef, useEffect } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import {
  tracks,
  students,
  graduates,
  projects,
  internships,
  attendance,
  instructors,
  expenses,
  dailyReports,
  holidays,
  resources,
} from "../data/demoData.js";

const config = {
  "/find-instructor": {
    title: "Instructors",
    eyebrow: "PEOPLE & CAPABILITY",
    subtitle: "Meet the people guiding every learning journey.",
    data: instructors,
    columns: [
      ["id", "Instructor ID"],
      ["name", "Name"],
      ["track", "Learning track"],
      ["education", "Education"],
      ["experience", "Experience"],
      ["sessions", "Sessions"],
      ["cohort", "Cohort"],
    ],
  },
  "/students": {
    title: "Participants",
    eyebrow: "PEOPLE FIRST · PROGRAMME OPERATIONS",
    subtitle: "A people-first view of every learner in the HBC programme.",
    data: students,
    columns: [
      ["id", "Student ID"],
      ["first", "First name"],
      ["last", "Last name"],
      ["province", "Province"],
      ["track", "Learning track"],
      ["cohort", "Cohort"],
      ["status", "Status"],
    ],
  },
  "/graduates": {
    title: "Graduates",
    eyebrow: "OUTCOMES & ALUMNI",
    subtitle: "Celebrate learner progress and explore completed projects.",
    data: graduates,
    columns: [
      ["id", "Student ID"],
      ["first", "First name"],
      ["last", "Last name"],
      ["province", "Province"],
      ["track", "Learning track"],
      ["cohort", "Cohort"],
      ["project", "Final project"],
      ["result", "Status"],
    ],
  },
  "/projects": {
    title: "Projects",
    eyebrow: "PRACTICAL LEARNING",
    subtitle: "Discover the work learners are building across the programme.",
    data: projects,
    columns: [
      ["id", "Project ID"],
      ["title", "Project"],
      ["student", "Participant"],
      ["track", "Learning track"],
      ["instructor", "Instructor"],
      ["date", "Submission"],
      ["status", "Status"],
    ],
  },
  "/internships": {
    title: "Internships",
    eyebrow: "PATHWAYS TO WORK",
    subtitle: "Follow referrals, placements and practical experience.",
    data: internships,
    columns: [
      ["id", "Placement ID"],
      ["student", "Participant"],
      ["track", "Learning track"],
      ["host", "Host organisation"],
      ["role", "Role"],
      ["province", "Province"],
      ["status", "Status"],
    ],
  },
  "/attendance": {
    title: "Attendance",
    eyebrow: "PARTICIPATION & DELIVERY",
    subtitle: "Understand participation patterns across sessions and cohorts.",
    data: attendance,
    columns: [
      ["date", "Date"],
      ["student", "Participant"],
      ["track", "Learning track"],
      ["cohort", "Cohort"],
      ["status", "Attendance"],
    ],
  },
  "/instructors": {
    title: "Instructors",
    eyebrow: "PEOPLE & CAPABILITY",
    subtitle: "Meet the people guiding every learning journey.",
    data: instructors,
    columns: [
      ["id", "Instructor ID"],
      ["name", "Name"],
      ["track", "Learning track"],
      ["education", "Education"],
      ["experience", "Experience"],
      ["sessions", "Sessions"],
      ["cohort", "Cohort"],
    ],
  },
  "/reports": {
    title: "Reports & expenses",
    eyebrow: "PROGRAMME INTELLIGENCE",
    subtitle: "A clear view of delivery, attendance and operational spending.",
    data: expenses,
    columns: [
      ["date", "Date"],
      ["track", "Learning track"],
      ["category", "Expense category"],
      ["amount", "Amount (AFN)"],
      ["status", "Approval"],
    ],
  },
  "/find-materials": {
    title: "Learning resources",
    eyebrow: "KNOWLEDGE LIBRARY",
    subtitle: "Find useful guides and learning materials by track.",
    data: resources,
    columns: [
      ["id", "ID"],
      ["title", "Resource"],
      ["track", "Learning track"],
      ["type", "Type"],
      ["language", "Language"],
      ["source", "Source"],
      ["status", "Status"],
    ],
  },
};
const money = (n) => new Intl.NumberFormat("en-US").format(n || 0);
const initials = (row) =>
  (
    row.name ||
    `${row.first || ""} ${row.last || ""}` ||
    row.student ||
    row.title ||
    "HBC"
  )
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((x) => x[0])
    .join("")
    .toUpperCase();
const displayName = (row) =>
  row.name ||
  `${row.first || ""} ${row.last || ""}`.trim() ||
  row.student ||
  row.title ||
  row.id ||
  "Record";
function Status({ value }) {
  const v = String(value || "Not set");
  const tone =
    /present|completed|reviewed|available|approved|active|placed/i.test(v)
      ? "bg-emerald-100 text-emerald-800"
      : /absent|pending|late|progress|referred|planned/i.test(v)
        ? "bg-amber-100 text-amber-800"
        : "bg-violet-100 text-violet-800";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${tone}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {v}
    </span>
  );
}
function TrackPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const root = useRef(null);
  useEffect(() => {
    const close = (e) => {
      if (root.current && !root.current.contains(e.target)) setOpen(false);
    };
    const key = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", key);
    };
  }, []);
  const options = ["All tracks", ...tracks].filter((t) =>
    t.toLowerCase().includes(term.toLowerCase()),
  );
  return (
    <div ref={root} className="relative w-full">
      <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[.15em] text-slate-500">
        Learning track
      </label>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`flex min-h-[46px] w-full items-center justify-between gap-3 rounded-xl bg-white px-3.5 text-left text-sm font-semibold text-slate-800 shadow-sm ring-1 transition ${open ? "ring-violet-500 shadow-violet-100" : "ring-slate-200 hover:ring-violet-300"}`}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-violet-100 text-violet-700">
            <i className="fa-solid fa-layer-group text-xs" />
          </span>
          <span className="truncate">{value}</span>
        </span>
        <i
          className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          className="absolute right-0 z-40 mt-2 w-full overflow-hidden rounded-2xl bg-white p-2 shadow-[0_18px_55px_-15px_rgba(35,20,70,.28)] ring-1 ring-violet-100"
          role="listbox"
          aria-label="Filter by learning track"
        >
          <div className="relative mb-1.5">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
            <input
              autoFocus
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Find a learning track"
              className="h-9 w-full rounded-lg bg-slate-50 pl-8 pr-3 text-xs outline-none ring-1 ring-transparent focus:bg-white focus:ring-violet-300"
            />
          </div>
          <div className="max-h-64 space-y-1 overflow-y-auto">
            {options.map((option, i) => (
              <button
                type="button"
                role="option"
                aria-selected={value === option}
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                  setTerm("");
                }}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs transition ${value === option ? "bg-violet-600 font-bold text-white" : "text-slate-700 hover:bg-violet-50 hover:text-violet-800"}`}
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg ${value === option ? "bg-white/15" : "bg-slate-100 text-slate-500"}`}
                >
                  <i
                    className={`fa-solid ${option === "All tracks" ? "fa-grid-2" : "fa-book-open"} text-[10px]`}
                  />
                </span>
                <span className="flex-1">{option}</span>
                {value === option && (
                  <i className="fa-solid fa-check text-[10px]" />
                )}
              </button>
            ))}
            {options.length === 0 && (
              <p className="px-3 py-5 text-center text-xs text-slate-500">
                No tracks match your search.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default function ManagementPage() {
  const path = window.location.pathname;
  const c = config[path] || config["/students"];
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("All tracks");
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("cards");
  const data = useMemo(
    () =>
      c.data.filter((r) => {
        const hay = Object.values(r).join(" ").toLowerCase();
        return (
          hay.includes(query.toLowerCase()) &&
          (track === "All tracks" || r.track === track)
        );
      }),
    [c, query, track],
  );
  const attendanceRate = attendance.length
    ? Math.round(
        (attendance.filter((a) => a.status === "Present" || a.status === "Late")
          .length /
          attendance.length) *
          100,
      )
    : 0;
  const expenseTotal = expenses.reduce((sum, e) => sum + e.amount, 0);
  const peoplePage = [
    "/students",
    "/graduates",
    "/instructors",
    "/find-instructor",
  ].includes(path);
  return (
    <AdminLayout>
      {path === "/reports" && (
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-3xl bg-[#241044] p-5 text-white sm:p-7">
            <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border-[34px] border-white/[0.06]" />
            <div className="absolute -bottom-20 right-28 h-44 w-44 rounded-full bg-violet-500/10 blur-2xl" />
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-violet-200">
                  <i className="fa-solid fa-chart-line" />
                  Monthly programme review
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Reports & expenses
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-6 text-violet-100/80">
                  Review delivery, programme spending and the two-stage
                  participant payment cycle.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.08] p-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-violet-200">
                  <i className="fa-solid fa-calendar-days text-lg" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-violet-200">
                    Report period
                  </p>
                  <p className="mt-1 text-sm font-extrabold">
                    Monthly · October 2026
                  </p>
                </div>
              </div>
            </div>
            <div className="relative mt-6 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="rounded-lg bg-white/10 px-3 py-2 font-semibold text-white/90">
                <i className="fa-solid fa-circle-info mr-1.5 text-violet-200" />
                Prototype data
              </span>
              <span className="rounded-lg bg-white/10 px-3 py-2 text-white/75">
                Amounts in AFN
              </span>
              <span className="rounded-lg bg-white/10 px-3 py-2 text-white/75">
                Payments require verified attendance
              </span>
            </div>
          </section>

          <div className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
            <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200/80 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-violet-700">
                    Payment cycle
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-slate-900">
                    Four-month payment schedule
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Two instalments, each linked to the relevant two-month
                    period.
                  </p>
                </div>
                <span className="rounded-lg bg-violet-50 px-3 py-1.5 text-[10px] font-bold text-violet-800">
                  Attendance threshold: &gt;80%
                </span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="relative rounded-2xl border border-violet-200 bg-violet-50/70 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-700 text-white">
                      <i className="fa-solid fa-calendar-check" />
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-violet-800">
                      Instalment 01
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-extrabold text-slate-900">
                    After months 1–2
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Calculate eligible sessions and verify attendance before
                    payment.
                  </p>
                  <div className="mt-4 border-t border-violet-200 pt-3 text-[11px] font-semibold text-violet-800">
                    Status: awaiting verified records
                  </div>
                </div>
                <div className="relative rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-700 text-white">
                      <i className="fa-solid fa-flag-checkered" />
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-indigo-800">
                      Instalment 02
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-extrabold text-slate-900">
                    At the end of months 3–4
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Recheck the second period’s attendance and calculate its
                    eligible payment.
                  </p>
                  <div className="mt-4 border-t border-indigo-200 pt-3 text-[11px] font-semibold text-indigo-800">
                    Status: upcoming period
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2 rounded-xl bg-slate-50 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  Session rate
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                    <i className="fa-solid fa-laptop mr-1.5 text-violet-700" />
                    Online · 30 AFN
                  </span>
                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                    <i className="fa-solid fa-location-dot mr-1.5 text-indigo-700" />
                    In-person · 40 AFN
                  </span>
                </div>
              </div>
              <p className="mt-3 text-[11px] leading-5 text-slate-500">
                Exactly 80% attendance does not meet the current rule. This
                prototype does not calculate individual entitlements because
                verified per-student session totals are not available in the
                current data.
              </p>
            </section>

            <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200/80 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-orange-700">
                    Expense breakdown
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-slate-900">
                    Spending by category
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    From currently loaded prototype records
                  </p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-700">
                  <i className="fa-solid fa-wallet" />
                </span>
              </div>
              {(() => {
                const categories = [...new Set(expenses.map((e) => e.category))]
                  .map((category) => ({
                    category,
                    total: expenses
                      .filter((e) => e.category === category)
                      .reduce((sum, e) => sum + (Number(e.amount) || 0), 0),
                  }))
                  .sort((a, b) => b.total - a.total);
                const max = Math.max(
                  1,
                  ...categories.map((item) => item.total),
                );
                return (
                  <div className="mt-6 space-y-5">
                    {categories.map((item, index) => (
                      <div key={item.category}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-xs font-bold text-slate-700">
                            {item.category}
                          </span>
                          <span className="whitespace-nowrap text-xs font-extrabold text-slate-900">
                            AFN {money(item.total)}
                          </span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${index === 0 ? "bg-violet-600" : index === 1 ? "bg-orange-500" : "bg-cyan-600"}`}
                            style={{ width: `${(item.total / max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-500">
                    Recorded expenses
                  </span>
                  <span className="text-xl font-extrabold tracking-tight text-slate-900">
                    AFN {money(expenseTotal)}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-slate-400">
                  Demo figures only — verify against receipts before reporting.
                </p>
              </div>
            </section>
          </div>

          <section className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200/80">
            <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-slate-500">
                  Operations ledger
                </p>
                <h3 className="mt-1 text-lg font-extrabold text-slate-900">
                  Recent expenses
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  A straightforward ledger instead of another filter-heavy
                  directory.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
                <i className="fa-solid fa-receipt text-violet-700" />{" "}
                {expenses.length} prototype entries
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">
                <thead className="bg-slate-50">
                  <tr className="text-[10px] font-extrabold uppercase tracking-[.12em] text-slate-500">
                    <th className="px-5 py-3.5">Expense ID</th>
                    <th className="px-5 py-3.5">Date</th>
                    <th className="px-5 py-3.5">Category / track</th>
                    <th className="px-5 py-3.5 text-right">Amount</th>
                    <th className="px-5 py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...expenses]
                    .sort((a, b) =>
                      String(b.date).localeCompare(String(a.date)),
                    )
                    .slice(0, 8)
                    .map((expense) => (
                      <tr
                        key={expense.id}
                        className="transition hover:bg-violet-50/40"
                      >
                        <td className="px-5 py-4 text-xs font-extrabold text-violet-800">
                          {expense.id}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-slate-600">
                          {expense.date}
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-xs font-bold text-slate-800">
                            {expense.category}
                          </p>
                          <p className="mt-1 max-w-[240px] truncate text-[10px] text-slate-500">
                            {expense.track}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right text-xs font-extrabold text-slate-900">
                          AFN {money(expense.amount)}
                        </td>
                        <td className="px-5 py-4">
                          <Status value={expense.status} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-3.5">
              <p className="text-[10px] leading-5 text-slate-500">
                Only the latest eight entries are shown here. The underlying
                sample data remains unchanged.
              </p>
              <span className="text-[10px] font-bold text-slate-400">
                HBC · Reports
              </span>
            </div>
          </section>

          <section className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-violet-700 ring-1 ring-slate-200">
                <i className="fa-solid fa-clipboard-check" />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Monthly reporting checklist
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Use this sequence before treating the report as official.
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                [
                  "01",
                  "Verify attendance",
                  "Confirm each participant’s monthly attendance percentage.",
                ],
                [
                  "02",
                  "Calculate eligibility",
                  "Apply the above-80% rule and the correct per-session rate.",
                ],
                [
                  "03",
                  "Reconcile expenses",
                  "Check amounts against receipts and label sample records clearly.",
                ],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="flex gap-3 rounded-xl bg-white p-3.5 ring-1 ring-slate-200/70"
                >
                  <span className="text-xs font-extrabold text-violet-700">
                    {number}
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-slate-800">
                      {title}
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
      {path !== "/reports" && (
        <section className="w-full overflow-visible bg-white">
          <div className="border-b border-slate-200 pb-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
              <div className="flex min-w-[190px] items-center gap-3 xl:mr-auto">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700">
                  <i
                    className={`fa-solid ${peoplePage ? "fa-users" : path === "/projects" ? "fa-lightbulb" : path === "/attendance" ? "fa-calendar-check" : path === "/find-materials" ? "fa-book-open" : "fa-folder-open"}`}
                  />
                </span>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    {path === "/students"
                      ? "Participant directory"
                      : `${c.title} directory`}
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Showing{" "}
                    <strong className="text-violet-700">{data.length}</strong>{" "}
                    of {c.data.length} records
                  </p>
                </div>
              </div>
              <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-[minmax(180px,1fr)_minmax(220px,270px)_100px] sm:items-end xl:max-w-[850px]">
                <div className="min-w-0">
                  <label
                    htmlFor="record-search"
                    className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[.15em] text-slate-500"
                  >
                    Search records
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-violet-600" />
                    <input
                      id="record-search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Name, ID, province..."
                      className="h-[44px] w-full rounded-xl bg-slate-50 pl-10 pr-10 text-sm text-slate-800 ring-1 ring-slate-200 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-violet-400"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-700"
                      >
                        <i className="fa-solid fa-xmark" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="min-w-0">
                  <TrackPicker value={track} onChange={setTrack} />
                </div>
                <div>
                  <span className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[.15em] text-slate-500">
                    Display
                  </span>
                  <div className="flex h-[44px] w-[100px] items-center rounded-xl bg-slate-100 p-1 ring-1 ring-slate-200">
                    <button
                      type="button"
                      aria-label="Card view"
                      title="Card view"
                      aria-pressed={view === "cards"}
                      onClick={() => setView("cards")}
                      className={`grid h-full min-w-0 flex-1 place-items-center rounded-lg transition ${view === "cards" ? "bg-violet-700 text-white shadow-sm" : "text-slate-500 hover:bg-white hover:text-violet-700"}`}
                    >
                      <i className="fa-solid fa-grip text-sm" />
                    </button>
                    <button
                      type="button"
                      aria-label="List view"
                      title="List view"
                      aria-pressed={view === "list"}
                      onClick={() => setView("list")}
                      className={`grid h-full min-w-0 flex-1 place-items-center rounded-lg transition ${view === "list" ? "bg-violet-700 text-white shadow-sm" : "text-slate-500 hover:bg-white hover:text-violet-700"}`}
                    >
                      <i className="fa-solid fa-list text-sm" />
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelected({ newRecord: true })}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-violet-800 xl:self-end"
              >
                <i className="fa-solid fa-plus" /> Add record
              </button>
            </div>
            {(query || track !== "All tracks") && (
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => {
                    setQuery("");
                    setTrack("All tracks");
                  }}
                  className="rounded-lg px-2 py-1.5 text-xs font-bold text-violet-700 transition hover:bg-violet-50"
                >
                  <i className="fa-solid fa-rotate-left mr-1.5" />
                  Clear filters
                </button>
              </div>
            )}
          </div>
          <div className="py-5 sm:py-6">
            {data.length === 0 ? (
              <div className="rounded-2xl bg-violet-50/70 px-5 py-14 text-center ring-1 ring-dashed ring-violet-200">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet-100 text-xl text-violet-700">
                  <i className="fa-solid fa-magnifying-glass" />
                </div>
                <p className="mt-4 font-extrabold text-slate-800">
                  No matching records
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try another keyword or clear the selected filters.
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setTrack("All tracks");
                  }}
                  className="mt-4 rounded-xl bg-violet-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-violet-800"
                >
                  Reset filters
                </button>
              </div>
            ) : view === "cards" ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {data.map((r, i) => (
                  <article
                    key={r.id || `${displayName(r)}-${i}`}
                    className={`group relative flex min-w-0 flex-col overflow-hidden rounded-2xl bg-[#f1ebff] p-4 shadow-[0_4px_18px_-12px_rgba(76,29,149,.24)] ring-1 ring-violet-200/80 transition duration-200 hover:bg-[#ece3ff] hover:shadow-md ${data.length % 2 === 1 && i === data.length - 1 ? "md:col-span-2 md:flex-row md:items-center md:gap-6" : ""}`}
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-violet-700 text-sm font-extrabold text-white shadow-sm">
                        {initials(r)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-[.12em] text-violet-800/75">
                            {r.id || `RECORD ${String(i + 1).padStart(2, "0")}`}
                          </span>
                          <Status value={r.status || r.result || "Active"} />
                        </div>
                        <h4 className="mt-1 truncate text-base font-extrabold text-slate-900">
                          {displayName(r)}
                        </h4>
                        <p className="mt-1 text-xs text-slate-600">
                          {r.province ||
                            r.cohort ||
                            r.date ||
                            r.role ||
                            r.type ||
                            "HBC programme"}
                        </p>
                      </div>
                    </div>
                    {r.track && (
                      <div
                        className={`mt-4 flex min-w-0 items-start gap-2 rounded-xl border border-violet-200/70 bg-white/75 px-3 py-2.5 ${data.length % 2 === 1 && i === data.length - 1 ? "md:mt-0 md:flex-1" : ""}`}
                      >
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-violet-100 text-violet-700">
                          <i className="fa-solid fa-book-open text-[10px]" />
                        </span>
                        <span className="text-xs font-bold leading-5 text-slate-700">
                          {r.track}
                        </span>
                      </div>
                    )}
                    <div
                      className={`mt-3 flex items-center justify-between gap-3 border-t border-violet-200/80 pt-3 ${data.length % 2 === 1 && i === data.length - 1 ? "md:mt-0 md:w-[210px] md:shrink-0 md:border-l md:border-t-0 md:pl-5 md:pt-0" : ""}`}
                    >
                      <span className="truncate text-[11px] font-medium text-slate-500">
                        {r.cohort ||
                          r.host ||
                          r.instructor ||
                          r.category ||
                          r.language ||
                          r.education ||
                          r.date ||
                          "Programme record"}
                      </span>
                      <button
                        onClick={() => setSelected(r)}
                        className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-extrabold text-violet-800 transition hover:bg-white"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square mr-1 text-[10px]" />
                        Explore record
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {data.map((r, i) => (
                  <button
                    key={r.id || i}
                    onClick={() => setSelected(r)}
                    className="flex w-full items-center gap-3 rounded-xl bg-violet-50 p-3 text-left transition hover:bg-violet-100"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-700 text-xs font-extrabold text-white">
                      {initials(r)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-extrabold text-slate-900">
                        {displayName(r)}
                      </span>
                      <span className="mt-1 block truncate text-xs text-slate-500">
                        {r.track ||
                          r.category ||
                          r.province ||
                          r.date ||
                          "Programme record"}
                      </span>
                    </span>
                    <span className="hidden sm:block">
                      <Status value={r.status || r.result || "Active"} />
                    </span>
                    <i className="fa-solid fa-arrow-right text-xs text-violet-600" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#160b2b]/55 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="record-title"
            className="h-auto max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl [scrollbar-color:#8b5cf6_#f3e8ff] [scrollbar-width:thin]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden bg-gradient-to-r from-[#4c1d95] to-[#6d28d9] p-6 text-white sm:p-8">
              <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[30px] border-white/10" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-violet-200">
                    Programme record
                  </p>
                  <h3
                    id="record-title"
                    className="mt-2 text-2xl font-extrabold"
                  >
                    {selected.newRecord
                      ? "Add a record"
                      : displayName(selected)}
                  </h3>
                  <p className="mt-1 text-sm text-violet-100">
                    {selected.track || c.title}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 text-white transition hover:bg-white/25"
                  aria-label="Close details"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
            </div>
            <div className="p-5 sm:p-7">
              {selected.newRecord ? (
                <div className="rounded-2xl bg-violet-50 p-4 text-sm leading-6 text-violet-900">
                  <i className="fa-solid fa-circle-info mr-2" />
                  This prototype demonstrates the record workflow with local
                  sample data. Saving permanent records requires a connected
                  backend.
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(selected)
                    .filter(([k]) => k !== "newRecord")
                    .map(([k, v], i) => (
                      <div
                        key={k}
                        className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100"
                      >
                        <p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-slate-500">
                          {k.replace(/([A-Z])/g, " $1")}
                        </p>
                        <p className="mt-1.5 break-words text-sm font-bold text-slate-800">
                          {String(v ?? "—")}
                        </p>
                      </div>
                    ))}
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-800"
                >
                  Close
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
