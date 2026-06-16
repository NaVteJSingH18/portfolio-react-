import { useState } from "react";
import { Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import SocialIcon from "./SocialIcon";
import { contactLinks, socialLinks } from "../data";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const subject = encodeURIComponent(formData.subject || "Portfolio inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    );

    setFormStatus("Opening your email app with the message details.");
    window.location.href = `mailto:navtej.dgc@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="section-shell">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        description="Ready to work together? I would love to hear about your project and how I can help bring it to life."
      />

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h3 className="text-2xl font-semibold text-white">Let's connect</h3>
          <p className="mt-4 text-base leading-7 text-zinc-400">
            I am always interested in new opportunities, collaborations, and practical discussions about technology.
          </p>

          <div className="mt-7 space-y-3">
            {contactLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} className="contact-row">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-white/[0.06] text-cyan-200">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block text-sm text-zinc-500">{item.label}</span>
                    <span className="block font-medium text-white">{item.value}</span>
                  </span>
                </a>
              );
            })}
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-semibold text-white">Follow me online</h4>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} className="secondary-action !px-4 !py-2">
                  <SocialIcon link={link} size={17} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <form className="rounded-lg border border-white/10 bg-zinc-950/70 p-5 backdrop-blur" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold text-white">Send me a message</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="form-field">
              <span>Name</span>
              <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" required />
            </label>
            <label className="form-field">
              <span>Email</span>
              <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your.email@example.com" required />
            </label>
          </div>
          <label className="form-field mt-4">
            <span>Subject</span>
            <input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="What is this about?" />
          </label>
          <label className="form-field mt-4">
            <span>Message</span>
            <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell me about your project..." rows="6" required />
          </label>
          <button type="submit" className="primary-action mt-5 w-full justify-center">
            <Send size={18} />
            <span>Submit Message</span>
          </button>
          {formStatus ? <p className="mt-4 text-sm text-emerald-300">{formStatus}</p> : null}
        </form>
      </div>
    </section>
  );
}