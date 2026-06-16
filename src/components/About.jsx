import { Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { strengths } from "../data";

export default function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeading
        eyebrow="About"
        title="More than just a title - let's dive deeper."
        description="I like building the full path: useful interfaces, clear backend APIs, and systems that are simple enough to keep improving."
      />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5 text-base leading-8 text-zinc-300">
          <p>
            Navtej Singh is an aspiring full-stack developer with a passion for creating
            efficient and scalable web applications. He has experience across frontend and
            backend technologies and keeps learning through hands-on project work.
          </p>
          <p>
            I enjoy designing clean REST APIs with Node.js and Express, connecting data with
            MongoDB, and shaping interfaces that are easy to scan on desktop and mobile.
          </p>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <h3 className="mb-4 text-lg font-semibold text-white">What I bring to the table</h3>
            <ul className="space-y-3 text-zinc-300">
              {[
                "Strong foundation in MERN Stack",
                "Hands-on experience with Node.js and Express backend work",
                "Understanding of REST APIs and database integration",
                "Git and GitHub workflow knowledge",
                "Passion for learning, shipping, and improving",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Sparkles className="mt-1 h-4 w-4 flex-none text-amber-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {strengths.map((strength) => {
            const Icon = strength.icon;
            return (
              <article key={strength.title} className="feature-card">
                <Icon className="h-9 w-9 text-cyan-300" />
                <h3 className="mt-5 text-lg font-semibold text-white">{strength.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{strength.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}