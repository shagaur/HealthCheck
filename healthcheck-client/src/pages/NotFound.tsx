import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-indigo-600 opacity-20 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-32 h-32 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition duration-200"
          >
            Go Back
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center gap-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
