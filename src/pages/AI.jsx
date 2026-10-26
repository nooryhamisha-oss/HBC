import { useEffect, useRef, useState } from "react";

const API_URL = (
  import.meta.env.VITE_AI_API_URL || "http://localhost:3001"
).replace(/\/$/, "");

const suggestions = [
  "چگونه HTML و CSS را یاد بگیرم؟",
  "یک پروژه ساده React پیشنهاد بده.",
  "چطور با هوش مصنوعی کار کنم؟",
  "برای یادگیری تحلیل داده از کجا شروع کنم؟",
];

const initialMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "سلام! من دستیار هوش مصنوعی HBC هستم. درباره برنامه‌نویسی، مهارت‌های دیجیتال، پروژه‌ها و یادگیری از من سؤال بپرس.",
};

export default function AI() {
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryText, setRetryText] = useState("");

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text = input) {
    const content = text.trim();

    if (!content || loading) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    const history = [
      ...messages
        .filter((message) => message.id !== "welcome")
        .map(({ role, content }) => ({ role, content })),
      { role: "user", content },
    ];

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);
    setError("");
    setRetryText("");

    await requestAnswer(history, content);
  }

  async function requestAnswer(history, originalText) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: history }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || `درخواست ناموفق بود (${response.status}).`,
        );
      }

      // بک‌اند پاسخ را با نام reply می‌فرستد.
      // answer نیز برای سازگاری با نسخه‌های قبلی پشتیبانی می‌شود.
      const answer = data.reply ?? data.answer;

      if (typeof answer !== "string" || !answer.trim()) {
        throw new Error("پاسخی از سرور دریافت نشد.");
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: answer,
        },
      ]);

      setRetryText("");
    } catch (err) {
      setError(
        err.message || "اتصال به دستیار برقرار نشد. سرور را بررسی کنید.",
      );
      setRetryText(originalText);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function retryLastMessage() {
    if (!retryText || loading) return;

    const text = retryText;

    const history = messages
      .filter((message) => message.id !== "welcome")
      .map(({ role, content }) => ({ role, content }));

    requestAnswer(history, text);
  }

  function startNewChat() {
    if (loading) return;

    setMessages([initialMessage]);
    setInput("");
    setError("");
    setRetryText("");

    inputRef.current?.focus();
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <div className="min-h-[calc(100vh-2rem)] bg-slate-50 p-3 text-slate-800 sm:p-6">
      <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-xl">
              ✦
            </div>

            <div className="min-w-0">
              <h1 className="font-bold text-slate-900">
                HBC AI Assistant
              </h1>

              <p className="text-xs text-slate-500">
                Powered by Grok · xAI API
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={startNewChat}
            disabled={loading}
            className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            گفت‌وگوی جدید
          </button>
        </header>

        <main
          className="flex-1 space-y-5 overflow-y-auto px-3 py-5 sm:px-6"
          aria-live="polite"
        >
          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 font-bold text-purple-700">
                    AI
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 sm:max-w-[78%] ${
                    isUser
                      ? "rounded-br-sm bg-purple-700 text-white"
                      : "rounded-bl-sm border border-slate-200 bg-slate-50 text-slate-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words text-sm leading-7">
                    {message.content}
                  </p>
                </div>

                {isUser && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-sm font-bold text-slate-700">
                    تو
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 font-bold text-purple-700">
                AI
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                Grok در حال نوشتن پاسخ است...
              </div>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <p>{error}</p>

              {retryText && (
                <button
                  type="button"
                  onClick={retryLastMessage}
                  disabled={loading}
                  className="mt-3 rounded-lg bg-red-100 px-3 py-2 font-semibold hover:bg-red-200 disabled:opacity-50"
                >
                  تلاش دوباره
                </button>
              )}
            </div>
          )}

          {messages.length === 1 && !loading && (
            <div className="pt-3">
              <p className="mb-3 text-sm text-slate-500">
                از اینجا شروع کن:
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-xl border border-slate-200 p-3 text-left text-sm transition hover:border-purple-300 hover:bg-purple-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </main>

        <footer className="border-t border-slate-200 bg-white p-3 sm:p-5">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();
                  handleSubmit(event);
                }
              }}
              placeholder="پیام خود را بنویس..."
              aria-label="پیام شما"
              rows={2}
              maxLength={8000}
              disabled={loading}
              className="max-h-36 min-h-12 flex-1 resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 disabled:bg-slate-100"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl bg-purple-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "..." : "ارسال"}
            </button>
          </form>

          <p className="mt-2 text-center text-xs text-slate-400">
            پاسخ‌های هوش مصنوعی ممکن است اشتباه باشند؛ اطلاعات مهم را بررسی کنید.
          </p>
        </footer>
      </div>
    </div>
  );
}
