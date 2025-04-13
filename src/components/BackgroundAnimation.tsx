import React, { useEffect, useRef } from 'react';

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Line properties
    const lines: Array<{
      x: number;
      y: number;
      length: number;
      angle: number;
      speed: number;
      width: number;
      color: string;
    }> = [];

    // Create initial lines
    for (let i = 0; i < 30; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 150 + 100,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() - 0.5) * 0.002,
        width: Math.random() * 0.5 + 0.5,
        color: `rgba(0, 0, 0, ${Math.random() * 0.07 + 0.03})`,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        // Update line position
        line.angle += line.speed;
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(
          line.x,
          line.y
        );
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.stroke();

        // Reset line if it goes off screen
        if (line.x < -line.length || line.x > canvas.width + line.length ||
            line.y < -line.length || line.y > canvas.height + line.length) {
          line.x = Math.random() * canvas.width;
          line.y = Math.random() * canvas.height;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

export default BackgroundAnimation;