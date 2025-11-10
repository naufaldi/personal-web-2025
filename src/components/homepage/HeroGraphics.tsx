const techIcons = [
  { name: 'React', emoji: '⚛️', x: 15, y: 20 },
  { name: 'TypeScript', emoji: 'TS', x: 45, y: 15 },
  { name: 'Node.js', emoji: 'N', x: 70, y: 25 },
  { name: 'Vite', emoji: '⚡', x: 25, y: 50 },
  { name: 'Tailwind', emoji: '🎨', x: 60, y: 55 },
  { name: 'Flame', emoji: '🔥', x: 35, y: 70 },
]

export default function HeroGraphics() {
  return (
    <div className="relative h-full w-full min-h-[500px] hidden lg:flex items-center justify-center">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full gap-px">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className="border border-border/20"
              style={{
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative h-full w-full">
        {techIcons.map((icon) => (
          <div
            key={icon.name}
            className="absolute flex items-center justify-center rounded-full bg-surface/60 backdrop-blur-sm border border-border/30 text-foreground/70 transition-all duration-300 hover:scale-110 hover:text-foreground hover:border-primary/50 shadow-lg"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              width: '60px',
              height: '60px',
              fontSize: '20px',
              transform: `translate(-50%, -50%)`,
            }}
          >
            {icon.emoji}
          </div>
        ))}

        <div className="absolute bottom-16 right-8 text-xs text-muted-foreground rotate-12 font-mono bg-surface/40 px-3 py-1 rounded border border-border/20">
          hello world!
        </div>
      </div>
    </div>
  )
}

