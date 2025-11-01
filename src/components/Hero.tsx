'use client';

import { useRef, useEffect, useState } from 'react';
import PhotoGallery from './PhotoGallery';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imageScale, setImageScale] = useState(1);
  const [imageScales, setImageScales] = useState([1, 1, 1]);
  const [logoScale, setLogoScale] = useState(1);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [logoDisplay, setLogoDisplay] = useState('none');
  const [imageOffset, setImageOffset] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [galleryOpacity, setGalleryOpacity] = useState(1);
  const [logoSlideProgress, setLogoSlideProgress] = useState(0);
  const [galleryScale, setGalleryScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress based on when section enters and leaves viewport
      // This makes animations trigger based on viewport position, not total section height
      const scrollProgress = Math.max(0, -sectionTop / windowHeight);

      // Main image grows from 40% to 50% width as user scrolls
      // 40% = scale 1, 50% = scale 1.25
      const scale = Math.min(1 + scrollProgress * 0.25, 1.25);
      setImageScale(scale);

      // Gallery images grow sequentially
      // Each image has a stagger offset (0.33 = 1/3 of the scroll range)
      // Grow from 35% to 45% (scale 1 to 1.286)
      const stagger = 0.33;
      const newScales = [
        Math.min(1 + Math.max(0, scrollProgress - 0) * 0.286 / stagger, 1.286),
        Math.min(1 + Math.max(0, scrollProgress - stagger * 0.4) * 0.286 / stagger, 1.286),
        Math.min(1 + Math.max(0, scrollProgress - stagger * 0.7) * 0.286 / stagger, 1.286),
      ];
      setImageScales(newScales);

      // Logo animation - three phases:
      // Phase 1 (0.80-0.85): Slide horizontally to center, no scaling
      // Phase 2 (0.85-0.95): Scale up from 1x to 10x while stationary  
      // Phase 3 (0.95-1.0): Fade out
      const logoTrigger = 1 - (200 / windowHeight);
      if (scrollProgress >= logoTrigger) {
        const logoProgress = Math.min(1, (scrollProgress - logoTrigger) * 1);
        
        // Phase 1: Sliding (0 to 0.333 of animation) - no scaling
        // Phase 2: Scaling (0.333 to 0.833 of animation)
        // Phase 3: Fading (0.833 to 1.0 of animation)
        
        const slideEndPoint = 0.333; // 33% of the progress
        const scaleEndPoint = 0.833; // 83% of the progress
        
        // Sliding progress - from 0 to 1 during first phase, then stays at 1
        let slideProgress = Math.min(logoProgress / slideEndPoint, 1);
        setLogoSlideProgress(slideProgress);
        
        // Only scale after sliding is done
        let newLogoScale = 1;
        if (logoProgress >= slideEndPoint) {
          if (logoProgress < scaleEndPoint) {
            // Scale from 1x to 10x during this phase
            const scaleProgress = (logoProgress - slideEndPoint) / (scaleEndPoint - slideEndPoint);
            newLogoScale = 1 + scaleProgress * 9;
          } else {
            // Maintain full scale during fade
            newLogoScale = 10;
          }
        }
        setLogoScale(newLogoScale);
        
        // Set display to block when animation starts
        setLogoDisplay('block');
        
        // Fade out in the last phase
        if (logoProgress > 0.833) {
          setLogoOpacity(Math.max(0, 1 - (logoProgress - 0.833) / 0.167));
        } else {
          setLogoOpacity(1);
        }
      } else {
        setLogoDisplay('none');
        setLogoScale(1);
        setLogoOpacity(0);
        setLogoSlideProgress(0);
      }

      // Image div scrolls up and disappears at bottom of word div
      // Starts at 60% progress, fully disappears by 85%
      const imageFadeStart = 0.80;
      const imageFadeEnd = 1;
      if (scrollProgress >= imageFadeStart) {
        const fadeProgress = Math.min(1, (scrollProgress - imageFadeStart) / (imageFadeEnd - imageFadeStart));
        setImageOffset(-fadeProgress * 150); // Scroll up 300px
        setImageOpacity(1 - fadeProgress); // Fade out
        setGalleryOpacity(1 - fadeProgress); // Gallery fades out at same time
      } else {
        setImageOffset(0);
        setImageOpacity(1);
        setGalleryOpacity(1);
      }

      // Gallery image scaling - starts after logo animation ends and grows slowly
      const galleryScaleStart = 0.90;
      if (scrollProgress >= galleryScaleStart) {
        const scaleProgress = (scrollProgress - galleryScaleStart) / (1 - galleryScaleStart);
        const newGalleryScale = 1 + scaleProgress * 0.5; // Grows slowly from 1x to 1.5x
        setGalleryScale(newGalleryScale);
      } else {
        setGalleryScale(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[300vh] bg-[#2a2a2a]"
    >
      {/* Container with word div - overlaps on top */}
      <div className="w-full h-[75vh] flex items-start pt-12 relative z-30">
        {/* Word Div - 80% width, left aligned, overlaps on top of image */}
        <div className="w-[85%] px-5">
          <div className="text-4xl text-[#c2c2c2] leading-tight uppercase">
            <p>
              Welcome <br /> to my <span className="font-semibold">portfolio</span>
            </p>
            <p>
              Where creativity meets <span className="font-semibold">vision</span>
            </p>
          </div>
        </div>
      </div>

      {/* Images Gallery - Below word div */}
      <div className="relative z-30 px-5 flex flex-col gap-10" style={{ marginTop: '-60px', opacity: galleryOpacity }}>
        {/* Image 1 */}
        <div 
          className="h-[auto] bg-[#1a1a1a] overflow-hidden flex items-center justify-center"
          style={{ width: `${Math.min(35 * imageScales[0], 45)}%` }}
        >
          <img 
            src="/images/hero1.jpeg" 
            alt="Portfolio 1" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Image 2 */}
        <div 
          className="h-[auto] bg-[#1a1a1a] overflow-hidden flex items-center justify-center"
          style={{ width: `${Math.min(35 * imageScales[1], 45)}%` }}
        >
          <img 
            src="/images/hero2.jpeg" 
            alt="Portfolio 2" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Image 3 */}
        <div 
          className="h-[auto] bg-[#1a1a1a] overflow-hidden flex items-center justify-center"
          style={{ width: `${Math.min(35 * imageScales[2], 45)}%` }}
        >
          <img 
            src="/images/hero3.jpeg" 
            alt="Portfolio 3" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Image Div - Fixed, same top as word div, grows as you scroll */}
      <div
        className="fixed right-4 z-20"
        style={{
          width: `${Math.min(40 * imageScale, 50)}%`,
          top: `calc(8rem + ${imageOffset}px)`,
          opacity: imageOpacity,
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-[#404040] to-[#2a2a2a] flex items-center justify-center">
          <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
            <img 
              src="/images/gcportrait.jpg" 
              alt="Portrait" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Left Logo - slides in from left, stays fixed on screen */}
      <div
        style={{
          position: 'fixed',
          left: '50%',
          top: 'calc(53% - 50px)',
          transform: `translate(calc(-50% - ${400 * (1 - logoSlideProgress)}px), -50%)`,
          opacity: logoOpacity,
          display: logoDisplay,
          zIndex: 15,
          pointerEvents: 'none',
        }}
      >
        <img 
          src="/images/logoleft.png" 
          alt="Left Logo" 
          className="h-7 w-auto"
          style={{ transform: `scale(${2 * logoScale})`, transformOrigin: 'bottom center' }}
        />
      </div>

      {/* Right Logo - slides in from right, stays fixed on screen */}
      <div
        style={{
          position: 'fixed',
          left: '50%',
          top: 'calc(43% + 50px)',
          transform: `translate(calc(-50% + ${400 * (1 - logoSlideProgress)}px), -50%)`,
          opacity: logoOpacity,
          display: logoDisplay,
          zIndex: 15,
          pointerEvents: 'none',
        }}
      >
        <img 
          src="/images/logoright.png" 
          alt="Right Logo" 
          className="h-7 w-auto"
          style={{ transform: `scale(${2 * logoScale})`, transformOrigin: 'top center' }}
        />
      </div>

      {/* Gallery portfolio Section */}
      <div className="relative z-30 w-full px-5 py-20" style={{ transform: 'translateY(100vh)' }}>
        <PhotoGallery />
      </div>
    </section>
  );
}
