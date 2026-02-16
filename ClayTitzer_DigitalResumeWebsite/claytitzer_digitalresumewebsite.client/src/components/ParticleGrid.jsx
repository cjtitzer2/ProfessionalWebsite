export default function ParticleGrid() {
  const dots = Array.from({ length: 80 }, (_, i) => i)

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid grid-cols-10 gap-8 p-8 opacity-40">
        {dots.map((i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-accent"
            style={{
              animation: `grid-dot ${2 + (i % 5) * 0.6}s ease-in-out infinite`,
              animationDelay: `${(i % 8) * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
