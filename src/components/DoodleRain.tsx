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

interface Particle extends Doodle {
  vx: number;
  vy: number;
  alpha: number;
}

const DoodleRain: React.FC<DoodleRainProps> = ({ count = 12 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doodles = useRef<Doodle[]>([]);
  const particles = useRef<Particle[]>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const lastSpawnX = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const img = new window.Image();
    img.src = doodle;
    imgRef.current = img;

    const resetDoodle = (): Doodle => {
      // Distribute spawn positions more evenly to reduce clustering
      const segmentWidth = canvas.width / count;
      const baseX = (lastSpawnX.current % count) * segmentWidth;
      // Add small random offset within segment (not spanning into neighboring segments)
      const offset = (Math.random() - 0.5) * segmentWidth * 0.6;
      const x = Math.max(0, Math.min(canvas.width, baseX + offset));
      lastSpawnX.current = (lastSpawnX.current + 1) % count;
      
      return {
        x,
        y: -Math.random() * canvas.height,
        size: 60 + Math.random() * 60,
        speed: 1.2 + Math.random() * 2,
        spin: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.04,
        flip: Math.random() < 0.5 ? 1 : -1,
      };
    };

    doodles.current = Array.from({ length: count }, resetDoodle);

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      doodles.current.forEach((d, i) => {
        const dx = mouseX - d.x;
        const dy = mouseY - d.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Collision detection (radius check)
        if (distance < d.size / 2) {
          // Create fragments
          for (let j = 0; j < 8; j++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 4;
            particles.current.push({
              ...d,
              size: d.size / 3, // Smaller "mini-cats"
              vx: Math.cos(angle) * velocity,
              vy: Math.sin(angle) * velocity,
              alpha: 1,
            });
          }
          // Respawn the original cat at the top
          doodles.current[i] = resetDoodle();
        }
      });
    };

    canvas.addEventListener('mousedown', handleMouseDown);

    let running = true;
    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update & Draw Falling Cats
      doodles.current.forEach((doodleObj, i) => {
        doodleObj.y += doodleObj.speed;
        doodleObj.spin += doodleObj.spinSpeed;
        if (doodleObj.y > canvas.height + doodleObj.size) {
          doodles.current[i] = resetDoodle();
        }

        if (imgRef.current?.complete) {
          ctx.save();
          ctx.translate(doodleObj.x, doodleObj.y);
          ctx.rotate(doodleObj.spin);
          ctx.scale(doodleObj.flip, 1);
          ctx.drawImage(imgRef.current, -doodleObj.size / 2, -doodleObj.size / 2, doodleObj.size, doodleObj.size);
          ctx.restore();
        }
      });

      // 2. Update & Draw Particles (Explosions)
      particles.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // Simple gravity
        p.alpha -= 0.02; // Fade out
        p.spin += p.spinSpeed * 2;

        if (p.alpha <= 0) {
          particles.current.splice(i, 1);
        } else if (imgRef.current?.complete) {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.spin);
          ctx.drawImage(imgRef.current, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      requestAnimationFrame(animate);
    };

    img.onload = animate;
    return () => {
      running = false;
      window.removeEventListener('resize', setSize);
      canvas.removeEventListener('mousedown', handleMouseDown);
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
        pointerEvents: 'auto', // Changed to auto so can click
        zIndex: 10,
        cursor: 'crosshair',
      }}
    />
  );
};

export default DoodleRain;