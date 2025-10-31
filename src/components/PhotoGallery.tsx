'use client';

import Image from 'next/image';
import { RenderImageContext, RenderImageProps, RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import '@/styles/photoGallery.css';
import { useRef, useEffect, useState } from 'react';

import { allPhotos } from '@/components/photos';

// Shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function ImageWrapper({ photo, width, height, alt, title, sizes }: any) {
  const imgRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const photoKey = photo;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [photoKey]);

  return (
    <div
      ref={imgRef}
      style={{
        width: '100%',
        position: 'relative',
        aspectRatio: `${width} / ${height}`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {isVisible && (
        <Image
          fill
          src={photo}
          alt={alt}
          title={title}
          sizes={sizes}
          placeholder={'blurDataURL' in photo ? 'blur' : undefined}
          style={{ objectFit: 'cover' }}
        />
      )}
    </div>
  );
}

function renderNextImage({ alt = '', title, sizes }: RenderImageProps, { photo, width, height }: RenderImageContext) {
  return (
    <ImageWrapper
      photo={photo}
      width={width}
      height={height}
      alt={alt}
      title={title}
      sizes={sizes}
    />
  );
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState(allPhotos);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Shuffle photos on client side only
    setPhotos(shuffleArray(allPhotos));

    // Check if mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="photo-gallery-container">
      <RowsPhotoAlbum
        photos={photos}
        render={{ image: renderNextImage }}
        defaultContainerWidth={isMobile ? 600 : 1200}
        sizes={{
          size: isMobile ? '100vw' : '1168px',
          sizes: [{ viewport: '(max-width: 1200px)', size: 'calc(100vw - 32px)' }],
        }}
      />
    </div>
  );
}
