'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // initialize map only once

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoieWFzaCIsImEiOiJjbXZ4Z2Z4Z2Z4Z2Z4In0.example'

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [lng, lat],
      zoom: zoom
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl())

    // Add geolocate control
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }))

    // Add sample data points
    const sampleProjects = [
      {
        coordinates: [-70.9, 42.35],
        properties: {
          title: 'Green Valley Farm',
          type: 'Carbon Credit Project',
          credits: '1,250 tCO₂',
          status: 'Active'
        }
      },
      {
        coordinates: [-71.0, 42.4],
        properties: {
          title: 'Solar Farm Project',
          type: 'Renewable Energy',
          credits: '2,100 tCO₂',
          status: 'Active'
        }
      },
      {
        coordinates: [-70.8, 42.3],
        properties: {
          title: 'Forest Conservation',
          type: 'Nature-Based Solution',
          credits: '3,500 tCO₂',
          status: 'Verified'
        }
      }
    ]

    // Add markers for each project
    sampleProjects.forEach(project => {
      const el = document.createElement('div')
      el.className = 'marker'
      el.style.backgroundImage = 'url(/marker-icon.png)'
      el.style.width = '25px'
      el.style.height = '25px'
      el.style.borderRadius = '50%'
      el.style.cursor = 'pointer'
      el.style.backgroundColor = project.properties.status === 'Active' ? '#10B981' : '#3B82F6'

      new mapboxgl.Marker(el)
        .setLngLat(project.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold text-gray-900">${project.properties.title}</h3>
                <p class="text-sm text-gray-600">${project.properties.type}</p>
                <p class="text-sm text-blue-600 font-medium">${project.properties.credits}</p>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  project.properties.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }">
                  ${project.properties.status}
                </span>
              </div>
            `)
        )
        .addTo(map.current!)
    })

    // Update coordinates on move
    map.current.on('move', () => {
      if (map.current) {
        setLng(Number(map.current.getCenter().lng.toFixed(4)))
        setLat(Number(map.current.getCenter().lat.toFixed(4)))
        setZoom(Number(map.current.getZoom().toFixed(2)))
      }
    })
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Interactive Map</h1>
        <p className="text-gray-600 mt-2">Visualize carbon credit projects and geodata</p>
      </div>

      {/* Map Controls */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors">
              Satellite
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors">
              Street
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors">
              Terrain
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div ref={mapContainer} className="w-full h-96" />
      </div>

      {/* Project Legend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Project Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Active Projects</p>
              <p className="text-xs text-gray-500">Currently generating credits</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Verified Projects</p>
              <p className="text-xs text-gray-500">Credits verified and available</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Pending Projects</p>
              <p className="text-xs text-gray-500">Under review</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
