export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">Oceara</div>
            </div>
            <a
              href="/auth/signin"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Sustainable Agriculture
            <span className="text-blue-600"> Carbon Credit Platform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect farmers, buyers, and administrators in a comprehensive ecosystem 
            for carbon credit trading and sustainable agriculture management.
          </p>
          <a
            href="/auth/signin"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Join the Platform
          </a>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
              🌱
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Farmer/Landowner
            </h3>
            <p className="text-gray-600 mb-6">
              Manage your agricultural land, track carbon sequestration, 
              and monetize your sustainable practices through carbon credits.
            </p>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Land management tools</li>
              <li>• Carbon tracking</li>
              <li>• Credit monetization</li>
              <li>• Market insights</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
              💼
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Buyer
            </h3>
            <p className="text-gray-600 mb-6">
              Purchase verified carbon credits from sustainable agriculture 
              projects and support environmental initiatives.
            </p>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Verified carbon credits</li>
              <li>• Project transparency</li>
              <li>• Impact tracking</li>
              <li>• Portfolio management</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
              ⚙️
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Admin (NCCR)
            </h3>
            <p className="text-gray-600 mb-6">
              Oversee the platform, manage user verification, 
              and monitor the overall ecosystem health and compliance.
            </p>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• User management</li>
              <li>• Compliance monitoring</li>
              <li>• Analytics dashboard</li>
              <li>• System oversight</li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                🗺️
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Interactive Maps</h4>
              <p className="text-gray-600 text-sm">Visualize projects and geodata with Mapbox integration</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                🌍
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3D Globe</h4>
              <p className="text-gray-600 text-sm">Global ecosystem view with Three.js visualization</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                📊
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Analytics</h4>
              <p className="text-gray-600 text-sm">Comprehensive data insights and reporting</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                📱
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Mobile Ready</h4>
              <p className="text-gray-600 text-sm">Responsive design for all devices</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}