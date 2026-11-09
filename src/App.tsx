
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/home'
import Register from './pages/register'
import AdminLogin from './pages/adminlogin'
import AdminDashboard from './pages/admindashboard'

import { supabase } from './lib/supabase'

function ProtectedAdminRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const [checking, setChecking] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } =
        await supabase.auth.getSession()

      if (!session) {
        setAuthorized(false)
        setChecking(false)
        return
      }

      const { data, error } =
        await supabase.rpc('is_admin')

      setAuthorized(!error && data === true)
      setChecking(false)
    }

    checkAdmin()
  }, [])

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080D1A] text-white">
        Checking admin access...
      </div>
    )
  }

  if (!authorized) {
    return <Navigate to="/admin-login" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/register" element={<Register />} />

      <Route path="/admin-login" element={<AdminLogin />} />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  )
}

export default App
