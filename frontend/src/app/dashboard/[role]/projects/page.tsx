'use client'

import { useState, useEffect } from 'react'
import { apiFetch } from '@/lib/api'

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    // Example bridge to backend once endpoint exists
    // apiFetch('/api/projects')
    //   .then((data) => setProjects(data.projects))
    //   .catch(() => setProjects(seedProjects))
    setProjects(seedProjects)
  }, [])

  const seedProjects = [
    {
      id: 1,
      name: 'Green Valley Farm',
      type: 'Agricultural Carbon Credits',
      status: 'Active',
      credits: 2500,
      revenue: 25000,
      location: 'California, USA',
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      description: 'Sustainable farming practices including cover cropping, reduced tillage, and precision agriculture.',
      image: '/api/placeholder/400/300',
      verified: true
    },
    {
      id: 2,
      name: 'Solar Farm Project',
      type: 'Renewable Energy',
      status: 'Active',
      credits: 2100,
      revenue: 21000,
      location: 'Texas, USA',
      startDate: '2024-03-01',
      endDate: '2025-03-01',
      description: 'Large-scale solar installation providing clean energy and carbon offset credits.',
      image: '/api/placeholder/400/300',
      verified: true
    },
    {
      id: 3,
      name: 'Forest Conservation',
      type: 'Nature-Based Solution',
      status: 'Verified',
      credits: 3500,
      revenue: 35000,
      location: 'Oregon, USA',
      startDate: '2023-06-01',
      endDate: '2024-06-01',
      description: 'Protection of old-growth forest with verified carbon sequestration benefits.',
      image: '/api/placeholder/400/300',
      verified: true
    },
    {
      id: 4,
      name: 'Wetland Restoration',
      type: 'Ecosystem Restoration',
      status: 'Active',
      credits: 1800,
      revenue: 18000,
      location: 'Florida, USA',
      startDate: '2024-05-01',
      endDate: '2025-05-01',
      description: 'Restoration of degraded wetlands to improve carbon storage and biodiversity.',
      image: '/api/placeholder/400/300',
      verified: false
    },
    {
      id: 5,
      name: 'Wind Energy Farm',
      type: 'Renewable Energy',
      status: 'Pending',
      credits: 1600,
      revenue: 16000,
      location: 'Iowa, USA',
      startDate: '2024-08-01',
      endDate: '2025-08-01',
      description: 'Wind farm development providing clean energy and carbon offset opportunities.',
      image: '/api/placeholder/400/300',
      verified: false
    },
    {
      id: 6,
      name: 'Regenerative Agriculture',
      type: 'Agricultural Carbon Credits',
      status: 'Active',
      credits: 2200,
      revenue: 22000,
      location: 'Nebraska, USA',
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      description: 'Implementation of regenerative farming practices to improve soil health and carbon sequestration.',
      image: '/api/placeholder/400/300',
      verified: true
    }
  ]

  const filters = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'active', name: 'Active', count: projects.filter(p => p.status === 'Active').length },
    { id: 'verified', name: 'Verified', count: projects.filter(p => p.status === 'Verified').length },
    { id: 'pending', name: 'Pending', count: projects.filter(p => p.status === 'Pending').length }
  ]

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => project.status.toLowerCase() === selectedFilter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Verified': return 'bg-blue-100 text-blue-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">Manage and track your carbon credit projects</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + New Project
        </button>
      </div>

      {/* Filters and View Controls */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.name} ({filter.count})
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                <span className="text-gray-400 text-4xl">🌱</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  {project.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Credits:</span>
                    <span className="font-medium">{project.credits.toLocaleString()} tCO₂</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Revenue:</span>
                    <span className="font-medium">${project.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium">{project.location}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-500">{project.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.credits.toLocaleString()} tCO₂
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${project.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-gray-600 hover:text-gray-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Project Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Project Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
            <div className="text-sm text-gray-500">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {projects.reduce((sum, p) => sum + p.credits, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Credits (tCO₂)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              ${projects.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {projects.filter(p => p.verified).length}
            </div>
            <div className="text-sm text-gray-500">Verified Projects</div>
          </div>
        </div>
      </div>
    </div>
  )
}
