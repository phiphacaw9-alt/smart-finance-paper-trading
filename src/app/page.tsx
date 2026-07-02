export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg flex flex-col items-center justify-center">
      <div className="text-center animate-slide-down">
        <h1 className="text-5xl font-bold text-neon-cyan mb-4 neon-glow">
          $ SMART FINANCE
        </h1>
        <p className="text-neon-purple text-xl mb-8">
          &gt; Professional Paper Trading Bot
        </p>
        
        <div className="glass-card max-w-md mb-8">
          <p className="text-neon-green mb-4">Loading system...</p>
          <div className="w-full h-2 bg-dark-border rounded-full overflow-hidden">
            <div className="h-full bg-neon-cyan animate-pulse"></div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button className="btn-neon">
            Get Started
          </button>
          <button className="btn-neon-purple">
            Documentation
          </button>
        </div>
      </div>
    </main>
  )
}
