'use client';

import { motion, easeOut } from 'framer-motion';
import Image from 'next/image';
import { Lora, Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import LetterSlideshow from '../components/LetterSlideshow';

const titleFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
});

const bodyFont = Lora({
  subsets: ['latin'],
  weight: ['400'],
});

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: easeOut,
    },
  },
};

export default function LetterPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start p-4 sm:p-8 pt-28 sm:pt-32 font-sans overflow-hidden">
      <Image
        src="/parchment.jpg"
        alt="Parchment Background"
        fill
        style={{ objectFit: 'cover' }}
        className="-z-10"
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* --- LETTER CONTENT --- */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl p-8 sm:p-12 rounded-lg shadow-2xl border border-white/20"
      >
        <h1 className={`${titleFont.className} text-center text-3xl sm:text-4xl md:text-5xl font-bold text-amber-100 leading-tight drop-shadow-lg mb-8`}>
          Chapter 6: Our Forever
        </h1>
        
        {/* --- FULL LETTER TEXT IS HERE --- */}
        <div className={`${bodyFont.className} text-stone-200 text-base sm:text-lg leading-relaxed space-y-6`}>
          <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-amber-200/80 first-letter:mr-3 first-letter:float-left">
            My Dearest Joan,
          </p>
          <p>
            If you are reading this, it means our perfect day has come to a close. From that first cup of coffee to the final, quiet stroll, every moment was a chapter I never want to forget. Each mission wasn't just a task to be completed, but another memory woven into the story of us.
          </p>
          <p>
            And now, for our final and most important mission—one that lasts a lifetime. It’s not a challenge of puzzles or places, but a simple invitation: to keep choosing each other, every single day. I know I'm not perfect, but my greatest promise is to always try to be the man that you deserve. Our adventure together is my favorite story, and I can't wait to write all the next chapters with you.
          </p>
           <p>
            This isn't the end of our adventure; it's the beginning of a lifetime's worth. Thank you for this day, and thank you for being you.
          </p>
          <p className="mt-8 text-right">
            With all my love,
            <br />
            <span className={`${titleFont.className} text-xl`}>Your Forever</span>
          </p>
        </div>
      </motion.div>

      {/* --- SLIDESHOW COMPONENT --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full flex justify-center mt-8 z-10"
      >
        <LetterSlideshow />
      </motion.div>

      {/* --- Back to Itinerary Button --- */}
      <div className="mt-4 mb-12 text-center z-10">
        <Link href="/invitation">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="text-amber-200/80 font-semibold underline hover:text-white transition-colors"
          >
            Back to Itinerary
          </motion.button>
        </Link>
      </div>
    </div>
  );
}