'use client';

import { motion, easeOut } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Slightly speed up the animation
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, // Slightly speed up the animation
      ease: easeOut,
    },
  },
};

// --- DATA CHANGES HERE ---
const chapterData = [
  {
    id: 'coffee',
    time: '10:00 - 10:30',
    title: 'Chapter 1: The Coffee Date',
    description: 'Buy coffee and a snack for breakfast, then take a selfie with the barista while holding your coffee.',
    location: 'Pick Me Up',
  },
  {
    id: 'aquarium',
    time: '11:00 - 13:00',
    title: 'Chapter 2: The Aquarium Adventure',
    description: 'Take a picture of your 5 favorite animals, a selfie with an animal that resembles your partner, and don\'t forget a nice photo together.',
    location: 'Jakarta Aquarium & Safari',
  },
  {
    id: 'lunch',
    time: '14:00 - 15:00',
    title: 'Chapter 3: The Japanese Lunch',
    description: 'Enjoy a Japanese meal (rating 4.9+, 11k+ reviews). Take photos of the food and you two before and after eating.',
    location: 'Yuki Blok M',
  },
  {
    id: 'massage',
    time: '19:00 - 20:30',
    title: 'Chapter 4: The Relaxing Massage',
    description: 'Enjoy a body massage and don\'t talk too much!!',
    location: 'Yi Tiao Xian PIK',
  },
  {
    id: 'slow-walk',
    time: '21:00 - 22:00',
    title: 'Chapter 5: Slow Walking',
    description: 'Take a short slow walk to enjoy the evening atmosphere, then get ready to head home.',
    location: 'Batavia PIK',
  },
];

export default function InvitationPage() {
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);

  useEffect(() => {
    const storedProgress = localStorage.getItem('completedChapters');
    if (storedProgress) {
      setCompletedChapters(JSON.parse(storedProgress));
    }
  }, []);
  
  // Variable to check if all chapters are complete
  const allChaptersComplete = completedChapters.length === chapterData.length;

  const isChapterUnlocked = (chapterId: string, index: number) => {
    if (index === 0) return true;
    const prevChapterId = chapterData[index - 1].id;
    return completedChapters.includes(prevChapterId);
  };

  const handleResetProgress = () => {
    localStorage.removeItem('completedChapters');
    setCompletedChapters([]);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center px-8 pt-28 pb-12 text-white font-sans overflow-x-hidden">
      <Image
        src="/bibi.jpg"
        alt="Bibi Background"
        fill
        style={{ objectFit: 'cover' }}
        className="-z-10 filter blur-sm opacity-50"
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-4xl"
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
          const unlocked = isChapterUnlocked(chapter.id, index);
          const completed = completedChapters.includes(chapter.id);

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
                      <p className="text-base font-semibold text-cyan-200 mt-2">
                        📍 {chapter.location}
                      </p>
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
          );
        })}

        {/* --- SECRET BUTTON ADDED HERE --- */}
        {allChaptersComplete && (
          <motion.div variants={itemVariants} className="mt-8 text-center">
            <Link href="/letter">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0px 0px 12px rgb(236, 72, 153)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-pink-500 text-white rounded-full font-bold text-lg shadow-lg hover:bg-pink-600 transition-all duration-300"
              >
                Chapter 6
              </motion.button>
            </Link>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <button
            onClick={handleResetProgress}
            className="text-red-300 text-sm font-semibold underline hover:text-red-400 transition-colors"
          >
            Reset Progress
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}