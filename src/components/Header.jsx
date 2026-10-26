export default function Header() {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-purple-100 bg-white px-4 shadow-sm md:px-6">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-purple-600">HBC / Workspace</p>
        <h1 className="truncate text-sm font-bold text-slate-900">
          Programme Management
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden rounded-full bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-700 sm:inline-flex">
          Demo Workspace
        </span>
      </div>
    </div>
  );
}
