'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import WordReveal from './WordReveal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'BIOGRAPHY', href: '/biography' },
    { label: 'VIDEO', href: '/video' },
    { label: 'PORTFOLIO', href: '/portfolio' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-transparent">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-8 py-6">
        {/* Left side - Home and Biography */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold text-[#c2c2c2] hover:opacity-70 transition-opacity">
            Home
          </Link>
          <Link href="/biography" className="text-lg font-semibold text-[#c2c2c2] hover:opacity-70 transition-opacity">
            Biography
          </Link>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={60}
            height={50}
            priority
            className="object-contain"
          />
        </div>

        {/* Right side - Video and Portfolio */}
        <div className="flex items-center gap-8">
          <Link href="/video" className="text-lg font-semibold text-[#c2c2c2] hover:opacity-70 transition-opacity">
            Video
          </Link>
          <Link href="/portfolio" className="text-lg font-semibold text-[#c2c2c2] hover:opacity-70 transition-opacity">
            Portfolio
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between px-2 py-2 relative z-50">
        {/* Mobile Logo */}
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={200}
          height={40}
          priority
          className="object-contain flex-shrink-0"
        />

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 bg-black flex items-center justify-center relative flex-shrink-0"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5 flex items-center justify-center">
            {/* Top Line */}
            <motion.div
              initial={{ y: -3 }}
              animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute w-4 h-px bg-white origin-center"
            />
            {/* Bottom Line */}
            <motion.div
              initial={{ y: 3 }}
              animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute w-4 h-px bg-white origin-center"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Panel - Slide from Top Right */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', y: '-100%' }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: '100%', y: '-100%' }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="md:hidden fixed inset-0 bg-[#000000] z-40 flex items-center justify-center overflow-hidden"
          >
            <motion.div
              className="flex flex-col gap-4 px-8 w-full max-w-md"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.5,
                  },
                },
              }}
            >
              {navItems.map((item) => (
                <div key={item.href} className="h-fit overflow-hidden">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                    }}
                  >
                    <Link
                      href={item.href}
                      className="text-3xl font-semibold text-[#c2c2c2] hover:opacity-70 transition-opacity block overflow-hidden"
                      onClick={() => setIsOpen(false)}
                    >
                      <WordReveal text={item.label} />
                    </Link>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
