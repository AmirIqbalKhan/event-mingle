'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-700">EventMingle</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/discover" className="text-gray-800 hover:text-blue-600 font-medium">Discover</Link>
            <Link href="/chat" className="text-gray-800 hover:text-blue-600 font-medium">Chat</Link>
            <Link href="/contacts" className="text-gray-800 hover:text-blue-600 font-medium">Invite</Link>
            <Link href="/cost-splitting" className="text-gray-800 hover:text-blue-600 font-medium">Cost Split</Link>
            <Link href="/calendar" className="text-gray-800 hover:text-blue-600 font-medium">Calendar</Link>
            <Link href="/profile" className="text-gray-800 hover:text-blue-600 font-medium">Profile</Link>
            <Link href="/matchmaking" className="text-gray-800 hover:text-blue-600 font-medium">Matchmaking</Link>
            <Link href="/login" className="text-gray-800 hover:text-blue-600 font-medium">Log in</Link>
            <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 font-semibold">Sign up free</Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/discover" className="text-gray-800 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Discover</Link>
              <Link href="/chat" className="text-gray-800 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Chat</Link>
              <Link href="/contacts" className="text-gray-800 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Invite</Link>
              <Link href="/cost-splitting" className="text-gray-800 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Cost Split</Link>
              <Link href="/calendar" className="text-gray-800 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Calendar</Link>
              <Link href="/profile" className="text-gray-800 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              <Link href="/matchmaking" className="text-gray-800 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Matchmaking</Link>
              <Link href="/login" className="text-gray-800 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Log in</Link>
              <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 font-semibold text-center" onClick={() => setIsMenuOpen(false)}>Sign up free</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 