import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('BAMBI App ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('bambi_recovery_videos');
      localStorage.removeItem('theme');
    } catch (e) {
      console.warn('Could not clear storage', e);
    }
    window.location.hash = '';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 text-stone-900 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-xl text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-sm">
              <AlertCircle className="w-8 h-8 text-amber-700" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-stone-900">
                Notice: App View Reset Available
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                An unexpected view glitch occurred. Click below to reload the clean default state for B.A.M.B.I. Peer Support.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-stone-100 text-[11px] font-mono text-stone-600 text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Clean View</span>
              </button>
              <a
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
