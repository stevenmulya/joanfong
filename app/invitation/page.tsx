'use client'

import { motion, easeOut } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easeOut,
    },
  },
}

const chapterData = [
  {
    id: 'coffee',
    time: '09:00 - 10:00',
    title: 'Chapter 1: The Coffee Date',
    description: 'Let’s start our day with a warm cup of coffee and a sweet conversation.',
  },
  {
    id: 'aquarium',
    time: '11:00 - 13:00',
    title: 'Chapter 2: The Aquarium Adventure',
    description: 'Time to dive into an underwater world filled with colorful marine life.',
  },
  {
    id: 'lunch',
    time: '14:00 - 15:00',
    title: 'Chapter 3: The Japanese Lunch',
    description: 'A perfect end to our adventure with delicious Japanese cuisine.',
  },
]

export default function InvitationPage() {
  const [completedChapters, setCompletedChapters] = useState<string[]>([])

  useEffect(() => {
    const storedProgress = localStorage.getItem('completedChapters')
    if (storedProgress) {
      setCompletedChapters(JSON.parse(storedProgress))
    }
  }, [])

  const isChapterUnlocked = (chapterId: string, index: number) => {
    if (index === 0) return true
    
    const prevChapterId = chapterData[index - 1].id
    return completedChapters.includes(prevChapterId)
  }

  const handleResetProgress = () => {
    localStorage.removeItem('completedChapters');
    setCompletedChapters([]);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-teal-500 to-indigo-600 text-white font-sans overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 w-full max-w-4xl"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-md">
            Our Special Date Itinerary
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 font-light">
            A day of adventure, just for you, Joan Fong.
          </p>
        </motion.div>

        {chapterData.map((chapter, index) => {
          const unlocked = isChapterUnlocked(chapter.id, index)
          const completed = completedChapters.includes(chapter.id)

          return (
            <motion.div
              key={chapter.id}
              variants={itemVariants}
              className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-8 mb-6 shadow-xl transition-transform duration-500 ${unlocked ? 'hover:scale-[1.02]' : ''}`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  {unlocked ? (
                    <>
                      <h2 className="text-xl md:text-2xl font-bold">
                        {chapter.title} {completed && '✅'}
                      </h2>
                      <p className="text-base md:text-lg mt-2">{chapter.description}</p>
                      <p className="text-sm text-white/70 mt-1">{chapter.time}</p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl md:text-2xl font-bold text-white/50">
                        Chapter {index + 1}: Locked 🔒
                      </h2>
                      <p className="text-base md:text-lg mt-2 text-white/50">
                        Solve the previous mission to unlock this adventure.
                      </p>
                    </>
                  )}
                </div>
                {unlocked ? (
                  !completed ? (
                    <Link href={`/mission/${chapter.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 md:mt-0 px-6 py-2 bg-blue-500 text-white rounded-full font-semibold shadow-md hover:bg-blue-600 transition-colors"
                      >
                        Start Mission
                      </motion.button>
                    </Link>
                  ) : (
                    <button disabled className="mt-4 md:mt-0 px-6 py-2 bg-green-500 text-white rounded-full font-semibold shadow-md cursor-not-allowed">
                      Mission Complete
                    </button>
                  )
                ) : (
                  <button disabled className="mt-4 md:mt-0 px-6 py-2 bg-gray-500 text-white rounded-full font-semibold shadow-md cursor-not-allowed">
                    Locked
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <button
            onClick={handleResetProgress}
            className="text-red-400 text-lg font-semibold underline hover:text-red-500 transition-colors"
          >
            Reset Progress
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}