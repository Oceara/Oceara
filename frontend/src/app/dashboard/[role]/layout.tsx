'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: { role: string }
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userRole, setUserRole] = useState<string>('')
  const devMode = process.env.NEXT_PUBLIC_DEV_MODE === 'true'

  useEffect(() => {
    if (!devMode) {
      if (status === 'loading') return
      if (!session) {
        router.push('/auth/signin')
        return
      }
    }

    const role = localStorage.getItem('userRole') || 'farmer'
    setUserRole(role)
    
    // Redirect if role doesn't match URL
    if (params.role !== role.toLowerCase()) {
      router.push(`/dashboard/${role.toLowerCase()}`)
    }
  }, [session, status, router, params.role, devMode])

  if (!devMode && status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!devMode && !session) {
    return null
  }

  const navigation = [
    { name: 'Overview', href: `/dashboard/${params.role}`, icon: '📊' },
    { name: 'Projects', href: `/dashboard/${params.role}/projects`, icon: '🌱' },
    { name: 'Map', href: `/dashboard/${params.role}/map`, icon: '🗺️' },
    { name: 'Globe', href: `/dashboard/${params.role}/globe`, icon: '🌍' },
    { name: 'Analytics', href: `/dashboard/${params.role}/analytics`, icon: '📈' },
    { name: 'News', href: `/dashboard/${params.role}/news`, icon: '📰' },
  ]

  const getRoleTitle = (role: string) => {
    switch (role.toLowerCase()) {
      case 'farmer': return 'Farmer/Landowner'
      case 'buyer': return 'Buyer'
      case 'admin': return 'Admin (NCCR)'
      default: return 'User'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
            <span className="text-white font-bold text-xl">Oceara</span>
          </div>

          {/* User Info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                {(!devMode && session.user?.image) ? (
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <span className="text-blue-600 font-semibold">
                    {(!devMode && session.user?.name?.charAt(0)) || 'U'}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {(!devMode && session.user?.name) || 'User'}
                </p>
                <p className="text-xs text-gray-500">
                  {getRoleTitle(params.role)}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={() => {
                localStorage.removeItem('userRole')
                router.push('/')
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <span className="text-lg">🚪</span>
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
