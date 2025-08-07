'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaPause } from 'react-icons/fa'

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function AudioPlayer({ isPlaying, setIsPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)

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
    <div>
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