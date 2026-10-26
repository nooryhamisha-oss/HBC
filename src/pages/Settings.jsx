
import { useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import {
  UserRound,
  Palette,
  Bell,
  ShieldCheck,
  GraduationCap,
  Monitor,
  Settings2,
  Save,
  RotateCcw,
  Download,
  Search,
  Check,
  ChevronRight,
  Sun,
  Mail,
  LockKeyhole,
  Database,
  Sparkles,
  Info,
  CheckCircle2,
  CircleAlert,
} from "lucide-react";

const STORAGE_KEY = "hbc-settings-v1";

const defaultSettings = {
  profile: {
    name: "HBC Administrator",
    email: "",
    role: "Program Administrator",
    organization: "HBC",
  },
  appearance: {
    language: "English",
    compactSidebar: false,
    reducedMotion: false,
  },
  notifications: {
    attendance: true,
    studentProgress: true,
    courseUpdates: true,
    projectUpdates: true,
    emailNotifications: false,
  },
  security: {
    showSecurityReminders: true,
  },
  program: {
    defaultTrack: "All Tracks",
    academicPeriod: "Current Cohort",
    showDemoData: true,
    confirmBeforeReset: true,
  },
};

const sections = [
  {
    id: "profile",
    label: "Profile",
    icon: UserRound,
    description: "Administrator details",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    description: "Workspace preferences",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Update preferences",
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
    description: "Security guidance",
  },
  {
    id: "program",
    label: "HBC Program",
    icon: GraduationCap,
    description: "Training preferences",
  },
  {
    id: "system",
    label: "System Status",
    icon: Monitor,
    description: "Integration overview",
  },
];

const tracks = [
  "All Tracks",
  "Web Development & Coding",
  "Digital Marketing & Content",
  "E-Commerce & Freelancing",
  "Data Analytics & Bookkeeping",
  "AI Tools & Digital Services",
];

function cloneDefaults() {
  return JSON.parse(JSON.stringify(defaultSettings));
}

function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return cloneDefaults();

    const parsed = JSON.parse(saved);
    const defaults = cloneDefaults();

    return {
      ...defaults,
      ...parsed,
      profile: { ...defaults.profile, ...parsed.profile },
      appearance: { ...defaults.appearance, ...parsed.appearance },
      notifications: {
        ...defaults.notifications,
        ...parsed.notifications,
      },
      security: { ...defaults.security, ...parsed.security },
      program: { ...defaults.program, ...parsed.program },
    };
  } catch {
    return cloneDefaults();
  }
}

