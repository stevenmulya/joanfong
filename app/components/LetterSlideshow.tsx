// components/LetterSlideshow.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const images = Array.from({ length: 10 }, (_, i) => `/image${i + 1}.jpg`);

export default function LetterSlideshow() {
  return (
    <div className="w-full max-w-4xl py-8">
      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow]}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-[300px] sm:h-[450px]"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="!w-[250px] sm:!w-[400px]">
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={src}
                alt={`Memory ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 50vw, 400px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}