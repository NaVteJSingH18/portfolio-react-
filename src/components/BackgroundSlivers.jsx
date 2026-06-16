import { slivers } from "../data";

export default function BackgroundSlivers() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050506]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:84px_84px] opacity-30" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),transparent_32%,rgba(244,63,94,0.08)_68%,transparent)]" />
      {slivers.map((sliver, index) => (
        <span
          key={index}
          className="glass-sliver"
          style={{
            left: sliver.left,
            width: sliver.width,
            height: sliver.height,
            animationDuration: sliver.duration,
            animationDelay: sliver.delay,
          }}
        />
      ))}
    </div>
  );
}