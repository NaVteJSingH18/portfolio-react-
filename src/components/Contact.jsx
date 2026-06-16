import { useState } from "react";
import { Send } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.target);
    
    // Your actual Web3Forms access key injected here
    formData.append("access_key", "3e9be042-8c2e-4fad-a3b1-8d4a91046073");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        event.target.reset(); // Clears the form fields after successful send
        
        // Reset the button text after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="scroll-mt-28 px-5 pb-24 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-white/10 bg-[#0a0a0b] p-8 shadow-2xl">
          <h2 className="mb-8 text-3xl font-bold text-white">Send me a message</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Row 1: Name and Email */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="rounded-lg border border-white/10 bg-zinc-900/50 p-3 text-zinc-300 outline-none transition-colors focus:border-emerald-500/50 focus:bg-zinc-900"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className="rounded-lg border border-white/10 bg-zinc-900/50 p-3 text-zinc-300 outline-none transition-colors focus:border-emerald-500/50 focus:bg-zinc-900"
                />
              </div>
            </div>

            {/* Row 2: Subject */}
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-semibold text-white">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                placeholder="What is this about?"
                className="rounded-lg border border-white/10 bg-zinc-900/50 p-3 text-zinc-300 outline-none transition-colors focus:border-emerald-500/50 focus:bg-zinc-900"
              />
            </div>

            {/* Row 3: Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-white">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                placeholder="Tell me about your project..."
                className="resize-none rounded-lg border border-white/10 bg-zinc-900/50 p-3 text-zinc-300 outline-none transition-colors focus:border-emerald-500/50 focus:bg-zinc-900"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className={`mt-4 flex items-center justify-center gap-2 rounded-full p-4 text-sm font-bold text-black transition-all hover:opacity-90 disabled:opacity-70 ${
                status === "success" 
                  ? "bg-emerald-400" 
                  : "bg-gradient-to-r from-[#4ade80] via-[#facc15] to-[#f87171]" 
              }`}
            >
              {status === "idle" && (
                <>
                  <Send size={18} />
                  Submit Message
                </>
              )}
              {status === "sending" && "Sending..."}
              {status === "success" && "Message Sent!"}
              {status === "error" && "Error. Try Again."}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}