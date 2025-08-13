import { Home, RotateCcw, Camera, TrendingUp, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: RotateCcw, label: "Log", path: "/log" },
    { icon: Camera, label: "Scan", path: "/scan" },
    { icon: TrendingUp, label: "Insights", path: "/insights" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          const isScanFeature = path === "/scan";

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg min-w-[60px] relative",
                isActive ? "text-primary" : "text-gray-500 hover:text-gray-700",
                isScanFeature && "transform scale-110",
              )}
            >
              {isScanFeature && (
                <>
                  {/* Scan button highlight background */}
                  <div className="absolute inset-0 bg-primary/10 rounded-lg border-2 border-primary/20"></div>
                  {/* Pulse animation dot */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </>
              )}
              <Icon
                className={cn(
                  "w-6 h-6 mb-1 relative z-10",
                  isActive && "fill-current",
                  isScanFeature && "text-primary",
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium relative z-10",
                  isScanFeature && "text-primary font-bold",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Camera, MessageCircle, User } from 'lucide-react';

export const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/insights', icon: TrendingUp, label: 'Insights' },
    { path: '/scan', icon: Camera, label: 'Scan' },
    { path: '/ai-assistant', icon: MessageCircle, label: 'AI' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
