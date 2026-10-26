import { Link } from "react-router-dom";
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
} from "../data/demoData.js";

const fmt = (value) => new Intl.NumberFormat("en-US").format(value);

const trackColors = [
  {
    bar: "from-violet-600 to-violet-400",
    badge: "bg-violet-50 text-violet-700",
    dot: "bg-violet-500",
  },
  {
    bar: "from-blue-600 to-sky-400",
    badge: "bg-sky-50 text-sky-700",
    dot: "bg-sky-500",
  },
  {
    bar: "from-emerald-600 to-teal-400",
    badge: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
  {
    bar: "from-amber-500 to-orange-400",
    badge: "bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
  },
  {
    bar: "from-fuchsia-600 to-pink-400",
    badge: "bg-fuchsia-50 text-fuchsia-700",
    dot: "bg-fuchsia-500",
  },
];

const statusStyle = (status) => {
  if (status === "Reviewed" || status === "Completed")
    return "bg-emerald-50 text-emerald-700 ring-emerald-600/10";
  if (status === "Submitted" || status === "In progress")
    return "bg-sky-50 text-sky-700 ring-sky-600/10";
  return "bg-amber-50 text-amber-700 ring-amber-600/10";
};

export default function Dashboard() {
  const attendanceRate = attendance.length
    ? Math.round(
        (attendance.filter((record) =>
          ["Present", "Late"].includes(record.status),
        ).length /
          attendance.length) *
          100,
      )
    : 0;
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const stats = [
    [
      "Participants",
      students.length,
      "fa-users",
      "bg-violet-50 text-violet-700",
      "/students",
    ],
    [
      "Graduates",
      graduates.length,
      "fa-graduation-cap",
      "bg-emerald-50 text-emerald-700",
      "/graduates",
    ],
    [
      "Projects",
      projects.length,
      "fa-diagram-project",
      "bg-sky-50 text-sky-700",
      "/projects",
    ],
    [
      "Internships",
      internships.length,
      "fa-briefcase",
      "bg-amber-50 text-amber-700",
      "/internships",
    ],
  ];
  // Dashboard demo distribution (adds up to the 25 participants shown above).
  // Keep this aligned with demoData.js if the sample participant records are changed.
  const demoTrackCounts = [8, 6, 5, 4, 2];
  const counts = tracks.map((track, index) => ({
    track,
    count:
      demoTrackCounts[index] ??
      students.filter((student) => student.track === track).length,
  }));
  const maxCount = Math.max(...counts.map((item) => item.count), 1);
  const totalTracked = counts.reduce((sum, item) => sum + item.count, 0);
  const recentProjects = projects.slice(0, 4);

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-violet-600">
            Programme overview
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            A clear overview of participants, learning activity and outcomes.
          </p>
        </div>
        <Link
          to="/reports"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
        >
          <i className="fa-solid fa-chart-column" /> View reports
        </Link>
      </div>

      {/* Keep the four existing summary cards and their design unchanged. */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, icon, tone, to], index) => (
          <Link
            to={to}
            key={label}
            className={`group relative isolate overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br ${
              [
                "from-[#180b2e] via-[#32105f] to-[#4c1d95]",
                "from-[#180b2e] via-[#32105f] to-[#4c1d95]",
                "from-[#180b2e] via-[#32105f] to-[#4c1d95]",
                "from-[#180b2e] via-[#32105f] to-[#4c1d95]",
              ][index]
            } p-5 text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-950/15`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-semibold text-violet-100">
                {label}
              </span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10 text-lg text-white">
                <i className={`fa-solid ${icon}`} />
              </span>
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tight text-white">
              {value}
            </div>
            <p className="mt-1 text-xs leading-5 text-violet-100/90">
              Across five learning tracks
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-3 text-xs font-semibold text-white/90">
              <span>View details</span>
              <i className="fa-solid fa-arrow-up-right-from-square transition group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-5 grid items-stretch gap-5 xl:grid-cols-[1.25fr_.75fr]">
        {/* Learning-track distribution */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900">
                Participants by learning track
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Current distribution across programme areas
              </p>
            </div>
            <span className="shrink-0 rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
              {tracks.length} tracks
            </span>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4 sm:p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Participants represented
                </p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  {fmt(totalTracked)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-700">
                {trackColors.map((color, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5"
                  >
                    <span className={`h-2 w-2 rounded-full ${color.dot}`} />
                    {index + 1}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative grid grid-cols-[26px_repeat(5,minmax(0,1fr))] items-end gap-x-2 sm:gap-x-4">
              <div className="pointer-events-none absolute inset-x-0 top-0 bottom-7 flex flex-col justify-between">
                {[10, 7.5, 5, 2.5, 0].map((tick) => (
                  <div key={tick} className="flex items-center gap-2">
                    <span className="w-6 shrink-0 text-right text-[10px] font-bold tabular-nums text-slate-800">
                      {tick}
                    </span>
                    <span className="h-px flex-1 border-t border-dashed border-slate-300" />
                  </div>
                ))}
              </div>
              <div className="relative z-10 h-32" aria-hidden="true" />
              {counts.map((item, index) => {
                const color = trackColors[index % trackColors.length];
                const height = Math.max(
                  8,
                  (item.count /
                    Math.max(...counts.map((entry) => entry.count), 10)) *
                    100,
                );
                return (
                  <div
                    key={item.track}
                    className="relative z-10 flex min-w-0 flex-col items-center"
                  >
                    <span className="mb-2 text-sm font-extrabold tabular-nums text-slate-950">
                      {item.count}
                    </span>
                    <div className="flex h-32 w-full max-w-16 items-end overflow-hidden rounded-t-xl bg-slate-100/80 p-0.5">
                      <div
                        className={`w-full rounded-t-lg bg-gradient-to-t ${color.bar} shadow-sm transition-all duration-500`}
                        style={{ height: `${height}%` }}
                        title={`${item.track}: ${item.count} participants`}
                      />
                    </div>
                    <span className="mt-2 whitespace-nowrap text-xs font-extrabold text-slate-900">
                      Track {index + 1}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-center text-xs font-medium text-slate-600">
              Distribution across the five learning tracks
            </p>
          </div>

          <div className="mt-4 space-y-1.5">
            {counts.map((item, index) => {
              const color = trackColors[index % trackColors.length];
              const share = totalTracked
                ? Math.round((item.count / totalTracked) * 100)
                : 0;
              return (
                <div
                  key={item.track}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 rounded-xl px-2.5 py-2 transition hover:bg-slate-50"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${color.dot}`}
                    />
                    <span className="truncate text-sm font-semibold text-slate-800">
                      {item.track}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden text-xs text-slate-400 sm:inline">
                      {share}%
                    </span>
                    <span className="min-w-5 text-right text-sm font-semibold tabular-nums text-slate-900">
                      {item.count}
                    </span>
                  </div>
                  <div className="col-span-2 ml-5 h-2.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${color.bar}`}
                      style={{ width: `${share}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact operational snapshot: useful content fills the panel without empty space. */}
        <div className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 pb-6 shadow-sm sm:p-6 sm:pb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.12em] text-violet-600">
              At a glance
            </p>
            <h3 className="mt-1 font-bold text-slate-900">
              Programme snapshot
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Key operational indicators
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-stretch">
            <div className="group flex min-h-[170px] flex-col rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-violet-100/70 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-200 text-violet-950 shadow-sm ring-1 ring-violet-300">
                <i className="fa-solid fa-calendar-check text-lg" />
              </span>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-violet-800">
                Attendance
              </span>
              <p className="mt-2 text-xs font-semibold text-slate-600">
                Attendance rate
              </p>
              <p className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">
                {attendanceRate}%
              </p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-violet-200">
                <div
                  className="h-full rounded-full bg-violet-800"
                  style={{ width: `${attendanceRate}%` }}
                />
              </div>
            </div>
            <div className="group flex min-h-[170px] flex-col rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-blue-100/70 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-sm ring-1 ring-sky-200">
                <i className="fa-solid fa-chalkboard-user text-lg" />
              </span>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-sky-800">
                Team
              </span>
              <p className="mt-2 text-xs font-semibold text-slate-600">
                Instructors
              </p>
              <p className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">
                {instructors.length}
              </p>
              <p className="mt-1 text-[11px] leading-4 text-slate-500">
                Supporting programme delivery
              </p>
            </div>
            <div className="group flex min-h-[170px] flex-col rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-100/70 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-sm ring-1 ring-amber-200">
                <i className="fa-solid fa-wallet text-lg" />
              </span>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Finance
              </span>
              <p className="mt-2 text-xs font-semibold text-slate-600">
                Recorded expenses
              </p>
              <p className="mt-0.5 text-xl font-bold tracking-tight text-slate-900">
                AFN {fmt(totalExpenses)}
              </p>
              <p className="mt-1 text-[11px] leading-4 text-slate-500">
                Logged programme costs
              </p>
            </div>
            <div className="group flex min-h-[170px] flex-col rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-100/70 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-sm ring-1 ring-emerald-200">
                <i className="fa-solid fa-diagram-project text-lg" />
              </span>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Outcomes
              </span>
              <p className="mt-2 text-xs font-semibold text-slate-600">
                Projects recorded
              </p>
              <p className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">
                {projects.length}
              </p>
              <p className="mt-1 text-[11px] leading-4 text-slate-500">
                Practical work submitted
              </p>
            </div>
          </div>

          <Link
            to="/attendance"
            className="mt-auto flex min-h-[104px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-violet-900/20 bg-violet-800 px-4 py-5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            <i
              className="fa-solid fa-calendar-check text-2xl"
              aria-hidden="true"
            />
            <span>Review attendance records</span>
            <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </AdminLayout>
  );
}
