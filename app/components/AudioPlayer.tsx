'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaPause } from 'react-icons/fa'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Mencoba memutar lagu secara otomatis saat komponen dimuat
    const playPromise = audioRef.current?.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          // Gagal autoplay, biasanya karena kebijakan browser
          setIsPlaying(false)
        })
    }
  }, [])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="fixed top-8 right-8 z-50"> {/* Posisi di kanan atas */}
      <audio ref={audioRef} src="/whydobirds.mp3" loop />
      <motion.button
        onClick={togglePlayPause}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 p-2 text-white shadow-xl backdrop-blur-lg transition-colors hover:bg-white/30"
      >
        <motion.div
          key={isPlaying ? 'pause' : 'play'}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
        </motion.div>
      </motion.button>
    </div>
  )
}