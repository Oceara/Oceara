'use client'

import { useState, useEffect, useRef } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'

// Mangrove locations data
const mangroveLocations = [
  // India
  {
    id: 1,
    name: "Sundarbans National Park",
    country: "India",
    region: "West Bengal",
    coordinates: { lat: 21.9497, lng: 88.1461 },
    area: "10,000 km²",
    species: "Rhizophora, Avicennia, Sonneratia",
    description: "The largest mangrove forest in the world and UNESCO World Heritage Site. Home to the Royal Bengal Tiger and critical for coastal protection.",
    carbonStorage: "High",
    threats: "Climate change, sea level rise, deforestation",
    conservation: "Protected under UNESCO, strict conservation measures",
    image: "🌿",
    type: "National Park"
  },
  {
    id: 2,
    name: "Bhitarkanika National Park",
    country: "India",
    region: "Odisha",
    coordinates: { lat: 20.7500, lng: 86.9167 },
    area: "672 km²",
    species: "Rhizophora, Avicennia, Bruguiera",
    description: "Second largest mangrove ecosystem in India. Famous for saltwater crocodiles and diverse bird species.",
    carbonStorage: "High",
    threats: "Industrial pollution, overfishing",
    conservation: "National Park status, community involvement",
    image: "🐊",
    type: "National Park"
  },
  {
    id: 3,
    name: "Pichavaram Mangrove Forest",
    country: "India",
    region: "Tamil Nadu",
    coordinates: { lat: 11.4167, lng: 79.8000 },
    area: "1,100 hectares",
    species: "Rhizophora, Avicennia, Excoecaria",
    description: "One of the largest mangrove forests in India with intricate waterways and rich biodiversity.",
    carbonStorage: "Medium",
    threats: "Urban development, pollution",
    conservation: "Protected area, eco-tourism",
    image: "🚣",
    type: "Protected Forest"
  },
  {
    id: 4,
    name: "Mumbai Mangroves",
    country: "India",
    region: "Maharashtra",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    area: "5,000 hectares",
    species: "Avicennia, Rhizophora, Sonneratia",
    description: "Urban mangroves providing crucial ecosystem services to Mumbai. Natural flood protection for the city.",
    carbonStorage: "Medium",
    threats: "Urban encroachment, pollution, reclamation",
    conservation: "Legal protection, citizen initiatives",
    image: "🏙️",
    type: "Urban Mangroves"
  },
  // International
  {
    id: 5,
    name: "Everglades National Park",
    country: "USA",
    region: "Florida",
    coordinates: { lat: 25.2866, lng: -80.8987 },
    area: "6,105 km²",
    species: "Rhizophora, Avicennia, Laguncularia",
    description: "Largest subtropical wilderness in the US. Critical for water filtration and hurricane protection.",
    carbonStorage: "Very High",
    threats: "Urban development, invasive species, climate change",
    conservation: "National Park, restoration projects",
    image: "🦩",
    type: "National Park"
  },
  {
    id: 6,
    name: "Mangrove National Park",
    country: "UAE",
    region: "Abu Dhabi",
    coordinates: { lat: 24.2992, lng: 54.6973 },
    area: "19 km²",
    species: "Avicennia marina",
    description: "Urban mangrove park in the heart of Abu Dhabi. Important for local biodiversity and carbon sequestration.",
    carbonStorage: "Medium",
    threats: "Urban development, water pollution",
    conservation: "Protected area, monitoring programs",
    image: "🏜️",
    type: "Urban Park"
  },
  {
    id: 7,
    name: "Cairns Mangroves",
    country: "Australia",
    region: "Queensland",
    coordinates: { lat: -16.9186, lng: 145.7781 },
    area: "2,000 hectares",
    species: "Rhizophora, Avicennia, Bruguiera",
    description: "Part of the Great Barrier Reef ecosystem. Critical for marine biodiversity and coastal protection.",
    carbonStorage: "High",
    threats: "Climate change, coral bleaching, development",
    conservation: "Marine Park protection, research programs",
    image: "🪸",
    type: "Marine Protected Area"
  },
  {
    id: 8,
    name: "Mangrove Forests of Bangladesh",
    country: "Bangladesh",
    region: "Sundarbans",
    coordinates: { lat: 22.0000, lng: 89.0000 },
    area: "6,000 km²",
    species: "Rhizophora, Avicennia, Sonneratia",
    description: "Shared with India, these mangroves are crucial for Bangladesh's coastal protection and biodiversity.",
    carbonStorage: "Very High",
    threats: "Cyclones, sea level rise, overexploitation",
    conservation: "International cooperation, community management",
    image: "🌊",
    type: "Transboundary Reserve"
  }
]

const mapContainerStyle = {
  width: '100%',
  height: '100%'
}

const center = {
  lat: 20.0,
  lng: 80.0
}

