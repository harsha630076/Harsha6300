import BottomNav from '@/components/BottomNav';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Insights() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold">Insights & Trends</h1>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-6">
            📊
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Health Analytics</h2>
          <p className="text-gray-600 mb-6">
            This page will display detailed charts, trends, and insights about your nutrition and health progress.
          </p>
          <p className="text-sm text-gray-500">
            Continue prompting to have this page filled with charts and analytics.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
