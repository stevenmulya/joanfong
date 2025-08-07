import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type FlyingImagesProps = {
  imageSources: string[];
  count: number;
};

type FlyingObject = {
  id: number;
  src: string;
  style: React.CSSProperties;
};

const FlyingImages: React.FC<FlyingImagesProps> = ({ imageSources, count }) => {
  const [objects, setObjects] = useState<FlyingObject[]>([]);

  useEffect(() => {
    if (imageSources.length === 0) return;

    const newObjects: FlyingObject[] = Array.from({ length: count }, (_, i) => {
      const src = imageSources[Math.floor(Math.random() * imageSources.length)];
      const animationName = `float-${Math.ceil(Math.random() * 3)}`;
      const size = Math.random() * 40 + 40; // Ukuran acak antara 40px dan 80px

      return {
        id: i,
        src: src,
        style: {
          position: 'fixed',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animation: `${animationName} linear infinite`,
          animationDuration: `${Math.random() * 10 + 10}s`,
          animationDelay: `-${Math.random() * 15}s`,
          zIndex: 5,
        },
      };
    });

    setObjects(newObjects);
  }, [imageSources, count]);

  if (imageSources.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {objects.map((obj) => (
        <div key={obj.id} style={obj.style}>
          <Image
            src={obj.src}
            alt="Flying character"
            fill
            sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 80px"
            className="rounded-full opacity-50"
          />
        </div>
      ))}
      <style jsx global>{`
        @keyframes float-1 {
          0% { transform: translateX(-20vw) translateY(10vh) rotate(-20deg); }
          50% { transform: translateX(50vw) translateY(-20vh) rotate(20deg); }
          100% { transform: translateX(120vw) translateY(5vh) rotate(-20deg); }
        }
        @keyframes float-2 {
          0% { transform: translateX(120vw) translateY(30vh) rotate(10deg); }
          50% { transform: translateX(40vw) translateY(60vh) rotate(-30deg); }
          100% { transform: translateX(-20vw) translateY(20vh) rotate(10deg); }
        }
        @keyframes float-3 {
          0% { transform: translateX(50vw) translateY(120vh) rotate(30deg); }
          50% { transform: translateX(20vw) translateY(50vh) rotate(-10deg); }
          100% { transform: translateX(60vw) translateY(-20vh) rotate(30deg); }
        }
      `}</style>
    </div>
  );
};

export default FlyingImages;