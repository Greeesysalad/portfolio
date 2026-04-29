import React, { useRef, useEffect } from 'react';
import doodle from '../assets/malice.png';

interface DoodleRainProps {
  count?: number;
}

interface Doodle {
  x: number;
  y: number;
  size: number;
  speed: number;
  spin: number;
  spinSpeed: number;
  flip: number;
}

const DoodleRain: React.FC<DoodleRainProps> = ({ count = 12 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doodles = useRef<Doodle[]>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Load image
    const img = new window.Image();
    img.src = doodle;
    imgRef.current = img;

    // Initialize doodles
    const resetDoodle = (): Doodle => ({
      x: Math.random() * canvas.width,
      y: -Math.random() * canvas.height,
      size: 60 + Math.random() * 60,
      speed: 1 + Math.random() * 1.5,
      spin: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.04,
      flip: Math.random() < 0.5 ? 1 : -1,
    });
    doodles.current = Array.from({ length: count }, resetDoodle);

    let running = true;
    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      doodles.current.forEach((doodleObj, i) => {
        // Update
        doodleObj.y += doodleObj.speed;
        doodleObj.spin += doodleObj.spinSpeed;
        if (doodleObj.y > canvas.height + doodleObj.size) {
          doodles.current[i] = resetDoodle();
        }
        // Draw
        if (imgRef.current?.complete) {
          ctx.save();
          ctx.translate(doodleObj.x, doodleObj.y);
          ctx.rotate(doodleObj.spin);
          ctx.scale(doodleObj.flip, 1);
          ctx.drawImage(
            imgRef.current,
            -doodleObj.size / 2,
            -doodleObj.size / 2,
            doodleObj.size,
            doodleObj.size
          );
          ctx.restore();
        }
      });
      requestAnimationFrame(animate);
    };
    img.onload = animate;
    return () => {
      running = false;
      window.removeEventListener('resize', setSize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default DoodleRain;
