'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Text } from '@react-three/drei'
import * as THREE from 'three'

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <Sphere
      ref={meshRef}
      args={[1, 64, 64]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={hovered ? '#3B82F6' : '#10B981'}
        wireframe={false}
        transparent
        opacity={0.8}
      />
    </Sphere>
  )
}

function DataPoints() {
  const points = [
    { position: [0.8, 0.3, 0.5], label: 'North America', credits: '15,000 tCO₂' },
    { position: [-0.7, 0.2, 0.6], label: 'Europe', credits: '12,500 tCO₂' },
    { position: [0.2, -0.4, 0.8], label: 'Asia', credits: '18,000 tCO₂' },
    { position: [-0.3, -0.6, -0.7], label: 'South America', credits: '22,000 tCO₂' },
    { position: [0.1, 0.7, -0.6], label: 'Africa', credits: '8,500 tCO₂' },
    { position: [0.6, -0.2, -0.8], label: 'Australia', credits: '5,200 tCO₂' }
  ]

  return (
    <>
      {points.map((point, index) => (
        <group key={index} position={point.position as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshStandardMaterial color="#FF6B6B" />
          </mesh>
          <Text
            position={[0, 0.1, 0]}
            fontSize={0.05}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {point.label}
          </Text>
          <Text
            position={[0, 0.05, 0]}
            fontSize={0.03}
            color="#93C5FD"
            anchorX="center"
            anchorY="middle"
          >
            {point.credits}
          </Text>
        </group>
      ))}
    </>
  )
}

export default function GlobePage() {
  const [stats, setStats] = useState({
    totalCredits: '81,200',
    activeProjects: '156',
    countries: '42',
    impact: '98%'
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">3D Global Ecosystem</h1>
        <p className="text-gray-600 mt-2">Interactive 3D visualization of global carbon credit projects</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">🌍</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Credits</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalCredits} tCO₂</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Projects</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeProjects}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">🌏</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Countries</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.countries}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Impact Score</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.impact}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Globe */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="h-96">
          <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Globe />
            <DataPoints />
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={5}
            />
          </Canvas>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Globe Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">View Mode</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Carbon Credits</option>
              <option>Project Density</option>
              <option>Impact Score</option>
              <option>Revenue</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Time Period</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Time</option>
              <option>2024</option>
              <option>2023</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Project Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Types</option>
              <option>Forest Conservation</option>
              <option>Renewable Energy</option>
              <option>Agriculture</option>
              <option>Wetland Restoration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Regional Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Carbon Credit Distribution</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">North America</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">15,000 tCO₂</p>
              <p className="text-xs text-gray-500">18.5%</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">South America</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">22,000 tCO₂</p>
              <p className="text-xs text-gray-500">27.1%</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">Asia</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">18,000 tCO₂</p>
              <p className="text-xs text-gray-500">22.2%</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">Europe</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">12,500 tCO₂</p>
              <p className="text-xs text-gray-500">15.4%</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">Africa</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">8,500 tCO₂</p>
              <p className="text-xs text-gray-500">10.5%</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">Australia</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">5,200 tCO₂</p>
              <p className="text-xs text-gray-500">6.4%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
