'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden text-white font-serif">
      <div className="absolute inset-0 z-0 opacity-50">
        <Image
          src="/bubu.jpg"
          alt="Underwater background"
          layout="fill"
          objectFit="cover"
          className="filter blur-sm"
        />
      </div>
      
      {/* Pesan di pojok kiri atas */}
      <motion.div
        className="absolute top-10 left-10 text-sm text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p>A creation for Joan, with love.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="relative z-10 text-center"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          Hello, Joan Fong!
        </h1>
        <p className="text-lg md:text-2xl lg:text-3xl">
          An enchanted journey awaits you.
        </p>
      </motion.div>

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: 'easeOut' }}
          className="relative z-10 mt-12"
        >
          <Link href="/invitation">
            <button className="px-8 py-4 bg-white text-blue-800 rounded-full text-xl font-bold shadow-lg hover:bg-blue-200 transition-colors duration-300">
              Reveal the Message
            </button>
          </Link>
        </motion.div>
      )}
    </div>
  )
}