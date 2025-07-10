'use client';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import React, { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  resetOnRouteChange?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Caught by React ErrorBoundary:', error, info);
    // Call the optional onError callback if provided
    this.props.onError?.(error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center"
            role="alert"
            aria-live="assertive"
          >
            <div className="mb-6 flex flex-col items-center">
              <div className="bg-error/10 flex h-16 w-16 items-center justify-center rounded-full">
                <AlertTriangle className="text-error h-8 w-8" aria-hidden="true" />
              </div>
              <h2 className="text-error mt-4 text-2xl font-bold">Something went wrong</h2>
            </div>

            <p className="text-text-secondary mb-6 max-w-lg">
              {this.state.error?.message || 'An unexpected error occurred while loading this page.'}
            </p>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                onClick={this.handleReset}
                className="bg-primary text-on-primary hover:bg-primary/90 focus:ring-primary/50 flex items-center justify-center rounded-lg px-4 py-2 transition-colors focus:ring-2 focus:outline-none"
                aria-label="Try again and reload component"
              >
                <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
                Try Again
              </button>

              <button
                onClick={this.handleReload}
                className="border-primary/20 text-primary bg-surface hover:bg-primary/10 focus:ring-primary/50 flex items-center justify-center rounded-lg border px-4 py-2 transition-colors focus:ring-2 focus:outline-none"
                aria-label="Reload the entire page"
              >
                Reload Page
              </button>
            </div>

            <p className="text-text-muted mt-8 text-sm">
              If this problem persists, please
              <a href="/contact" className="text-primary hover:text-primary/80 ml-1 underline underline-offset-2">
                contact support
              </a>
              .
            </p>
          </div>
        )
      );
    }

    return (
      <ErrorBoundaryResetOnRouteChange resetOnRouteChange={this.props.resetOnRouteChange} onReset={this.handleReset}>
        {this.props.children}
      </ErrorBoundaryResetOnRouteChange>
    );
  }
}

// Helper component to reset error boundary when route changes
function ErrorBoundaryResetOnRouteChange({
  resetOnRouteChange = true,
  onReset,
  children,
}: {
  resetOnRouteChange?: boolean;
  onReset: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Only add the listener if resetOnRouteChange is true
    if (!resetOnRouteChange) return;

    // Reset error state when the URL changes
    const handleRouteChange = () => {
      onReset();
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [resetOnRouteChange, onReset]);

  return <>{children}</>;
}
