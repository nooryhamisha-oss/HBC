import { useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import { instructors } from "../data/demoData.js";

const learningTracks = [
  "Web Development & Coding",
  "Data Analytics & Bookkeeping",
  "AI Tools & Digital Services",
  "Digital Marketing & Content",
  "E-Commerce & Freelancing",
];

const mentors = [
  {
    id: "mentor-1",
    name: "Forozan Hakimi",
    role: "Web Development Mentor",
    track: learningTracks[0],
    initials: "FH",
    color: "bg-teal-100 text-teal-700",
    responsibilities: [
      "Monitor student attendance",
      "Support students with learning difficulties",
      "Track learning progress",
    ],
  },
  {
    id: "mentor-2",
    name: "Maryam Barizans",
    role: "Learning Support Mentor",
    track: learningTracks[3],
    initials: "MB",
    color: "bg-purple-100 text-purple-700",
    responsibilities: [
      "Monitor student attendance",
      "Provide learning support",
      "Follow up on assignments",
    ],
  },
  {
    id: "mentor-3",
    name: "مقدسه وزیری",
    role: "Student Support Mentor",
    track: learningTracks[2],
    initials: "MW",
    color: "bg-amber-100 text-amber-700",
    responsibilities: [
      "Monitor learning activities",
      "Identify student challenges",
      "Support student progress",
    ],
  },
];

const fallbackInstructors = [
  {
    id: "fallback-web",
    name: "Shaqayq Darwazi",
    role: "Web Development Instructor",
    track: learningTracks[0],
    qualification: "To be confirmed",
    experience: "To be confirmed",
    sessions: "—",
  },
  {
    id: "fallback-data",
    name: "Instructor to be assigned",
    role: "Data Analytics Instructor",
    track: learningTracks[1],
    qualification: "To be confirmed",
    experience: "To be confirmed",
    sessions: "—",
  },
  {
    id: "fallback-ai",
    name: "Instructor to be assigned",
    role: "AI Tools Instructor",
    track: learningTracks[2],
    qualification: "To be confirmed",
    experience: "To be confirmed",
    sessions: "—",
  },
  {
    id: "fallback-marketing",
    name: "Instructor to be assigned",
    role: "Digital Marketing Instructor",
    track: learningTracks[3],
    qualification: "To be confirmed",
    experience: "To be confirmed",
    sessions: "—",
  },
  {
    id: "fallback-ecommerce",
    name: "Instructor to be assigned",
    role: "E-Commerce Instructor",
    track: learningTracks[4],
    qualification: "To be confirmed",
    experience: "To be confirmed",
    sessions: "—",
  },
];

const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export default function Instructors() {
  const [search, setSearch] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("All Tracks");
  const [sortBy, setSortBy] = useState("name");
  const [activeTab, setActiveTab] = useState("all");

  const instructorRecords = useMemo(() => {
    const existing = Array.isArray(instructors) ? instructors : [];

    const records = existing.map((person, index) => ({
      ...person,
      id: person.id ?? `instructor-${index}`,
      name: person.name ?? "Unnamed Instructor",
      role: person.role ?? "Instructor",
      track: person.track ?? person.course ?? person.specialization ?? "",
      qualification: person.qualification ?? "To be confirmed",
      experience: person.experience ?? "To be confirmed",
      sessions: person.sessions ?? "—",
    }));

    fallbackInstructors.forEach((fallback) => {
      const hasTrack = records.some(
        (person) => normalize(person.track) === normalize(fallback.track),
      );

      if (!hasTrack) {
        records.push(fallback);
      }
    });

    return records;
  }, []);

  const filteredInstructors = useMemo(() => {
    const query = normalize(search);

    return instructorRecords
      .filter((person) => {
        const searchableText = [
          person.name,
          person.role,
          person.track,
          person.qualification,
          person.experience,
        ]
          .map(normalize)
          .join(" ");

        const matchesSearch = !query || searchableText.includes(query);

        const matchesTrack =
          selectedTrack === "All Tracks" ||
          normalize(person.track) === normalize(selectedTrack);

        return matchesSearch && matchesTrack;
      })
      .sort((a, b) => {
        if (sortBy === "track") {
          return a.track.localeCompare(b.track);
        }

        return a.name.localeCompare(b.name);
      });
  }, [instructorRecords, search, selectedTrack, sortBy]);

  const filteredMentors = useMemo(() => {
    const query = normalize(search);

    return mentors.filter((mentor) => {
      const searchableText = [
        mentor.name,
        mentor.role,
        mentor.track,
        ...mentor.responsibilities,
      ]
        .map(normalize)
        .join(" ");

      const matchesSearch = !query || searchableText.includes(query);

      const matchesTrack =
        selectedTrack === "All Tracks" ||
        normalize(mentor.track) === normalize(selectedTrack);

      return matchesSearch && matchesTrack;
    });
  }, [search, selectedTrack]);

  const showInstructors = activeTab !== "mentors";
  const showMentors = activeTab !== "instructors";

  const clearFilters = () => {
    setSearch("");
    setSelectedTrack("All Tracks");
    setSortBy("name");
    setActiveTab("all");
  };

  return (
    <AdminLayout>
      <main className="min-h-screen space-y-7 bg-[#f7f5fc] p-4 text-slate-800 sm:p-6 lg:p-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#34205f] via-[#56358c] to-[#7453ae] p-6 text-white shadow-xl sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border-[30px] border-white/10" />

          <div className="relative z-10">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-purple-100">
              <i className="fa-solid fa-users" />
              HBC TRAINING PROGRAM
            </span>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Instructors & Mentors
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-purple-100 sm:text-base">
              Manage instructors, mentors, learning tracks, and student support
              across the HBC training program.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            title="Instructors"
            value={instructorRecords.length}
            description="Teaching and technical instruction"
            icon="fa-chalkboard-user"
            theme="purple"
          />

          <StatCard
            title="Mentors"
            value={mentors.length}
            description="Attendance and student learning support"
            icon="fa-hands-holding-circle"
            theme="teal"
          />

          <StatCard
            title="Learning Tracks"
            value={learningTracks.length}
            description="Available program learning tracks"
            icon="fa-layer-group"
            theme="amber"
          />
        </section>

        <section className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(220px,1.5fr)_minmax(220px,1fr)_minmax(180px,0.8fr)]">
            <div>
              <label
                htmlFor="team-search"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                Search Team
              </label>

              <div className="relative">
                <i className="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-purple-600" />

                <input
                  id="team-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, role, or track..."
                  className="w-full rounded-xl border border-purple-200 bg-gradient-to-r from-white to-purple-50 py-3.5 pl-11 pr-4 text-sm text-slate-700 shadow-sm outline-none transition hover:border-purple-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="track-filter"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                Learning Track
              </label>

              <div className="relative">
                <i className="fa-solid fa-layer-group pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-purple-600" />

                <select
                  id="track-filter"
                  value={selectedTrack}
                  onChange={(event) => setSelectedTrack(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-purple-200 bg-gradient-to-r from-white to-purple-50 py-3.5 pl-11 pr-11 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                >
                  <option value="All Tracks">All Tracks</option>

                  {learningTracks.map((track) => (
                    <option key={track} value={track}>
                      {track}
                    </option>
                  ))}
                </select>

                <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-purple-600" />
              </div>
            </div>

            <div>
              <label
                htmlFor="sort-filter"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                Sort Results
              </label>

              <div className="relative">
                <i className="fa-solid fa-arrow-down-a-z pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-teal-600" />

                <select
                  id="sort-filter"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-teal-200 bg-gradient-to-r from-white to-teal-50 py-3.5 pl-11 pr-11 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-teal-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                >
                  <option value="name">Sort by name</option>
                  <option value="track">Sort by track</option>
                </select>

                <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-teal-600" />
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
            {[
              { id: "all", label: "All Team", icon: "fa-users" },
              {
                id: "instructors",
                label: "Instructors",
                icon: "fa-chalkboard-user",
              },
              {
                id: "mentors",
                label: "Mentors",
                icon: "fa-hands-holding-circle",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-[#56358c] text-white shadow-md shadow-purple-200"
                    : "bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-700"
                }`}
              >
                <i className={`fa-solid ${tab.icon}`} />
                {tab.label}
              </button>
            ))}

            {(search ||
              selectedTrack !== "All Tracks" ||
              sortBy !== "name") && (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
              >
                <i className="fa-solid fa-rotate-left mr-2" />
                Reset
              </button>
            )}
          </div>
        </section>

        {showInstructors && (
          <section className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#3d2868]">
                  <i className="fa-solid fa-chalkboard-user mr-2 text-purple-600" />
                  Instructor Directory
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Teaching team and learning track assignments
                </p>
              </div>

              <span className="w-fit rounded-lg bg-purple-100 px-3 py-1.5 text-xs font-bold text-purple-700">
                {filteredInstructors.length} Instructors
              </span>
            </div>

            {filteredInstructors.length === 0 ? (
              <EmptyState onReset={clearFilters} />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Instructor</th>
                      <th className="px-5 py-4 font-semibold">Track</th>
                      <th className="px-5 py-4 font-semibold">Qualification</th>
                      <th className="px-5 py-4 font-semibold">Experience</th>
                      <th className="px-5 py-4 font-semibold">Sessions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredInstructors.map((person) => (
                      <tr
                        key={person.id}
                        className="transition hover:bg-purple-50/50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-violet-200 font-bold text-purple-800">
                              {getInitials(person.name)}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {person.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {person.role}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700">
                            {person.track || "Track not assigned"}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {person.qualification}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {person.experience}
                        </td>

                        <td className="px-5 py-4 font-semibold text-slate-700">
                          {person.sessions}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {showMentors && (
          <section>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                  Student Support Team
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-800">
                  Mentor Team
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Mentors monitor attendance, identify learning difficulties,
                  and support students throughout training.
                </p>
              </div>

              <span className="w-fit rounded-full bg-teal-100 px-3 py-1.5 text-xs font-bold text-teal-800">
                {filteredMentors.length} Mentors
              </span>
            </div>

            {filteredMentors.length === 0 ? (
              <EmptyState onReset={clearFilters} />
            ) : (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {filteredMentors.map((mentor) => (
                  <article
                    key={mentor.id}
                    className="group overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="h-2 bg-gradient-to-r from-teal-500 via-emerald-400 to-purple-400" />

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${mentor.color}`}
                          >
                            {mentor.initials}
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-800">
                              {mentor.name}
                            </h3>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {mentor.role}
                            </p>
                          </div>
                        </div>

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                          <i className="fa-solid fa-user-check" />
                        </div>
                      </div>

                      <div className="mt-5 rounded-xl bg-teal-50/80 p-3">
                        <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-teal-800">
                          Assigned Track
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          {mentor.track}
                        </p>
                      </div>

                      <div className="mt-5">
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700">
                          <i className="fa-solid fa-list-check text-teal-600" />
                          Key Responsibilities
                        </h4>

                        <ul className="space-y-2.5">
                          {mentor.responsibilities.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm leading-5 text-slate-600"
                            >
                              <i className="fa-solid fa-circle-check mt-1 text-xs text-teal-600" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="h-2 w-2 rounded-full bg-teal-500" />
                          Learning Support
                        </span>

                        <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
                          Mentor
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </AdminLayout>
  );
}

function StatCard({ title, value, description, icon, theme }) {
  const themes = {
    purple: {
      border: "border-purple-100",
      iconBg: "bg-purple-100",
      iconText: "text-purple-700",
      valueText: "text-[#56358c]",
    },
    teal: {
      border: "border-teal-100",
      iconBg: "bg-teal-100",
      iconText: "text-teal-700",
      valueText: "text-teal-700",
    },
    amber: {
      border: "border-amber-100",
      iconBg: "bg-amber-100",
      iconText: "text-amber-700",
      valueText: "text-amber-700",
    },
  };

  const style = themes[theme];

  return (
    <div
      className={`rounded-2xl border ${style.border} bg-white p-5 shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <p className={`mt-2 text-3xl font-bold ${style.valueText}`}>
            {value}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${style.iconBg} ${style.iconText}`}
        >
          <i className={`fa-solid ${icon}`} />
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center">
      <i className="fa-solid fa-magnifying-glass mb-3 text-3xl text-slate-300" />

      <p className="font-semibold text-slate-600">No results found</p>

      <p className="mt-1 text-sm text-slate-400">
        Try another name or learning track.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 rounded-xl bg-purple-100 px-4 py-2.5 text-sm font-semibold text-purple-700 transition hover:bg-purple-200"
      >
        Reset Filters
      </button>
    </div>
  );
}