function SectionHeading({ title, description }) {
  return (
    <div className="mb-5">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="grid gap-2 border-b border-slate-100 py-4 last:border-0 sm:grid-cols-[minmax(0,1fr)_minmax(220px,1fr)] sm:items-center sm:gap-6">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {hint && (
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {hint}
          </p>
        )}
      </div>

      <div className="min-w-0">{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-purple-100 ${
        checked ? "bg-purple-700" : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SettingRow({ title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

function SelectInput({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
    >
      {children}
    </select>
  );
}

function StatusRow({ icon: Icon, title, detail, status }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-4 last:border-0">
      <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600">
        <Icon size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {detail}
        </p>
      </div>

      <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
        {status}
      </span>
    </div>
  );
}

function TextInput({
  id,
  value,
  onChange,
  type = "text",
  placeholder,
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
    />
  );
}

export default function Settings() {
  const [settings, setSettings] = useState(loadSettings);
  const [activeSection, setActiveSection] = useState("profile");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(true);
  const [notice, setNotice] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);

  function update(group, key, value) {
    setSettings((current) => ({
      ...current,
      [group]: {
        ...current[group],
        [key]: value,
      },
    }));

    setSaved(false);
    setNotice(null);
    setConfirmReset(false);
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setSaved(true);
      setConfirmReset(false);

      setNotice({
        type: "success",
        text: "Settings saved on this device.",
      });
    } catch {
      setNotice({
        type: "error",
        text: "Could not save settings. Check browser storage permissions.",
      });
    }
  }

  function resetSettings() {
    if (settings.program.confirmBeforeReset && !confirmReset) {
      setConfirmReset(true);
      return;
    }

    setSettings(cloneDefaults());
    setSaved(false);
    setConfirmReset(false);

    setNotice({
      type: "success",
      text: "Defaults restored. Save changes to keep them.",
    });
  }

  function exportSettings() {
    try {
      const blob = new Blob([JSON.stringify(settings, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "hbc-settings.json";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => URL.revokeObjectURL(url), 1000);

      setNotice({
        type: "success",
        text: "Settings export downloaded.",
      });
    } catch {
      setNotice({
        type: "error",
        text: "Could not export settings.",
      });
    }
  }

  function discardChanges() {
    setSettings(loadSettings());
    setSaved(true);
    setConfirmReset(false);
    setNotice({
      type: "success",
      text: "Saved settings reloaded.",
    });
  }

  const visibleSections = sections.filter((section) =>
    `${section.label} ${section.description}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const active = sections.find(
    (section) => section.id === activeSection,
  );

  const ActiveIcon = active?.icon || Settings2;

  return (
    <AdminLayout>
      <div className="min-w-0 text-slate-900">
        {/* Page heading — aligned with Dashboard */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-violet-600">
              <Settings2 size={15} />
              HBC Administration
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Settings
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage workspace preferences and HBC training dashboard settings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={exportSettings}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-purple-100"
            >
              <Download size={16} />
              Export
            </button>

            <button
              type="button"
              onClick={saveSettings}
              disabled={saved}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:cursor-default disabled:bg-purple-400"
            >
              {saved ? <Check size={16} /> : <Save size={16} />}
              {saved ? "Saved" : "Save changes"}
            </button>
          </div>
        </div>

        {/* Feedback */}
        {notice && (
          <div
            role="status"
            className={`mb-5 flex items-start gap-2 rounded-xl border p-3 text-sm ${
              notice.type === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {notice.type === "error" ? (
              <CircleAlert size={18} className="shrink-0" />
            ) : (
              <CheckCircle2 size={18} className="shrink-0" />
            )}

            <span>{notice.text}</span>
          </div>
        )}

        {/* Settings navigation and content */}
        <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="min-w-0 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm">
            <div className="relative mb-3">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Find settings..."
                aria-label="Find a settings section"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              />
            </div>

            <nav
              className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
              aria-label="Settings sections"
            >
              {visibleSections.map((section) => {
                const Icon = section.icon;
                const selected = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    aria-current={selected ? "page" : undefined}
                    className={`flex min-w-fit items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition focus:outline-none focus:ring-4 focus:ring-purple-100 lg:w-full ${
                      selected
                        ? "bg-purple-50 text-purple-800"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={18} className="shrink-0" />

                    <span className="min-w-0 flex-1 text-sm font-semibold">
                      {section.label}
                    </span>

                    <ChevronRight
                      size={15}
                      className={`hidden shrink-0 lg:block ${
                        selected ? "opacity-100" : "opacity-40"
                      }`}
                    />
                  </button>
                );
              })}

              {visibleSections.length === 0 && (
                <p className="p-3 text-sm text-slate-500">
                  No matching sections.
                </p>
              )}
            </nav>

            <div className="mt-3 hidden rounded-xl bg-purple-50 p-3 lg:block">
              <p className="flex items-center gap-2 text-sm font-semibold text-purple-800">
                <Sparkles size={16} />
                HBC Workspace
              </p>

              <p className="mt-1 text-xs leading-5 text-purple-800/80">
                Preferences are stored in this browser. Account synchronization
                is not connected.
              </p>
            </div>
          </aside>

          {/* Main settings panel */}
          <div className="min-w-0 space-y-4">
            <section className="min-w-0 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="rounded-xl bg-purple-100 p-2.5 text-purple-800">
                  <ActiveIcon size={21} />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-slate-900">
                    {active?.label}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {active?.description}
                  </p>
                </div>
              </div>

              {activeSection === "profile" && (
                <>
                  <SectionHeading
                    title="Administrator profile"
                    description="Update the details displayed in this workspace."
                  />

                  <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-700 text-lg font-bold text-white">
                      {(settings.profile.name || "H")
                        .trim()
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {settings.profile.name || "Administrator"}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {settings.profile.role}
                      </p>
                    </div>
                  </div>

                  <Field label="Display name">
                    <TextInput
                      id="profile-name"
                      value={settings.profile.name}
                      onChange={(value) =>
                        update("profile", "name", value)
                      }
                    />
                  </Field>

                  <Field
                    label="Email address"
                    hint="Saved locally; no email is sent."
                  >
                    <TextInput
                      id="profile-email"
                      type="email"
                      value={settings.profile.email}
                      onChange={(value) =>
                        update("profile", "email", value)
                      }
                      placeholder="admin@example.com"
                    />
                  </Field>

                  <Field label="Role">
                    <TextInput
                      id="profile-role"
                      value={settings.profile.role}
                      onChange={(value) =>
                        update("profile", "role", value)
                      }
                    />
                  </Field>

                  <Field label="Organization">
                    <TextInput
                      id="profile-organization"
                      value={settings.profile.organization}
                      onChange={(value) =>
                        update("profile", "organization", value)
                      }
                    />
                  </Field>

                  <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                    Profile changes affect this browser only. Real account
                    management requires a backend.
                  </p>
                </>
              )}

              {activeSection === "appearance" && (
                <>
                  <SectionHeading
                    title="Workspace appearance"
                    description="Manage your preferred workspace display."
                  />

                  <Field
                    label="Theme"
                    hint="This page uses a consistent light theme."
                  >
                    <div className="flex items-center gap-3 rounded-xl border border-purple-200 bg-purple-50 p-3 text-sm font-semibold text-purple-800">
                      <Sun size={18} />
                      Light theme
                      <span className="ml-auto rounded-full bg-white px-2 py-1 text-xs">
                        Active
                      </span>
                    </div>
                  </Field>

                  <Field
                    label="Language"
                    hint="Preference only; translations are not connected."
                  >
                    <SelectInput
                      value={settings.appearance.language}
                      onChange={(value) =>
                        update("appearance", "language", value)
                      }
                    >
                      <option>English</option>
                      <option>Dari</option>
                      <option>Pashto</option>
                    </SelectInput>
                  </Field>

                  <SettingRow
                    title="Compact sidebar"
                    description="Save a preference for compact navigation."
                    checked={settings.appearance.compactSidebar}
                    onChange={(value) =>
                      update("appearance", "compactSidebar", value)
                    }
                  />

                  <SettingRow
                    title="Reduced motion"
                    description="Save a preference for reduced motion."
                    checked={settings.appearance.reducedMotion}
                    onChange={(value) =>
                      update("appearance", "reducedMotion", value)
                    }
                  />
                </>
              )}

              {activeSection === "notifications" && (
                <>
                  <SectionHeading
                    title="Notification preferences"
                    description="Choose which program updates should be prioritized."
                  />

                  <SettingRow
                    title="Attendance updates"
                    description="Attendance-related updates."
                    checked={settings.notifications.attendance}
                    onChange={(value) =>
                      update("notifications", "attendance", value)
                    }
                  />

                  <SettingRow
                    title="Learning progress"
                    description="Progress and completion updates."
                    checked={settings.notifications.studentProgress}
                    onChange={(value) =>
                      update("notifications", "studentProgress", value)
                    }
                  />

                  <SettingRow
                    title="Course updates"
                    description="Training track and cohort changes."
                    checked={settings.notifications.courseUpdates}
                    onChange={(value) =>
                      update("notifications", "courseUpdates", value)
                    }
                  />

                  <SettingRow
                    title="Practical project updates"
                    description="Participant project activity."
                    checked={settings.notifications.projectUpdates}
                    onChange={(value) =>
                      update("notifications", "projectUpdates", value)
                    }
                  />

                  <SettingRow
                    title="Email notifications"
                    description="Preference only; email delivery is not connected."
                    checked={settings.notifications.emailNotifications}
                    onChange={(value) =>
                      update("notifications", "emailNotifications", value)
                    }
                  />

                  <div className="mt-4 flex gap-2 rounded-xl bg-blue-50 p-3 text-xs leading-5 text-blue-800">
                    <Info size={17} className="shrink-0" />
                    <span>
                      These switches save preferences only; no notifications
                      are sent yet.
                    </span>
                  </div>
                </>
              )}

              {activeSection === "security" && (
                <>
                  <SectionHeading
                    title="Security"
                    description="Current limitations of this frontend prototype."
                  />

                  {settings.security.showSecurityReminders && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <p className="flex items-center gap-2 text-sm font-semibold text-amber-900">
                        <LockKeyhole size={17} />
                        Before launch
                      </p>

                      <ul className="mt-3 list-inside list-disc space-y-2 text-xs leading-5 text-amber-900">
                        <li>
                          Implement authentication and role-based authorization.
                        </li>
                        <li>Use secure server-side session handling.</li>
                        <li>
                          Never store passwords or API keys in browser settings.
                        </li>
                        <li>
                          Enforce permissions on the server, not only in the UI.
                        </li>
                      </ul>
                    </div>
                  )}

                  <div className="mt-4">
                    <SettingRow
                      title="Show security reminders"
                      description="Display security guidance on this page."
                      checked={settings.security.showSecurityReminders}
                      onChange={(value) =>
                        update("security", "showSecurityReminders", value)
                      }
                    />
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    Password changes and session management are not implemented
                    here.
                  </p>
                </>
              )}

              {activeSection === "program" && (
                <>
                  <SectionHeading
                    title="Training program preferences"
                    description="Choose default filters for the HBC workspace."
                  />

                  <Field label="Default learning track">
                    <SelectInput
                      value={settings.program.defaultTrack}
                      onChange={(value) =>
                        update("program", "defaultTrack", value)
                      }
                    >
                      {tracks.map((track) => (
                        <option key={track} value={track}>
                          {track}
                        </option>
                      ))}
                    </SelectInput>
                  </Field>

                  <Field label="Academic period">
                    <SelectInput
                      value={settings.program.academicPeriod}
                      onChange={(value) =>
                        update("program", "academicPeriod", value)
                      }
                    >
                      <option>Current Cohort</option>
                      <option>All Cohorts</option>
                      <option>Previous Cohorts</option>
                    </SelectInput>
                  </Field>

                  <SettingRow
                    title="Show demo data"
                    description="Indicates whether prototype views may use sample content."
                    checked={settings.program.showDemoData}
                    onChange={(value) =>
                      update("program", "showDemoData", value)
                    }
                  />

                  <SettingRow
                    title="Confirm before reset"
                    description="Ask before restoring defaults."
                    checked={settings.program.confirmBeforeReset}
                    onChange={(value) =>
                      update("program", "confirmBeforeReset", value)
                    }
                  />

                  <div className="mt-4 rounded-xl border border-purple-100 bg-purple-50 p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-purple-900">
                      <GraduationCap size={17} />
                      HBC learning tracks
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {tracks.slice(1).map((track) => (
                        <span
                          key={track}
                          className="rounded-lg border border-purple-100 bg-white px-2.5 py-1.5 text-xs leading-5 text-purple-800"
                        >
                          {track}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    These preferences do not change official participant or
                    cohort records.
                  </p>
                </>
              )}

              {activeSection === "system" && (
                <>
                  <SectionHeading
                    title="System status"
                    description="Prototype integration overview; not a live health check."
                  />

                  <div className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                      <CheckCircle2 size={18} />
                      Settings interface loaded
                    </div>

                    <p className="mt-1 text-xs leading-5 text-emerald-800/80">
                      This does not verify database health, deployment, or
                      security.
                    </p>
                  </div>

                  <StatusRow
                    icon={Palette}
                    title="Settings interface"
                    detail="Interactive React frontend"
                    status="Available"
                  />

                  <StatusRow
                    icon={Database}
                    title="Preference storage"
                    detail="Browser localStorage"
                    status="Local only"
                  />

                  <StatusRow
                    icon={ShieldCheck}
                    title="Authentication"
                    detail="Identity and permissions"
                    status="Not connected"
                  />

                  <StatusRow
                    icon={Database}
                    title="Program database"
                    detail="Participant and cohort records"
                    status="Not connected"
                  />

                  <StatusRow
                    icon={Sparkles}
                    title="AI Assistant"
                    detail="Availability needs separate verification"
                    status="Pending"
                  />

                  <StatusRow
                    icon={Mail}
                    title="Email delivery"
                    detail="Notification provider"
                    status="Not connected"
                  />
                </>
              )}
            </section>

            {/* Preference actions */}
            <section className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5">
              <div className="sm:flex sm:items-center sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Manage preferences
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Reload saved values or restore the default preferences.
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 sm:mt-0">
                  <button
                    type="button"
                    onClick={discardChanges}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-purple-100"
                  >
                    <RotateCcw size={15} />
                    Discard changes
                  </button>

                  <button
                    type="button"
                    onClick={resetSettings}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
                  >
                    <RotateCcw size={15} />
                    {confirmReset ? "Confirm reset" : "Reset defaults"}
                  </button>
                </div>
              </div>

              {confirmReset && (
                <div className="mt-4 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-5 text-red-800">
                    Restore all default preferences? Your saved settings will
                    not change until you save.
                  </p>

                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="self-start rounded-lg px-3 py-1.5 text-sm font-semibold text-red-700 underline sm:self-auto"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </section>

            {/* Local page status */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-1 pb-1 text-xs text-slate-500">
              <span>HBC Admin Dashboard · Settings</span>

              <span className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    saved ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />

                {saved ? "All changes saved" : "Unsaved changes"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
