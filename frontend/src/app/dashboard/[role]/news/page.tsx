'use client'

import { useState } from 'react'

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const newsItems = [
    {
      id: 1,
      title: 'New Carbon Credit Standards Announced for 2025',
      excerpt: 'The International Carbon Credit Registry has released updated standards for agricultural carbon credits, focusing on improved measurement and verification protocols.',
      category: 'regulations',
      author: 'Sarah Johnson',
      date: '2024-12-15',
      readTime: '5 min read',
      image: '/api/placeholder/400/200',
      featured: true
    },
    {
      id: 2,
      title: 'Q4 2024 Sustainability Report: Record Growth in Carbon Markets',
      excerpt: 'The latest quarterly report shows unprecedented growth in carbon credit trading, with agricultural projects leading the way in verified emissions reductions.',
      category: 'market',
      author: 'Michael Chen',
      date: '2024-12-14',
      readTime: '7 min read',
      image: '/api/placeholder/400/200',
      featured: false
    },
    {
      id: 3,
      title: 'Platform Maintenance Scheduled for December 20th',
      excerpt: 'We will be performing scheduled maintenance to improve platform performance and add new features. The system will be unavailable from 2:00 AM to 6:00 AM UTC.',
      category: 'announcements',
      author: 'Platform Team',
      date: '2024-12-13',
      readTime: '2 min read',
      image: '/api/placeholder/400/200',
      featured: false
    },
    {
      id: 4,
      title: 'Success Story: Green Valley Farm Achieves 50% Carbon Reduction',
      excerpt: 'A case study on how Green Valley Farm implemented sustainable practices and successfully reduced their carbon footprint while increasing profitability.',
      category: 'success-stories',
      author: 'Emma Rodriguez',
      date: '2024-12-12',
      readTime: '6 min read',
      image: '/api/placeholder/400/200',
      featured: true
    },
    {
      id: 5,
      title: 'New Feature: Advanced Analytics Dashboard Now Available',
      excerpt: 'Users can now access comprehensive analytics including revenue tracking, carbon credit performance, and environmental impact metrics.',
      category: 'features',
      author: 'David Kim',
      date: '2024-12-11',
      readTime: '4 min read',
      image: '/api/placeholder/400/200',
      featured: false
    },
    {
      id: 6,
      title: 'Partnership Announcement: Oceara SIH Partners with Global Climate Initiative',
      excerpt: 'We are excited to announce our partnership with the Global Climate Initiative to expand carbon credit opportunities worldwide.',
      category: 'partnerships',
      author: 'Lisa Wang',
      date: '2024-12-10',
      readTime: '3 min read',
      image: '/api/placeholder/400/200',
      featured: false
    }
  ]

  const categories = [
    { id: 'all', name: 'All News', count: newsItems.length },
    { id: 'regulations', name: 'Regulations', count: newsItems.filter(item => item.category === 'regulations').length },
    { id: 'market', name: 'Market Updates', count: newsItems.filter(item => item.category === 'market').length },
    { id: 'announcements', name: 'Announcements', count: newsItems.filter(item => item.category === 'announcements').length },
    { id: 'success-stories', name: 'Success Stories', count: newsItems.filter(item => item.category === 'success-stories').length },
    { id: 'features', name: 'Features', count: newsItems.filter(item => item.category === 'features').length },
    { id: 'partnerships', name: 'Partnerships', count: newsItems.filter(item => item.category === 'partnerships').length }
  ]

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory)

  const featuredNews = newsItems.filter(item => item.featured)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">News & Updates</h1>
        <p className="text-gray-600 mt-2">Stay informed with the latest news and updates from Oceara SIH</p>
      </div>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Featured News</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredNews.map((item) => (
              <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-white/90 text-sm mb-3">{item.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-white/80">
                  <span>{item.author}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <article key={item.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
              <span className="text-gray-400">📰</span>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.category === 'regulations' ? 'bg-red-100 text-red-800' :
                  item.category === 'market' ? 'bg-green-100 text-green-800' :
                  item.category === 'announcements' ? 'bg-blue-100 text-blue-800' :
                  item.category === 'success-stories' ? 'bg-purple-100 text-purple-800' :
                  item.category === 'features' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-indigo-100 text-indigo-800'
                }`}>
                  {categories.find(cat => cat.id === item.category)?.name}
                </span>
                {item.featured && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {item.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <span>{item.author}</span>
                  <span>•</span>
                  <span>{item.readTime}</span>
                </div>
                <span>{item.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Load More News
        </button>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
          <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest news and updates</p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
