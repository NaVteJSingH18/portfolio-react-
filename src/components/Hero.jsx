import React from "react";
import ProfileShowcase from "./ProfileShowcase";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-24 pb-12 sm:pt-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start gap-6">
          
          {/* Availability Badge */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for projects and collaboration
          </div>

          {/* Mini Profile Info */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-white">
              NS
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500">Portfolio of</span>
              <span className="text-sm font-bold text-white">Navtej Singh</span>
            </div>
          </div>

          {/* Main Heading - UPDATED FOR MOBILE RESPONSIVENESS 
            Starts at 4xl for phones, scales to 5xl for tablets, and 6xl/7xl for desktops.
          */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-[1.1]">
            Building digital experiences through real-world projects.
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            B.Tech CSE student passionate about building full stack applications, APIs,
            and practical digital products through hands-on projects.
          </p>

        </div>

        {/* Right Column: Profile Showcase */}
        <div className="w-full">
          <ProfileShowcase />
        </div>

      </div>
    </section>
  );
}