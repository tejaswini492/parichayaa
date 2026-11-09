
import { useState } from 'react'
import { supabase } from '../lib/supabase'

function Register() {
  const [studentName, setStudentName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [college, setCollege] = useState('')
  const [department, setDepartment] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setMessage('')
    setError('')

    const { error } = await supabase
      .from('students')
      .insert({
        student_name: studentName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        college: college.trim(),
        department: department.trim(),
      })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setMessage('Registration successful! Your details have been saved.')

    setStudentName('')
    setEmail('')
    setPhone('')
    setCollege('')
    setDepartment('')
  }

  return (
    <div className="min-h-screen bg-[#080D1A] px-6 py-12 text-white">
      <div className="mx-auto max-w-xl">

        <h1 className="text-center text-4xl font-bold tracking-wider text-blue-400">
          PARICHAYA
        </h1>

        <h2 className="mt-4 text-center text-3xl font-bold">
          Student Registration
        </h2>

        <p className="mt-3 text-center text-slate-400">
          Join us for an exciting technical coding experience.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl"
        >

          <div>
            <label className="mb-2 block text-slate-200">Student Name</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border border-white/10 bg-[#080D1A] p-3 text-white placeholder-slate-500 outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-slate-200">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-white/10 bg-[#080D1A] p-3 text-white placeholder-slate-500 outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-slate-200">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
              className="w-full rounded-lg border border-white/10 bg-[#080D1A] p-3 text-white placeholder-slate-500 outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-slate-200">College Name</label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="Enter your college name"
              required
              className="w-full rounded-lg border border-white/10 bg-[#080D1A] p-3 text-white placeholder-slate-500 outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-slate-200">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter your department"
              required
              className="w-full rounded-lg border border-white/10 bg-[#080D1A] p-3 text-white placeholder-slate-500 outline-none focus:border-blue-400"
            />
          </div>

          {message && (
            <p className="rounded-lg bg-green-500/10 p-3 text-green-400">
              {message}
            </p>
          )}

          {error && (
            <p className="rounded-lg bg-red-500/10 p-3 text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Register
