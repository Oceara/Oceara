'use client'

import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

export default function DashboardOverview() {
  const { data: session } = useSession()
  const params = useParams()
  const role = params.role as string

  const getRoleSpecificContent = () => {
    switch (role.toLowerCase()) {
      case 'farmer':
        return {
          title: 'Farmer Dashboard',
          subtitle: 'Manage your land and carbon credits',
          stats: [
            { label: 'Total Land Area', value: '250 acres', icon: '🌾' },
            { label: 'Carbon Credits', value: '1,250 tCO₂', icon: '🌱' },
            { label: 'Revenue Generated', value: '$12,500', icon: '💰' },
            { label: 'Active Projects', value: '3', icon: '📋' }
          ],
          recentActivity: [
            'New carbon credit verification completed',
            'Land survey updated for Q4 2024',
            'Payment received for 500 tCO₂ credits',
            'New buyer inquiry for 2025 credits'
          ]
        }
      case 'buyer':
        return {
          title: 'Buyer Dashboard',
          subtitle: 'Purchase and track carbon credits',
          stats: [
            { label: 'Credits Purchased', value: '5,000 tCO₂', icon: '🎯' },
            { label: 'Total Investment', value: '$50,000', icon: '💼' },
            { label: 'Active Projects', value: '12', icon: '📊' },
            { label: 'Impact Score', value: '95%', icon: '⭐' }
          ],
          recentActivity: [
            'New credit purchase from Green Valley Farm',
            'Impact report generated for Q4 2024',
            'Portfolio diversification analysis completed',
            'New project opportunity: Solar Farm Credits'
          ]
        }
      case 'admin':
        return {
          title: 'Admin Dashboard',
          subtitle: 'Platform oversight and management',
          stats: [
            { label: 'Total Users', value: '2,847', icon: '👥' },
            { label: 'Active Projects', value: '156', icon: '📈' },
            { label: 'Credits Traded', value: '45,000 tCO₂', icon: '🔄' },
            { label: 'Platform Health', value: '98%', icon: '💚' }
          ],
          recentActivity: [
            'New user verification batch processed',
            'Compliance audit completed for Q4 2024',
            'System performance optimization deployed',
            'New feature: Advanced analytics dashboard'
          ]
        }
      default:
        return {
          title: 'Dashboard',
          subtitle: 'Welcome to Oceara',
          stats: [],
          recentActivity: []
        }
    }
  }

  const content = getRoleSpecificContent()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
        <p className="text-gray-600 mt-2">{content.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {content.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="px-6 py-4">
          <ul className="space-y-3">
            {content.recentActivity.map((activity, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-gray-700">{activity}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <span className="text-blue-600 font-medium">View Projects</span>
            </button>
            <button className="w-full text-left px-4 py-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <span className="text-green-600 font-medium">Check Analytics</span>
            </button>
            <button className="w-full text-left px-4 py-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <span className="text-purple-600 font-medium">View Map</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">News Feed</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600">New carbon credit standards announced</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600">Q4 2024 sustainability report published</p>
              <p className="text-xs text-gray-400 mt-1">1 day ago</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-sm text-gray-600">Platform maintenance scheduled</p>
              <p className="text-xs text-gray-400 mt-1">3 days ago</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Blockchain</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Syncing
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
