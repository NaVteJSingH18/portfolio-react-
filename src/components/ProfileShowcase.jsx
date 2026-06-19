import React from "react";



// IDEA 1: The Avatar (Currently Active)
import profileImg from "../assets/avatar.png";

// IDEA 2: The Simple Portrait (Currently Hidden)
// import profileImg from "../assets/portrait.jpg"; 
// -------------------------

export default function ProfileShowcase() {
  return (
    <div className="group relative w-full max-w-md mx-auto lg:ml-auto overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 p-6 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(52,211,153,0.1)]">
      
      {/* Background Hover Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col gap-6">
        
        {/* Main Profile Image Area */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]">
          <img
            src={profileImg}
            alt="Navtej Singh - Full Stack Developer"
            className="aspect-[4/3] w-full object-cover object-center sm:aspect-video md:aspect-[4/3]"
          />
          {/* Dark gradient overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90" />

          {/* Name & Title positioned over the image */}
          <div className="absolute bottom-5 left-5 right-5">
            <h3 className="text-3xl font-bold tracking-wide text-white">Navtej Singh</h3>
            <p className="mt-1 font-medium text-emerald-400">Full Stack Developer</p>
          </div>
        </div>

        {/* Bio & Badges */}
        <div>
          <p className="mb-4 text-sm leading-relaxed text-zinc-400">
            Transforming ideas into scalable, elegant web applications. I focus on clean architecture, modern interfaces, and building products that solve real problems.
          </p>
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "Express", "MongoDB"].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Compact Statistics Row */}
        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-white">3+</span>
            <span className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">Projects</span>
          </div>
          <div className="flex flex-col items-center justify-center border-x border-white/10 text-center">
            <span className="text-2xl font-bold text-white">10+</span>
            <span className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">Tech Used</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-white">2+</span>
            <span className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">Years Exp</span>
          </div>
        </div>

      </div>
    </div>
  );
}