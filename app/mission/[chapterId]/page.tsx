'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion, easeOut } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// --- MISSION DETAILS UPDATED HERE ---
const missionDetails = {
  coffee: {
    title: 'Mission: The Perfect Brew',
    task: 'Buy coffee and a snack for breakfast, then take a selfie with the barista while holding your coffee.',
    time: '09:00 - 10:00',
    background: '/bubu.jpg',
  },
  aquarium: {
    title: 'Mission: Underwater Discovery',
    task: 'Take a picture of your 5 favorite animals, a selfie with an animal that resembles your partner, and don\'t forget a nice photo together.',
    time: '11:00 - 13:00',
    background: '/bibi.jpg',
  },
  lunch: {
    title: 'Mission: Savor the Flavor',
    task: 'Enjoy a Japanese meal (rating 4.9+, 11k+ reviews). Take photos of the food and you two before and after eating.',
    time: '14:00 - 15:00',
    background: '/bobo.jpg',
  },
  massage: {
    title: 'Mission: Ultimate Relaxation',
    task: 'Enjoy a body massage and don\'t talk too much!!',
    time: '19:00 - 20:30',
    background: '/bubu.jpg',
  },
  'slow-walk': {
    title: 'Mission: The Final Stroll',
    task: 'Take a short slow walk to enjoy the evening atmosphere, then get ready to head home.',
    time: '21:00 - 22:00',
    background: '/bibi.jpg',
  },
};

export default function MissionPage() {
  const params = useParams();
  const router = useRouter();
  const chapterId = params.chapterId as keyof typeof missionDetails;
  const mission = missionDetails[chapterId];

  if (!mission) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-500 to-rose-700 text-white text-center">
        <h1 className="text-2xl md:text-4xl font-bold">Mission Not Found!</h1>
      </div>
    );
  }

  const handleCompleteMission = () => {
    const storedProgress = localStorage.getItem('completedChapters');
    const completedChapters = storedProgress ? JSON.parse(storedProgress) : [];
    
    if (!completedChapters.includes(chapterId)) {
      const updatedProgress = [...completedChapters, chapterId];
      localStorage.setItem('completedChapters', JSON.stringify(updatedProgress));
    }

    router.push('/invitation');
  };

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
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 text-white font-sans overflow-hidden">
      {/* Dynamic Background */}
      <Image
        src={mission.background}
        alt={`${mission.title} background`}
        fill
        style={{ objectFit: 'cover' }}
        className="-z-10 filter blur-md opacity-50"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="relative z-10 w-full max-w-2xl text-center bg-black/20 backdrop-blur-md p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
          {mission.title}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/90 font-light">
          {mission.task}
        </p>
        <p className="mt-2 text-sm text-white/70">{mission.time}</p>

        <motion.div className="mt-12 flex flex-col gap-4">
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
              className="px-8 py-3 bg-white/20 border border-white/30 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-white/30 transition-colors"
            >
              Back to Itinerary
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}