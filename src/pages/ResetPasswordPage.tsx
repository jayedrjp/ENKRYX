import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import { GridBackdrop } from "../components/BackgroundDecor";
import { supabase } from "../lib/supabase";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  // supabase-js auto-detects the recovery token in the URL and establishes
  // a temporary session for it — we just need to wait a tick to confirm
  // that actually happened before letting the form submit.
  const [checkingSession, setCheckingSession] = useState(true);
  const [sessionValid, setSessionValid] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessionValid(Boolean(session));
      setCheckingSession(false);
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    await supabase.auth.signOut();
    setTimeout(() => navigate("/login", { replace: true }), 2000);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-canvas px-6 py-16">
      <GridBackdrop color="#F0F1F3" opacity={0.7} size={44} />

      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src="/enkryx-logo.png" alt="ENKRYX" className="h-10 w-auto" />
        </div>

        <div className="rounded-card bg-card border border-border shadow-[0_8px_30px_rgba(7,24,39,0.06)] p-8 sm:p-10">
          {checkingSession ? (
            <div className="flex justify-center py-6">
              <div className="w-8 h-8 rounded-full border-2 border-border border-t-azure animate-spin" />
            </div>
          ) : success ? (
            <div className="text-center py-4">
              <h1 className="text-xl font-extrabold italic tracking-tight uppercase text-heading mb-2">
                Password Updated
              </h1>
              <p className="text-sm text-muted">Taking you back to sign in…</p>
            </div>
          ) : !sessionValid ? (
            <div className="text-center py-4">
              <h1 className="text-xl font-extrabold italic tracking-tight uppercase text-heading mb-2">
                Link Expired
              </h1>
              <p className="text-sm text-muted mb-6">
                This reset link is invalid or has expired. Request a new one from the sign-in page.
              </p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-full px-6 py-2.5 text-sm font-semibold bg-azure text-white transition-colors duration-250 hover:bg-teal"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold italic tracking-tight uppercase text-heading text-center mb-8">
                Set a New Password
              </h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="password" className="block text-xs font-semibold text-muted mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full rounded-xl border border-border bg-white pl-10 pr-10 py-2.5 text-sm text-heading placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-heading transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-semibold text-muted mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-2.5 text-sm text-heading placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full px-6 py-3 text-sm font-semibold bg-azure text-white transition-colors duration-250 hover:bg-teal disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Updating…" : "Update Password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
