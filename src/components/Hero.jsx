import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      {/* Glow gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-slate-950" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(59,130,246,0.25),transparent)]" />

      {/* 3D Spline scene */}
      <div className="relative z-10 h-[70vh] w-full">
        <Spline scene="https://prod.spline.design/Ao-qpnKUMOxV2eTA/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Title overlay */}
      <div className="absolute inset-0 z-20 flex items-end justify-center">
        <div className="pointer-events-none max-w-5xl px-6 pb-10 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(59,130,246,0.35)]">
            Liquid Intelligence Studio
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-300/90">
            Spin up agents, feed them knowledge, and test conversations in a glossy, fluid interface.
          </p>
        </div>
      </div>

      {/* Glass edge highlight */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
    </section>
  )
}

export default Hero
