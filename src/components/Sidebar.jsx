import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: "fa-chart-pie" },
  { label: "Participants", path: "/students", icon: "fa-users" },
  { label: "Learning tracks", path: "/find-program", icon: "fa-book-open" },
  {
    label: "Instructors",
    path: "/find-instructor",
    icon: "fa-chalkboard-user",
  },
  { label: "Graduates", path: "/graduates", icon: "fa-graduation-cap" },
  { label: "Projects", path: "/projects", icon: "fa-diagram-project" },
  { label: "Internships", path: "/internships", icon: "fa-briefcase" },
  { label: "Reports & expenses", path: "/reports", icon: "fa-chart-column" },
  { label: "AI Assistant", path: "/ai-assistant", icon: "fa-robot" },
  { label: "Settings", path: "/settings", icon: "fa-gear" },
];

export default function Sidebar({ open = false, onClose = () => {} }) {
  const { pathname } = useLocation();

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-3 top-3 z-50 flex h-fit max-h-[calc(100dvh-1.5rem)] w-[250px] flex-col overflow-hidden rounded-2xl bg-[#211632] text-white shadow-2xl transition-transform duration-200 lg:inset-y-0 lg:left-0 lg:h-dvh lg:max-h-none lg:w-[232px] lg:rounded-none lg:shadow-xl ${
          open ? "translate-x-0" : "-translate-x-[calc(100%+0.75rem)]"
        } lg:translate-x-0`}
      >
        {/* Compact brand header */}
        <div className="flex h-14 shrink-0 items-center gap-2 border-b border-white/10 px-3 lg:h-[72px] lg:gap-3 lg:px-4">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#7c3aed] text-xs font-extrabold text-white lg:h-10 lg:w-10 lg:text-sm">
            HBC
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-extrabold tracking-wide lg:text-sm">
              HORIZON BRIDGE
            </p>
            <p className="mt-0.5 text-[9px] font-semibold tracking-wider text-violet-200 lg:text-[10px]">
              CONSULTING · HBC
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-violet-200 hover:bg-white/10 lg:hidden"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Compact menu; no sidebar scrolling */}
        <nav className="flex min-h-0 flex-none flex-col gap-0.5 overflow-hidden px-2 py-2 lg:flex-1 lg:gap-1 lg:px-3 lg:py-3">
          {menuItems.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex h-8 shrink-0 items-center gap-2.5 rounded-lg px-3 text-xs font-semibold transition lg:h-10 lg:gap-3 lg:text-[13px] ${
                  active
                    ? "bg-[#7c3aed] text-white shadow-sm"
                    : "text-violet-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <i
                  className={`fa-solid ${item.icon} w-4 shrink-0 text-center text-xs lg:text-sm`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Compact logout immediately after the menu on mobile */}
        <div className="mt-1 shrink-0 border-t border-white/10 px-3 py-1.5 lg:mt-auto lg:py-2">
          <Link
            to="/logout"
            onClick={onClose}
            className="flex h-7 items-center gap-2 rounded-lg px-2 text-[11px] font-semibold text-violet-100 transition hover:bg-white/10 hover:text-white lg:h-9 lg:px-3 lg:text-xs"
          >
            <i className="fa-solid fa-arrow-right-from-bracket w-4 text-center" />
            <span>Log out</span>
          </Link>

          <p className="px-2 pt-0.5 text-[8px] text-violet-300/70 lg:px-3 lg:pt-1 lg:text-[9px]">
            HBC Programme Management
          </p>
        </div>
      </aside>
    </>
  );
}
