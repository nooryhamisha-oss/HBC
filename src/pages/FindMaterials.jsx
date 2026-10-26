import { useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
const starterCategories = ["Web Development", "Data Analytics", "Digital Marketing", "AI Fundamentals", "E-Commerce"];
export default function FindMaterials() {
  const [search, setSearch] = useState("");
  const categories = useMemo(()=>starterCategories.filter(x=>x.toLowerCase().includes(search.toLowerCase())),[search]);
  return <AdminLayout>
    <div className="mb-6"><h2 className="text-xl font-bold text-slate-900">Learning materials</h2><p className="mt-1 text-sm text-slate-500">A clean starting point for an HBC learning-resource catalogue.</p></div>
    <label className="relative mb-5 block"><span className="sr-only">Search learning materials</span><i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search categories..." className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"/></label>
    <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900"><i className="fa-solid fa-triangle-exclamation mr-2"/>The original page contained sample textbook sellers, prices, and IDs. Those unverified entries were removed rather than treated as real inventory.</div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{categories.map((name,i)=><article key={name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-lg text-emerald-700"><i className="fa-solid fa-book-open"/></span><h3 className="mt-4 font-bold text-slate-900">{name}</h3><p className="mt-2 text-sm leading-6 text-slate-500">Resources for this category can be listed after the HBC catalogue is provided.</p><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-xs text-slate-400">Category {i+1}</span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">No records yet</span></div></article>)}</div>
    {categories.length===0&&<p className="rounded-xl bg-white p-8 text-center text-sm text-slate-500">No matching categories.</p>}
  </AdminLayout>;
}