export default function MangroveMap() {
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  const filteredLocations = mangroveLocations.filter(location => {
    const matchesFilter = filter === 'all' || location.country === filter
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.region.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const countries = ['all', ...Array.from(new Set(mangroveLocations.map(loc => loc.country)))]

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map
    setMap(map)
  }

  const onMarkerClick = (location: any) => {
    setSelectedLocation(location)
    if (mapRef.current) {
      mapRef.current.panTo(location.coordinates)
      mapRef.current.setZoom(12)
    }
  }

  const closeInfoWindow = () => {
    setSelectedLocation(null)
  }

  return (
    <div className="min-h-screen sky-gradient">
      {/* Header */}
      <header className="sky-card border-b border-sky-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
                Mangrove Forest Map
              </h1>
              <p className="text-gray-600 mt-1">Explore mangrove ecosystems worldwide</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {filteredLocations.length} locations found
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-screen">
        {/* Sidebar - Mobile: Hidden by default, Desktop: Always visible */}
        <div className="hidden lg:block w-96 bg-white/80 backdrop-blur-sm border-r border-sky-200/20 overflow-y-auto">
          <div className="p-6">
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Locations
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or region..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            {/* Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Country
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              >
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country === 'all' ? 'All Countries' : country}
                  </option>
                ))}
              </select>
            </div>

            {/* Location List */}
            <div className="space-y-3">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => onMarkerClick(location)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedLocation?.id === location.id
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-gray-200 hover:border-sky-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{location.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{location.name}</h3>
                      <p className="text-sm text-gray-600">{location.region}, {location.country}</p>
                      <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                        <span>📏 {location.area}</span>
                        <span>🌱 {location.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden fixed top-20 left-4 z-10">
          <button
            onClick={() => {
              const sidebar = document.getElementById('mobile-sidebar')
              if (sidebar) {
                sidebar.classList.toggle('hidden')
              }
            }}
            className="sky-button text-white px-4 py-2 rounded-lg text-sm"
          >
            📍 Locations
          </button>
        </div>

        {/* Mobile Sidebar */}
        <div id="mobile-sidebar" className="lg:hidden hidden fixed inset-0 z-20 bg-white/95 backdrop-blur-sm overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Mangrove Locations</h2>
              <button
                onClick={() => {
                  const sidebar = document.getElementById('mobile-sidebar')
                  if (sidebar) {
                    sidebar.classList.add('hidden')
                  }
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {/* Mobile Search */}
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search locations..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Mobile Filter */}
            <div className="mb-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              >
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country === 'all' ? 'All Countries' : country}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Location List */}
            <div className="space-y-2">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => {
                    onMarkerClick(location)
                    const sidebar = document.getElementById('mobile-sidebar')
                    if (sidebar) {
                      sidebar.classList.add('hidden')
                    }
                  }}
                  className={`p-3 rounded-lg border cursor-pointer ${
                    selectedLocation?.id === location.id
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">{location.image}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{location.name}</h3>
                      <p className="text-sm text-gray-600">{location.region}, {location.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative h-96 lg:h-auto">
          <LoadScript
            googleMapsApiKey="AIzaSyCr7OCUUszubXnvzOO5T6-bYOhXGm0o25A"
            libraries={['places']}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={4}
              onLoad={onLoad}
              options={{
                styles: [
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
                  },
                  {
                    featureType: "landscape",
                    elementType: "geometry",
                    stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
                  }
                ]
              }}
            >
              {filteredLocations.map((location) => (
                <Marker
                  key={location.id}
                  position={location.coordinates}
                  onClick={() => onMarkerClick(location)}
                  icon={{
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" fill="#0ea5e9" stroke="#ffffff" stroke-width="2"/>
                        <text x="20" y="26" text-anchor="middle" fill="white" font-size="16">🌿</text>
                      </svg>
                    `)}`,
                    scaledSize: new google.maps.Size(40, 40),
                    anchor: new google.maps.Point(20, 20)
                  }}
                />
              ))}

              {selectedLocation && (
                <InfoWindow
                  position={selectedLocation.coordinates}
                  onCloseClick={closeInfoWindow}
                >
                  <div className="p-4 max-w-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{selectedLocation.image}</span>
                      <h3 className="font-bold text-gray-900">{selectedLocation.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{selectedLocation.region}, {selectedLocation.country}</p>
                    <p className="text-sm text-gray-700 mb-3">{selectedLocation.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><strong>Area:</strong> {selectedLocation.area}</div>
                      <div><strong>Type:</strong> {selectedLocation.type}</div>
                      <div><strong>Carbon Storage:</strong> {selectedLocation.carbonStorage}</div>
                      <div><strong>Species:</strong> {selectedLocation.species}</div>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute bottom-4 right-4 sky-card p-4 rounded-xl">
        <div className="text-sm text-gray-600">
          <div className="font-semibold text-gray-900 mb-2">Global Mangrove Stats</div>
          <div className="space-y-1">
            <div>🌍 Total Area: ~150,000 km²</div>
            <div>🌱 Carbon Storage: 4-5 billion tons</div>
            <div>🛡️ Coastal Protection: 100M+ people</div>
            <div>📉 Loss Rate: 1-2% annually</div>
          </div>
        </div>
      </div>
    </div>
  )
}
