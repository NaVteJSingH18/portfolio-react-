import React from "react";

export default function LogoSphere({ className = "" }) {
  return (
    <div
      className={`relative flex flex-none items-center justify-center rounded-full ${className}`}
      style={{
        width: "48px",
        height: "48px",
        // The radial gradient creates the 3D light and shadow effect
        background: "radial-gradient(circle at 35% 25%, #ffffff 0%, #888888 40%, #111111 90%)",
        // The inset shadow deepens the 3D look on the edges
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5), inset -4px -4px 10px rgba(0,0,0,0.8)",
      }}
    >
      <span
        className="font-sans font-bold tracking-widest text-[#444]"
        style={{
          fontSize: "18px",
          // The text shadow makes the letters look engraved into the sphere
          textShadow: "1px 1px 2px rgba(255,255,255,0.2), -1px -1px 2px rgba(0,0,0,0.9)",
          marginLeft: "2px", // Visually centers the text
        }}
      >
        NS
      </span>
    </div>
  );
}