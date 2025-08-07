'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import FlyingImages from './components/FlyingImages';

// Daftar gambar yang akan diterbangkan
const FLYING_CHARACTERS = ['/bubu.jpg', '/bobo.jpg', '/bibi.jpg'];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFlyingImages, setShowFlyingImages] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('TIMER FIRED: showFlyingImages should be true now.');
      setShowFlyingImages(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Header isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      
      {showFlyingImages && (
        <FlyingImages 
          imageSources={FLYING_CHARACTERS} 
          count={25} 
        />
      )}
      
      {children}
    </>
  );
}