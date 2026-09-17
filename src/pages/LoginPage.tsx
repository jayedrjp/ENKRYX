import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { GridBackdrop } from "../components/BackgroundDecor";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [resetSubmitting, setResetSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError);
      setSubmitting(false);
      return;
    }

    // Fetch the role directly so we can redirect immediately, without
    // waiting on the AuthContext's own async profile load to catch up.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      navigate(profile?.role === "admin" ? "/admin/dashboard" : "/employee/dashboard", {
        replace: true,
      });
    }

    setSubmitting(false);
  }

  async function handleResetSubmit(e: FormEvent) {
    e.preventDefault();
    setResetError(null);
    setResetSubmitting(true);

    const { error: resetErr } = await supabase.auth.resetPasswordForEmail(resetEmail.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setResetSubmitting(false);

    if (resetErr) {
      setResetError(resetErr.message);
      return;
    }
    setResetSent(true);
  }

  function backToLogin() {
    setShowForgot(false);
    setResetSent(false);
    setResetError(null);
    setResetEmail("");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-canvas px-6 py-16">
      <GridBackdrop color="#F0F1F3" opacity={0.7} size={44} />

      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src="/enkryx-logo.png" alt="ENKRYX" className="h-10 w-auto" />
        </div>

        <div className="rounded-card bg-card border border-border shadow-[0_8px_30px_rgba(7,24,39,0.06)] p-8 sm:p-10">
          {showForgot ? (
            resetSent ? (
              <div className="text-center py-4">
                <h1 className="text-xl font-extrabold italic tracking-tight uppercase text-heading mb-2">
                  Check your email
                </h1>
                <p className="text-sm text-muted mb-8">
                  If an account exists for <span className="font-medium text-heading">{resetEmail}</span>,
                  a password reset link is on its way.
                </p>
                <button
                  type="button"
                  onClick={backToLogin}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-azure hover:text-teal transition-colors"
                >
                  <ArrowLeft size={15} />
                  Back to sign in
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={backToLogin}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-heading transition-colors mb-6"
                >
                  <ArrowLeft size={14} />
                  Back to sign in
                </button>

                <h1 className="text-2xl font-extrabold italic tracking-tight uppercase text-heading mb-2">
                  Reset your password
                </h1>
                <p className="text-sm text-muted mb-8">
                  Enter your email and we'll send you a link to set a new password.
                </p>

                <form onSubmit={handleResetSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="resetEmail" className="block text-xs font-semibold text-muted mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        id="resetEmail"
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="you@enkryx.com"
                        className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-2.5 text-sm text-heading placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors"
                      />
                    </div>
                  </div>

                  {resetError && (
                    <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5">
                      {resetError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={resetSubmitting}
                    className="w-full rounded-full px-6 py-3 text-sm font-semibold bg-azure text-white transition-colors duration-250 hover:bg-teal disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {resetSubmitting ? "Sending…" : "Send Reset Link"}
                  </button>
                </form>
              </>
            )
          ) : (
            <>
              <div className="text-xs font-bold tracking-[0.15em] uppercase mb-3 text-azure text-center">
                Team Access
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold italic tracking-tight uppercase text-heading text-center mb-8">
                Sign in to ENKRYX
              </h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-muted mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@enkryx.com"
                      className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-2.5 text-sm text-heading placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password" className="block text-xs font-semibold text-muted">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgot(true)}
                      className="text-xs font-semibold text-azure hover:text-teal transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
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
                  {submitting ? "Signing in…" : "Sign in"}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-[11px] text-muted mt-6">
          Internal access only. Contact your admin if you need an account.
        </p>
      </div>
    </div>
  );
}
