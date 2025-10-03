'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/i18n/i18n'

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { role: string }
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { t } = useI18n()
  const [userRole, setUserRole] = useState<string | null>(null)

  // Dev mode bypass
  const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === 'true'

  useEffect(() => {
    if (isDevMode) {
      setUserRole(params.role.toUpperCase())
      return
    }

    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Get role from localStorage (in production, get from database)
    const storedRole = localStorage.getItem('userRole')
    if (storedRole) {
      setUserRole(storedRole)
    } else {
      router.push('/auth/signin')
    }
  }, [session, status, router, params.role, isDevMode])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isDevMode && !session) {
    return null
  }

  const navigation = [
    { name: t('dashboard.overview'), href: `/dashboard/${params.role}`, icon: '📊' },
    { name: t('dashboard.projects'), href: `/dashboard/${params.role}/projects`, icon: '🌱' },
    { name: t('dashboard.map'), href: `/dashboard/${params.role}/map`, icon: '🗺️' },
    { name: t('dashboard.globe'), href: `/dashboard/${params.role}/globe`, icon: '🌍' },
    { name: t('dashboard.analytics'), href: `/dashboard/${params.role}/analytics`, icon: '📈' },
    { name: t('dashboard.news'), href: `/dashboard/${params.role}/news`, icon: '📰' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src="/globe.svg"
                alt="Oceara"
                className="h-8 w-8 mr-3"
              />
              <h1 className="text-xl font-bold text-gray-900">Oceara</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {t('dashboard.welcome')} {userRole}
              </span>
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {t('auth.signOut')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}