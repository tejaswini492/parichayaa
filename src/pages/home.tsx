
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-[#080D1A] text-white">

      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h2 className="text-2xl font-bold tracking-wider text-blue-400">
          PARICHAYA
        </h2>

        <span className="rounded-full border border-blue-400/30 px-5 py-2 text-sm text-blue-300">
          TECHNICAL EVENT
        </span>
      </nav>

      {/* Main Section */}
      <main className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">

        <p className="mb-6 rounded-full border border-blue-400/30 bg-blue-400/10 px-5 py-2 text-sm text-blue-300">
          WELCOME TO THE WORLD OF TECHNOLOGY
        </p>

        <h1 className="text-6xl font-extrabold tracking-wider sm:text-8xl">
          PARI<span className="text-blue-400">CHAYA</span>
        </h1>

        <h2 className="mt-6 text-2xl font-semibold text-slate-200 sm:text-3xl">
          Think. Code. Create.
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          Challenge your coding skills, explore new technologies,
          and turn your ideas into reality. Join us for an exciting
          technical coding experience.
        </p>

        {/* Event Information */}
        <div className="mt-10 grid w-full max-w-xl grid-cols-2 gap-4">

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-sm text-slate-400">EVENT DATE</p>
            <p className="mt-2 font-semibold text-blue-300">
              To Be Announced
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-sm text-slate-400">VENUE</p>
            <p className="mt-2 font-semibold text-blue-300">
              To Be Announced
            </p>
          </div>

        </div>

        {/* Register Button */}
        <Link
          to="/register"
          className="mt-10 rounded-lg bg-blue-600 px-10 py-4 font-bold shadow-lg shadow-blue-600/30 transition hover:-translate-y-1 hover:bg-blue-500"
        >
          Register Now →
        </Link>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6 text-center text-sm text-slate-500">
        © 2026 PARICHAYA. All Rights Reserved.
      </footer>

    </div>
  )
}

export default Home
