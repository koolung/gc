'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Wait 1 second before starting the progress bar
    if (!hasStarted) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, 1000);
      return () => clearTimeout(startTimer);
    }
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => prev + Math.random() * 15);
      }, 50);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      // Mark as complete when progress reaches 100%
      setIsComplete(true);
      // Wait a bit then start removing
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, isComplete, hasStarted]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#2a2a2a',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: loading ? 1 : 0,
        transform: isComplete ? `translateY(-100%)` : 'translateY(0)',
        transition: isComplete ? 'opacity 0.6s ease-out, transform 0.6s ease-out' : 'none',
      }}
    >
      {/* Animation GIF - Top Left Corner */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
        }}
      >
        <img 
          src="/animation.gif" 
          alt="Animation" 
          style={{
            width: '500px',
            height: 'auto',
          }}
        />
      </div>

      {/* Loader - Bottom Right Corner */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          fontSize: '24px',
          color: '#ffffff',
          fontFamily: 'Georgia, Garamond, Times New Roman, serif',
          fontWeight: '300',
          letterSpacing: '2px',
        }}
      >
        {Math.min(Math.floor(progress), 100)}%
      </div>
    </div>
  );
}
