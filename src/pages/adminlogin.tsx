
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function AdminLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError('')

    // Step 1: Check the email and password with Supabase
    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (loginError) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    // Step 2: Check whether this account is an approved admin
    const { data: isAdmin, error: adminError } =
      await supabase.rpc('is_admin')

    if (adminError || !isAdmin) {
      await supabase.auth.signOut()
      setError('You are not authorized to access the admin dashboard.')
      setLoading(false)
      return
    }

    // Step 3: Allow the approved admin to continue
    navigate('/admin-dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080D1A] px-6 text-white">

      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">

        <h1 className="text-center text-3xl font-bold tracking-wider text-blue-400">
          PARICHAYA
        </h1>

        <h2 className="mt-6 text-center text-2xl font-bold">
          Admin Login
        </h2>

        <p className="mt-2 text-center text-slate-400">
          Sign in to manage student registrations.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-slate-200">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
              className="w-full rounded-lg border border-white/10 bg-[#080D1A] p-3 text-white outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-slate-200">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full rounded-lg border border-white/10 bg-[#080D1A] p-3 text-white outline-none focus:border-blue-400"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>

        </form>

      </div>
    </div>
  )
}

export default AdminLogin
