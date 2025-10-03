export default function LandingPage() {
  return (
    <div className="min-h-screen sky-gradient">
      {/* Header */}
      <header className="sky-card border-b border-sky-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
                Oceara
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/mangrove-map"
                className="text-sky-600 hover:text-sky-700 font-medium transition-colors"
              >
                🌍 Mangrove Map
              </a>
              <a
                href="/auth/signin"
                className="text-sky-600 hover:text-sky-700 font-medium transition-colors"
              >
                Sign In
              </a>
              <a
                href="/auth/signup"
                className="sky-button text-white px-6 py-2 rounded-lg font-medium"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Sustainable Agriculture
            <span className="bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent"> Carbon Credit Platform</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect farmers, buyers, and administrators in a comprehensive ecosystem 
            for carbon credit trading and sustainable agriculture management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/signup"
              className="sky-button text-white px-8 py-4 rounded-xl text-lg font-semibold inline-block"
            >
              Join the Platform
            </a>
            <a
              href="/auth/signin"
              className="border-2 border-sky-300 text-sky-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-sky-50 transition-colors inline-block"
            >
              Sign In
            </a>
          </div>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="sky-card rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto shadow-lg">
              🌱
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Farmer/Landowner
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Manage your agricultural land, track carbon sequestration, 
              and monetize your sustainable practices through carbon credits.
            </p>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Land management tools</li>
              <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Carbon tracking</li>
              <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Credit monetization</li>
              <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Market insights</li>
            </ul>
          </div>

          <div className="sky-card rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto shadow-lg">
              💼
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Buyer
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Purchase verified carbon credits from sustainable agriculture 
              projects and support environmental initiatives.
            </p>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Verified carbon credits</li>
              <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Project transparency</li>
              <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Impact tracking</li>
              <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Portfolio management</li>
            </ul>
          </div>

          <div className="sky-card rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-violet-400 to-violet-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto shadow-lg">
              ⚙️
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Admin (NCCR)
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Oversee the platform, manage user verification, 
              and monitor the overall ecosystem health and compliance.
            </p>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> User management</li>
              <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Compliance monitoring</li>
              <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> Analytics dashboard</li>
              <li className="flex items-center"><span className="text-sky-500 mr-2">✓</span> System oversight</li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="sky-card rounded-2xl p-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-sky-100 to-sky-200 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                🗺️
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Interactive Maps</h4>
              <p className="text-gray-600 text-sm">Visualize projects and geodata with Mapbox integration</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                🌍
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3D Globe</h4>
              <p className="text-gray-600 text-sm">Global ecosystem view with Three.js visualization</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-100 to-violet-200 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                📊
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Analytics</h4>
              <p className="text-gray-600 text-sm">Comprehensive data insights and reporting</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
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