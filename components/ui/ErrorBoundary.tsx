'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from './Button'

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-12 max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card">
          <h2 className="font-display text-2xl font-semibold text-navy">Something went wrong</h2>
          <p className="mt-3 text-sm text-slate-600">Refresh the page and the fallback menu will be ready if the live feed is down.</p>
          <Button className="mt-6" onClick={() => this.setState({ hasError: false })}>
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
