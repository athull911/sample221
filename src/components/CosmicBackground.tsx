import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  twinkleFactor: number;
}

interface Comet {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.min(180, Math.floor((width * height) / 8000));
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      twinkleFactor: Math.random() * Math.PI * 2
    }));

    // Zodiac symbols floating in the background
    const symbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
    const zodiacs = Array.from({ length: 8 }, () => ({
      char: symbols[Math.floor(Math.random() * symbols.length)],
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 24 + 16,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.15 + 0.05,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 0.05
    }));

    // Comets
    const comets: Comet[] = [];
    let lastCometTime = Date.now();

    const spawnComet = () => {
      comets.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        length: Math.random() * 120 + 80,
        speed: Math.random() * 7 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        alpha: 1,
        active: true
      });
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Draw faint deep space nebula patches
      const grad1 = ctx.createRadialGradient(width * 0.25, height * 0.3, 20, width * 0.25, height * 0.3, width * 0.45);
      grad1.addColorStop(0, 'rgba(88, 28, 135, 0.12)');
      grad1.addColorStop(0.5, 'rgba(30, 27, 75, 0.06)');
      grad1.addColorStop(1, 'rgba(7, 9, 19, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 40, width * 0.8, height * 0.7, width * 0.4);
      grad2.addColorStop(0, 'rgba(37, 99, 235, 0.09)');
      grad2.addColorStop(0.6, 'rgba(15, 23, 42, 0.04)');
      grad2.addColorStop(1, 'rgba(7, 9, 19, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.twinkleFactor += star.speed;
        const currentAlpha = Math.max(0.15, Math.min(1, star.alpha + Math.sin(star.twinkleFactor) * 0.35));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${currentAlpha})`;
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = 'rgba(192, 132, 252, 0.8)';
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Draw floating zodiac symbols
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const z of zodiacs) {
        z.x += z.vx;
        z.y += z.vy;
        z.rotation += z.vRot;

        if (z.x < -40) z.x = width + 40;
        if (z.x > width + 40) z.x = -40;
        if (z.y < -40) z.y = height + 40;
        if (z.y > height + 40) z.y = -40;

        ctx.save();
        ctx.translate(z.x, z.y);
        ctx.rotate((z.rotation * Math.PI) / 180);
        ctx.font = `${z.size}px "Outfit", sans-serif`;
        ctx.fillStyle = `rgba(168, 85, 247, ${z.alpha})`;
        ctx.fillText(z.char, 0, 0);
        ctx.restore();
      }

      // Handle shooting stars / comets
      if (Date.now() - lastCometTime > 7000 && Math.random() < 0.03) {
        spawnComet();
        lastCometTime = Date.now();
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i];
        if (!comet.active) {
          comets.splice(i, 1);
          continue;
        }

        const endX = comet.x - Math.cos(comet.angle) * comet.length;
        const endY = comet.y - Math.sin(comet.angle) * comet.length;

        const cometGrad = ctx.createLinearGradient(comet.x, comet.y, endX, endY);
        cometGrad.addColorStop(0, `rgba(255, 255, 255, ${comet.alpha})`);
        cometGrad.addColorStop(0.2, `rgba(192, 132, 252, ${comet.alpha * 0.8})`);
        cometGrad.addColorStop(1, 'rgba(147, 51, 234, 0)');

        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Advance comet
        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;
        comet.alpha -= 0.009;

        if (comet.alpha <= 0 || comet.x > width + 200 || comet.y > height + 200) {
          comet.active = false;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="cosmic-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
