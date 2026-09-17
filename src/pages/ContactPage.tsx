import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import FAQAccordion from "../components/FAQAccordion";

const CONTACT_INFO = [
  { icon: <Mail size={18} color="#006E87" />, label: "Email", value: "info@enkryx.com", href: "mailto:info@enkryx.com" },
  { icon: <Phone size={18} color="#006E87" />, label: "Phone", value: "+880 1400 019228", href: "tel:+8801400019228" },
  { icon: <MapPin size={18} color="#006E87" />, label: "Location", value: "Dhaka, Bangladesh", href: null },
  { icon: <MessageCircle size={18} color="#006E87" />, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/+8801400019228?text=Hi%20Enkryx%2C%20I'm%20interested%20in%20your%20services!" },
];

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full rounded-[12px] border border-[#DCE6EB] bg-white px-4 py-3 text-sm text-[#071827] placeholder-[#9AA4AB] outline-none transition-all duration-200 focus:border-[#006E87] focus:ring-2 focus:ring-[#006E87]/10";

  return (
    <>
      {/* Contact Body */}
      <section className="py-24 bg-[#FCFDFE]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle
            title={<>Get In <span className="text-[#006e87]">Touch</span></>}
            description="Have a project in mind? We'd love to hear from you. Reach out via the form below or through our direct channels."
          />
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left — Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#071827]">
                  Contact Info
                </h2>
                <p className="mt-2 text-sm text-[#5F7285] leading-relaxed">
                  Reach us through any channel below. We typically respond within a few hours.
                </p>
              </div>

              <div className="space-y-4">
                {CONTACT_INFO.map((c) => (
                  <div key={c.label} className="rounded-[16px] bg-white border border-[#DCE6EB] p-5 flex items-start gap-4 hover:border-[#006E87]/30 hover:shadow-md transition-all duration-250">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#EAF6FA] flex items-center justify-center">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#9AA4AB]">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm font-semibold text-[#071827] hover:text-[#006E87] transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-[#071827]">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Response time badge */}
              <div className="rounded-[16px] bg-[#EAF6FA] border border-[#DCEAF0] p-5">
                <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#006E87] mb-1">Response Time</p>
                <p className="text-sm text-[#5F7285]">We usually respond within <strong className="text-[#071827]">2–4 hours</strong> during business hours.</p>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-2">
              <div className="rounded-[28px] bg-white border border-[#DCE6EB] shadow-[0_12px_40px_rgba(0,80,110,0.07)] p-8 lg:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#EAF6FA] flex items-center justify-center mx-auto mb-6">
                      <Send size={28} color="#006E87" />
                    </div>
                    <h3 className="text-2xl font-extrabold italic uppercase tracking-tight text-[#071827] mb-3">
                      Message <span className="text-[#006E87]">Sent!</span>
                    </h3>
                    <p className="text-sm text-[#5F7285]">
                      Thanks for reaching out. We'll be in touch within a few hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#071827] mb-6">
                      Send us a Message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold tracking-[0.12em] uppercase text-[#5F7285] mb-2">Full Name *</label>
                          <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold tracking-[0.12em] uppercase text-[#5F7285] mb-2">Email Address *</label>
                          <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold tracking-[0.12em] uppercase text-[#5F7285] mb-2">Subject</label>
                        <select name="subject" value={form.subject} onChange={handleChange} className={inputClass}>
                          <option value="">Select a topic…</option>
                          <option value="project">New Project</option>
                          <option value="quote">Get a Quote</option>
                          <option value="collaboration">Collaboration</option>
                          <option value="internship">Internship</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold tracking-[0.12em] uppercase text-[#5F7285] mb-2">Message *</label>
                        <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Tell us about your project, budget, and timeline…" className={`${inputClass} resize-none`} />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#006E87] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#005A70] transition-colors duration-250"
                      >
                        <Send size={16} />
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion />
    </>
  );
}