import { ChevronRight, Home, ArrowLeft } from "lucide-react";
import FadeInUp from "@/components/common/FadeInUp";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div
        className="bg-pattern"
        aria-hidden="true"
      />
      {/* Hero-like section for 404 */}
      <section className="relative z-10 pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6 w-full text-center">
          <FadeInUp>
            <div className="space-y-8">
              <div className="space-y-4">
                <h1
                  className="text-6xl md:text-8xl font-bold bg-linear-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  404
                </h1>
                <h2
                  className="text-2xl md:text-3xl font-semibold text-slate-200"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Page Not Found
                </h2>
                <p
                  className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  The page you're looking for doesn't exist or has been moved.
                  Let's get you back on track.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 light:bg-slate-200 light:hover:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-slate-200 light:text-slate-800 font-medium transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <Home className="h-4 w-4" />
                  Go Home
                </a>
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 hover:border-slate-500 light:border-slate-400 light:hover:border-slate-300 rounded-lg text-slate-300 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-800 font-medium transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </button>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <FadeInUp>
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="border-t border-slate-800/70 light:border-slate-200" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
            <p
              className="text-xs text-slate-500 light:text-slate-600"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
            >
              Lost? Let's find your way back.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-900 transition-colors whitespace-nowrap"
              style={{
                fontFamily:
                  "var(--font-body)",
                fontWeight: 500,
              }}
            >
              Return
              home
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </FadeInUp>
    </div>
  );
}
