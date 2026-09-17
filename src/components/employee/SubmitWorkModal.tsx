import { FormEvent, useState } from "react";
import { CheckCircle2, Figma, Github, HardDrive, Globe, X } from "lucide-react";
import { detectLinkType, LINK_TYPE_LABELS } from "../../lib/linkType";
import { submitWork } from "../../services/employeeTasks";
import type { Task } from "../../types";

const LINK_ICONS = { github: Github, figma: Figma, drive: HardDrive, website: Globe };

interface SubmitWorkModalProps {
  task: Task;
  onClose: () => void;
  onSubmitted: () => void;
}

export default function SubmitWorkModal({ task, onClose, onSubmitted }: SubmitWorkModalProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const isValidUrl = /^https?:\/\/\S+\.\S+/.test(url.trim());
  const linkType = isValidUrl ? detectLinkType(url.trim()) : null;
  const LinkIcon = linkType ? LINK_ICONS[linkType] : null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidUrl) {
      setError("Enter a valid link starting with http:// or https://");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await submitWork(task.id, url.trim());
      setSuccess(true);
      setTimeout(() => {
        onSubmitted();
      }, 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit work.");
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/30" onClick={success ? undefined : onClose} aria-hidden />

      <div className="relative w-full max-w-md rounded-card bg-card border border-border shadow-[0_20px_60px_rgba(7,24,39,0.15)] p-8">
        {success ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4 animate-[pop_0.3s_ease-out]">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h2 className="text-lg font-extrabold italic uppercase text-heading">Work Submitted</h2>
            <p className="text-sm text-muted mt-1">Nice work — task marked as completed.</p>
            <style>{`
              @keyframes pop {
                0% { transform: scale(0.6); opacity: 0; }
                60% { transform: scale(1.08); opacity: 1; }
                100% { transform: scale(1); }
              }
            `}</style>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 text-muted hover:text-heading transition-colors"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-extrabold italic uppercase text-heading mb-1 pr-8">
              Submit Work
            </h2>
            <p className="text-sm text-muted mb-6 truncate">{task.title}</p>

            <form onSubmit={handleSubmit}>
              <label className="block text-xs font-semibold text-muted mb-1.5">
                Link to your work
              </label>
              <div className="relative">
                {LinkIcon && (
                  <LinkIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-azure" />
                )}
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://github.com/you/project"
                  autoFocus
                  className={`w-full rounded-xl border bg-white py-2.5 pr-4 text-sm text-heading placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure transition-colors ${
                    LinkIcon ? "pl-10" : "pl-4"
                  }`}
                />
              </div>
              {linkType && (
                <p className="mt-1.5 text-[11px] text-azure font-medium">
                  Detected: {LINK_TYPE_LABELS[linkType]}
                </p>
              )}
              {error && (
                <p className="mt-2 text-[11px] font-medium text-red-600">{error}</p>
              )}

              <div className="flex items-center gap-3 mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold bg-azure text-white transition-colors duration-250 hover:bg-teal disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting…" : "Mark as Complete"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm font-semibold text-muted hover:text-heading transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
