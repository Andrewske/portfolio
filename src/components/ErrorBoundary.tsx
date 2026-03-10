'use client'

import posthog from 'posthog-js'
import { Component, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // Send to PostHog
    if (posthog.__loaded) {
      posthog.captureException(error, {
        componentStack: errorInfo.componentStack,
        errorBoundary: true,
      })
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-gray-200 font-mono p-4">
          <div className="border border-red-500/20 rounded-lg p-8 bg-black/50 backdrop-blur-sm max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-gray-500 text-sm">error.log</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-red-400">Error:</span>{' '}
                <span className="text-gray-300">Something went wrong</span>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-4 p-4 bg-gray-900 rounded border border-gray-800 overflow-x-auto">
                  <pre className="text-sm text-gray-400">{this.state.error.toString()}</pre>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-800">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded hover:bg-green-500/20 transition-colors"
                >
                  <span className="text-cyan-400">$</span> reload
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
