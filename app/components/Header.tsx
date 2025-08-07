'use client'

import { motion } from 'framer-motion'
import AudioPlayer from './AudioPlayer'

interface HeaderProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function Header({ isPlaying, setIsPlaying }: HeaderProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-8 text-white font-sans"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 1.5 }}
    >
      <div className="text-sm text-gray-300">
        <p>A creation for Joan, My only Joan.</p>
      </div>
      <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </motion.header>
  )
}