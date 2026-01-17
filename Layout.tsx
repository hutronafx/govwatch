import React from 'react';
import { Eye, Upload, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onNavigate: (view: 'dashboard' | 'upload') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate }) => {
  return (
    <div className="min-h-screen bg-gw-bg text-gw-text font-sans">
      <nav className="sticky top-0 z-50 bg-gw-bg/95 backdrop-blur border-b border-gw-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <div className="bg-gw-success/10 p-2 rounded-lg">
                <Eye className="w-6 h-6 text-gw-success" />
              </div>
              <span className="font-bold text-xl tracking-tight">GovWatch <span className="text-gw-muted font-normal">MY</span></span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'dashboard' 
                    ? 'bg-gw-card text-white' 
                    : 'text-gw-muted hover:text-white hover:bg-gw-card/50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('upload')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'upload' 
                    ? 'bg-gw-card text-white' 
                    : 'text-gw-muted hover:text-white hover:bg-gw-card/50'
                }`}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Data
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};