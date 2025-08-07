'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link'; // 1. Import Link

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 1);
targetDate.setHours(9, 0, 0, 0);

export default function LandingPage() {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setCountdown("Time's up!");
        clearInterval(countdownTimer);
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    };

    const countdownTimer = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(countdownTimer);
    };
  }, []);

  // 2. Fungsi handleRevealClick tidak lagi diperlukan dan bisa dihapus

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden text-white font-serif">
      
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/bubu.jpg"
          alt="Static Background"
          fill
          style={{ objectFit: 'cover' }}
          className="filter blur-sm"
          priority
        />
      </div>

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
        <div className="mt-8">
          <p className="text-xl md:text-2xl font-semibold">Opening in...</p>
          <p className="mt-2 text-3xl md:text-5xl font-bold text-pink-400">
            {countdown}
          </p>
        </div>
      </motion.div>

      {/* 3. Bungkus tombol dengan komponen Link */}
      <Link href="/invitation" className="relative z-10 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: 'easeOut' }}
        >
          <button
            className="px-8 py-4 bg-white text-blue-800 rounded-full text-xl font-bold shadow-lg hover:bg-blue-200 transition-colors duration-300"
          >
            Reveal the Message
          </button>
        </motion.div>
      </Link>
    </main>
  );
}