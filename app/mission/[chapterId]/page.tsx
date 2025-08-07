'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion, easeOut } from 'framer-motion'
import Link from 'next/link'

const missionDetails = {
  coffee: {
    title: 'Mission: Find the perfect brew',
    task: 'Take a selfie together with your favorite cup of coffee.',
    time: '09:00 - 10:00',
  },
  aquarium: {
    title: 'Mission: Discover the Mermaid’s Treasure',
    task: 'Find a picture of a rare fish you’ve never seen before and take a photo of it.',
    time: '11:00 - 13:00',
  },
  lunch: {
    title: 'Mission: Savor the Flavor',
    task: 'Capture a photo of our delicious Japanese lunch.',
    time: '14:00 - 15:00',
  },
}

export default function MissionPage() {
  const params = useParams()
  const router = useRouter()
  const chapterId = params.chapterId as keyof typeof missionDetails
  const mission = missionDetails[chapterId]

  if (!mission) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-500 to-rose-700 text-white text-center">
        <h1 className="text-2xl md:text-4xl font-bold">Mission Not Found!</h1>
      </div>
    )
  }

  const handleCompleteMission = () => {
    const storedProgress = localStorage.getItem('completedChapters')
    const completedChapters = storedProgress ? JSON.parse(storedProgress) : []
    
    if (!completedChapters.includes(chapterId)) {
      const updatedProgress = [...completedChapters, chapterId]
      localStorage.setItem('completedChapters', JSON.stringify(updatedProgress))
    }

    router.push('/invitation')
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

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-sans overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
          {mission.title}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/90 font-light">
          {mission.task}
        </p>
        <p className="mt-2 text-sm text-white/70">{mission.time}</p>

        <motion.div variants={itemVariants} className="mt-12 flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCompleteMission}
            className="px-8 py-4 bg-green-500 text-white rounded-full text-lg font-bold shadow-lg hover:bg-green-600 transition-colors"
          >
            Mission Complete! ✅
          </motion.button>
          
          <Link href="/invitation" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-purple-600 rounded-full text-lg font-bold shadow-lg hover:bg-gray-200 transition-colors"
            >
              Back to Itinerary
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}