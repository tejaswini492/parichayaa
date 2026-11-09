
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

type Student = {
  id: string
  student_name: string
  email: string
  phone: string
  college: string
  department: string
  created_at: string
}

function AdminDashboard() {
  const navigate = useNavigate()

  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchStudents() {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setError('Unable to load student registrations.')
      } else {
        setStudents(data as Student[])
      }

      setLoading(false)
    }

    fetchStudents()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin-login')
  }

  return (
    <div className="min-h-screen bg-[#080D1A] text-white">

      <header className="flex items-center justify-between border-b border-white/10 px-8 py-6">
        <h1 className="text-2xl font-bold tracking-wider text-blue-400">
          PARICHAYA
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-red-400/30 px-5 py-2 text-red-400 transition hover:bg-red-400/10"
        >
          Logout
        </button>
      </header>

      <main className="px-8 py-10">

        <h2 className="text-3xl font-bold">
          Admin Dashboard
        </h2>

        <p className="mt-2 text-slate-400">
          Manage PARICHAYA student registrations.
        </p>

        <div className="mt-8 max-w-xs rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">
            TOTAL REGISTRATIONS
          </p>

          <p className="mt-3 text-4xl font-bold text-blue-400">
            {students.length}
          </p>
        </div>

        <div className="mt-10">

          <h3 className="mb-5 text-xl font-semibold">
            Student Registrations
          </h3>

          {loading && (
            <p className="text-slate-400">
              Loading student records...
            </p>
          )}

          {error && (
            <p className="rounded-lg bg-red-500/10 p-4 text-red-400">
              {error}
            </p>
          )}

          {!loading && !error && students.length === 0 && (
            <p className="text-slate-400">
              No student registrations found.
            </p>
          )}

          {!loading && !error && students.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[900px] text-left text-sm">

                <thead className="bg-white/10 text-slate-300">
                  <tr>
                    <th className="p-4">Student Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">College</th>
                    <th className="p-4">Department</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-t border-white/10 hover:bg-white/5"
                    >
                      <td className="p-4">{student.student_name}</td>
                      <td className="p-4">{student.email}</td>
                      <td className="p-4">{student.phone}</td>
                      <td className="p-4">{student.college}</td>
                      <td className="p-4">{student.department}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>

      </main>
    </div>
  )
}

export default AdminDashboard
