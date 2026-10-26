import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const pageNames = {
  "/dashboard": "Dashboard",
  "/students": "Participants",
  "/find-program": "Learning tracks",
  "/find-instructor": "Instructors",
  "/find-materials": "Learning resources",
  "/graduates": "Graduates",
  "/projects": "Projects",
  "/internships": "Internships",
  "/attendance": "Attendance",
  "/reports": "Reports & expenses",
  "/my-dependents": "My dependents",
  "/ai-assistant": "AI Assistant",
  "/settings": "Settings",
};

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const title = pageNames[pathname] || "HBC Workspace";

  useEffect(() => {
    const openSidebar = () => setOpen(true);

    window.addEventListener("hbc-open-sidebar", openSidebar);

    return () => {
      window.removeEventListener("hbc-open-sidebar", openSidebar);
    };
  }, []);

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[#f7f8fc] text-slate-800">
      {/* Sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Application area */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden lg:pl-[232px]">
        {/* Fixed top header: it does not scroll with the page */}
        <header className="relative z-30 flex h-[60px] shrink-0 items-center justify-between border-b border-violet-300/20 bg-[#4c1d95] px-4 text-white shadow-md sm:h-[66px] sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/20 text-white transition hover:bg-white/10 lg:hidden"
            >
              <i className="fa-solid fa-bars" />
            </button>

            <div className="min-w-0">
              <p className="text-[10px] font-medium tracking-wide text-violet-200 sm:text-[11px]">
                HBC / Workspace
              </p>

              <h1 className="truncate text-sm font-bold text-white">{title}</h1>
            </div>
          </div>

          <Link
            to="/logout"
            className="flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-white transition hover:bg-white/15 sm:px-3 sm:text-sm"
          >
            <i className="fa-solid fa-arrow-right-from-bracket" />
            <span>Log out</span>
          </Link>
        </header>

        {/* The ONLY main vertical scroll area */}
        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain">
          <div className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-7">
            {children}
          </div>
        </main>

        {/* Fixed bottom footer: stays outside the scroll area */}
        <footer className="relative z-20 flex h-10 shrink-0 items-center justify-center border-t border-violet-300/20 bg-[#211632] px-3 text-center text-[10px] font-medium tracking-wide text-violet-100 sm:text-[11px]">
          HBC Programme Management
        </footer>
      </div>
    </div>
  );
}
