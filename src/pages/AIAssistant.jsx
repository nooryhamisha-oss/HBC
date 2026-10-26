import { useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
export default function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello. I’m the HBC AI assistant interface. Live AI and programme-data access are not connected yet.",
    },
  ]);
  const send = (e) => {
    e.preventDefault();
    const q = question.trim();
    if (!q) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: q },
      {
        role: "assistant",
        text: "This is a prototype response. Connect an AI provider and authorized backend endpoint to enable real analysis of HBC records.",
      },
    ]);
    setQuestion("");
  };
  return (
    <AdminLayout>
      <section className="mx-auto flex min-h-[65vh] max-w-4xl flex-col overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
        <div className="border-b border-violet-100 bg-violet-50 p-5">
          <h2 className="text-xl font-black text-slate-900">AI Assistant</h2>
          <p className="mt-1 text-sm text-slate-500">
            Admin workspace · prototype only
          </p>
        </div>
        <div className="flex-1 space-y-4 p-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6 ${m.role === "user" ? "ml-auto bg-violet-600 text-white" : "bg-slate-100 text-slate-700"}`}
            >
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider opacity-70">
                {m.role === "user" ? "You" : "HBC Assistant"}
              </span>
              {m.text}
            </div>
          ))}
        </div>
        <form
          onSubmit={send}
          className="flex gap-2 border-t border-slate-100 p-4"
        >
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about programme planning…"
            className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
          />
          <button className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white hover:bg-violet-700">
            Send
          </button>
        </form>
        <p className="px-5 pb-4 text-xs text-amber-700">
          Demo mode: messages are not sent to an AI service or stored in a
          database. Do not enter sensitive participant data.
        </p>
      </section>
    </AdminLayout>
  );
}
