import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const isSignup = mode === "signup";

  function handleSubmit(event) {
    event.preventDefault();
    setNotice("");

    if (!isSignup) {
      // Demo navigation only; connect authentication before production.
      navigate("/dashboard");
    } else {
      setNotice(
        "Account creation will be enabled after authentication is connected.",
      );
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#BDA9D2] bg-[#F4EFF9] px-4 py-2.5 text-sm font-medium text-[#211632] outline-none transition placeholder:text-[#655673] focus:border-[#7C3AED] focus:bg-white focus:ring-4 focus:ring-purple-100";

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#211632] text-[#282238] selection:bg-purple-200">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 -top-44 h-[470px] w-[470px] rounded-full bg-violet-500/25 blur-3xl" />
        <div className="absolute -right-36 top-[18%] h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-[-220px] left-[35%] h-[420px] w-[520px] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#D8B4FE_0.7px,transparent_0.7px)] [background-size:22px_22px]" />
      </div>

      <header className="relative z-10 flex w-full items-center justify-between px-5 py-4 sm:px-9 lg:px-14">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#291B3D] shadow-lg shadow-purple-950/15">
            <svg
              viewBox="0 0 40 40"
              className="h-7 w-7"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 27L18 10L27 21L35 12"
                stroke="#D8B4FE"
                strokeWidth="2.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 32H35"
                stroke="#D8B4FE"
                strokeWidth="2"
                strokeLinecap="round"
                opacity=".65"
              />
            </svg>
          </div>
          <div>
            <p className="text-base font-bold tracking-[0.2em] text-white">
              HBC
            </p>
            <p className="mt-0.5 text-[9px] font-medium tracking-[0.16em] text-[#C4B5D5]">
              HORIZON BRIDGE CONSULTING
            </p>
          </div>
        </div>
      </header>

      <section className="relative z-10 flex flex-1 items-center justify-center px-4 py-3 sm:px-6 sm:py-4 lg:py-2">
        <div className="grid w-full max-w-[1100px] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,430px)] lg:gap-14">
          <div className="mx-auto w-full max-w-[560px] lg:mx-0">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#E9D5FF]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-400/20">
                <svg
                  viewBox="0 0 20 20"
                  className="h-3.5 w-3.5"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 13.5L8 7l3.2 3.5L17 4.5M3 16h14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              HBC administration
            </div>
            <h1 className="max-w-[560px] text-5xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              Your work,
              <span className="block text-[#D8B4FE]">in one place.</span>
            </h1>
            <p className="mt-5 max-w-[520px] text-lg leading-8 text-[#F0E8FA] sm:text-xl sm:leading-9 lg:text-2xl lg:leading-10">
              Sign in to manage programme activity, participants, learning
              progress and team operations.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {["Participants", "Learning tracks", "Programme insights"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-medium text-[#E6D9F2]"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[430px] rounded-[24px] border border-[#A995BD] bg-white p-4 text-[#211632] shadow-[0_24px_80px_-30px_rgba(10,4,25,0.5)] sm:p-5 lg:p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64358A]">
                  {isSignup ? "Team registration" : "Welcome to HBC"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#211632]">
                  {isSignup ? "Request access" : "Sign in"}
                </h2>
                <p className="mt-1 text-sm font-medium text-[#51445F]">
                  {isSignup
                    ? "Request access to the workspace."
                    : "Enter your credentials to continue."}
                </p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D7C4EA] text-[#65338D]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3L19 6V11.5C19 16 16 19.3 12 21C8 19.3 5 16 5 11.5V6L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="mb-3 grid grid-cols-2 rounded-xl bg-[#D0C0DF] p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setNotice("");
                }}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${!isSignup ? "bg-[#FDFBFF] text-[#54277E] shadow-sm" : "text-[#40324E] hover:text-[#241630]"}`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setNotice("");
                }}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${isSignup ? "bg-[#FDFBFF] text-[#54277E] shadow-sm" : "text-[#40324E] hover:text-[#241630]"}`}
              >
                Create account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5">
              {isSignup && (
                <div>
                  <label
                    htmlFor="invitation"
                    className="mb-1 block text-xs font-bold text-[#30213E]"
                  >
                    Invitation code
                  </label>
                  <input
                    id="invitation"
                    name="invitation"
                    required
                    placeholder="Enter invitation code"
                    className={inputClass}
                  />
                </div>
              )}
              {isSignup && (
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-1 block text-xs font-bold text-[#30213E]"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    required
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs font-bold text-[#30213E]"
                >
                  Work email
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786887]">
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect
                        x="2.5"
                        y="4"
                        width="15"
                        height="12"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M3.5 5L10 10l6.5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@organization.org"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-xs font-bold text-[#30213E]"
                  >
                    Password
                  </label>
                  {!isSignup && (
                    <button
                      type="button"
                      onClick={() =>
                        setNotice(
                          "Password reset will be added with authentication.",
                        )
                      }
                      className="text-xs font-semibold text-[#63358A] hover:text-[#421C68]"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786887]">
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect
                        x="3.5"
                        y="8"
                        width="13"
                        height="9"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M6.5 8V5.8a3.5 3.5 0 017 0V8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isSignup ? "new-password" : "current-password"
                    }
                    minLength={isSignup ? 8 : undefined}
                    required
                    placeholder="Enter your password"
                    className={`${inputClass} pl-10 pr-16`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-1.5 py-1 text-xs font-semibold text-[#574567] hover:bg-purple-100 hover:text-[#4A216F]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {notice && (
                <p
                  aria-live="polite"
                  className="rounded-lg border border-purple-200 bg-[#F3EAFB] px-3 py-2 text-xs leading-5 text-[#553170]"
                >
                  {notice}
                </p>
              )}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#5E2D87] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/15 transition hover:bg-[#7040A0] active:scale-[0.99]"
              >
                {isSignup ? "Request access" : "Continue to workspace"}
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3.5 10h12m-5-5 5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            <div className="mt-3 flex items-center justify-center gap-2 border-t border-[#C0ADCF] pt-2.5 text-[11px] font-semibold text-[#40324D]">
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 text-[#65358A]"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 2L16 4.5V9.5C16 13.2 13.4 16 10 18C6.6 16 4 13.2 4 9.5V4.5L10 2Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M7.5 9.8L9.2 11.4L12.7 7.8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Authorized team members only
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 bg-[#171023]/65 px-5 py-3 text-[10px] text-[#C4B5D5] backdrop-blur sm:flex-row sm:px-9 lg:px-14">
        <span>© {new Date().getFullYear()} Horizon Bridge Consulting</span>
        <span className="tracking-[0.12em]">
          PRIVATE WORKSPACE <span className="mx-1.5 text-[#D8B4FE]">•</span>{" "}
          BUILT FOR BETTER COORDINATION
        </span>
      </footer>
    </main>
  );
}
