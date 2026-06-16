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
  const [formStatus, setFormStatus] = useState("idle");

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormStatus("sending");

    const submissionData = new FormData();
    submissionData.append("access_key", "3e9be042-8c2e-4fad-a3b1-8d4a91046073");
    submissionData.append("name", formData.name);
    submissionData.append("email", formData.email);
    submissionData.append("subject", formData.subject || "Portfolio Inquiry");
    submissionData.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData,
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Reset status back to idle after 4 seconds
        setTimeout(() => setFormStatus("idle"), 4000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
    }
  }

  return (
    <section id="contact" className="section-shell">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        description="Ready to work together? I would love to hear about your project and how I can help bring it to life."
      />

      {/* LAYOUT FIX: 
        Starts as a single-column layout grid on mobile phones (grid-cols-1).
        Transitions seamlessly to your custom two-column grid ratio on large screens (lg:grid-cols-[0.85fr_1.15fr]).
      */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        
        {/* Left Hand Column: Direct Links and Socials */}
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
                <a 
                  key={link.label} 
                  href={link.href} 
                  target={link.href.startsWith("http") ? "_blank" : undefined} 
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined} 
                  className="secondary-action !px-4 !py-2"
                >
                  <SocialIcon link={link} size={17} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Hand Column: Web3Forms Submission Form */}
        <form className="rounded-xl border border-white/10 bg-zinc-950/70 p-6 backdrop-blur sm:p-8" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold text-white">Send me a message</h3>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="form-field">
              <span>Name</span>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Your name" 
                required 
              />
            </label>
            <label className="form-field">
              <span>Email</span>
              <input 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                placeholder="your.email@example.com" 
                required 
              />
            </label>
          </div>
          
          <label className="form-field mt-4">
            <span>Subject</span>
            <input 
              name="subject" 
              value={formData.subject} 
              onChange={handleInputChange} 
              placeholder="What is this about?" 
            />
          </label>
          
          <label className="form-field mt-4">
            <span>Message</span>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleInputChange} 
              placeholder="Tell me about your project..." 
              rows="6" 
              required 
            />
          </label>
          
          <button 
            type="submit" 
            disabled={formStatus === "sending"}
            className={`primary-action mt-5 w-full justify-center transition-all ${
              formStatus === "success" ? "!bg-emerald-500 !text-black" : ""
            }`}
          >
            {formStatus === "idle" && (
              <>
                <Send size={18} />
                <span>Submit Message</span>
              </>
            )}
            {formStatus === "sending" && <span>Sending message...</span>}
            {formStatus === "success" && <span>Message Sent Successfully!</span>}
            {formStatus === "error" && <span>Error. Please try again.</span>}
          </button>

          {/* User Feedback Status Messages */}
          {formStatus === "success" && (
            <p className="mt-4 text-center text-sm font-medium text-emerald-400">
              Thank you! Your message has been sent directly to Navtej's inbox.
            </p>
          )}
          {formStatus === "error" && (
            <p className="mt-4 text-center text-sm font-medium text-rose-400">
              Something went wrong transmission wise. Please check your connection or use the direct mail link on the left.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}