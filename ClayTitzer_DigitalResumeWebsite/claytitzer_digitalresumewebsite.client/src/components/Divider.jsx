export default function Divider({ variant = 'center' }) {
  if (variant === 'left') {
    return (
      <div className="flex items-center gap-3 my-4 mb-12" aria-hidden="true">
        <div className="w-8 h-px bg-gradient-to-r from-accent/40 to-gold/60" />
        <div className="w-1 h-1 rounded-full bg-gold" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 justify-center my-4" aria-hidden="true">
      <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/60" />
      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
      <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  )
}
