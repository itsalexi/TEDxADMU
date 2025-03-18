'use client';

import React, { useEffect, useRef } from 'react';

const MazeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimization 1: Disable alpha for better performance

    let animationFrameId;
    let mazeLines = [];
    let completedLines = [];
    let animationComplete = false;
    let cols, rows;
    let lastTime = 0;

    const gridSize = 40;
    const animationSpeed = 8;
    const FRAME_RATE = 30; // Optimization 2: Limit frame rate
    const FRAME_INTERVAL = 1000 / FRAME_RATE;

    // Optimization 3: Pre-calculate common values
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d', { alpha: false });

    function initMaze() {
      mazeLines = [];
      completedLines = [];
      animationComplete = false;

      const devicePixelRatio = window.devicePixelRatio || 1;
      const adjustedGridSize = devicePixelRatio > 1 ? gridSize : gridSize * 0.8;

      cols = Math.floor(canvas.width / adjustedGridSize);
      rows = Math.floor(canvas.height / adjustedGridSize);

      const maxLines = Math.min(cols * rows * 2, 2000);
      let lineCount = 0;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() > 0.4 && lineCount < maxLines) {
            mazeLines.push({
              x1: i * adjustedGridSize,
              y1: j * adjustedGridSize,
              x2: i * adjustedGridSize,
              y2: (j + 1) * adjustedGridSize,
              drawn: false,
              progress: 0,
            });
            lineCount++;
          }
        }
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j <= rows; j++) {
          if (Math.random() > 0.4 && lineCount < maxLines) {
            mazeLines.push({
              x1: i * adjustedGridSize,
              y1: j * adjustedGridSize,
              x2: (i + 1) * adjustedGridSize,
              y2: j * adjustedGridSize,
              drawn: false,
              progress: 0,
            });
            lineCount++;
          }
        }
      }

      mazeLines.sort(() => 0.5 - Math.random());

      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      offscreenCtx.fillStyle = '#000000';
      offscreenCtx.fillRect(
        0,
        0,
        offscreenCanvas.width,
        offscreenCanvas.height
      );
    }

    function drawLine(ctx, line, progress) {
      const dx = line.x2 - line.x1;
      const dy = line.y2 - line.y1;

      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x1 + dx * progress, line.y1 + dy * progress);
      ctx.stroke();
    }

    function animate(timestamp) {
      if (timestamp - lastTime < FRAME_INTERVAL) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTime = timestamp;

      if (!animationComplete) {
        offscreenCtx.fillStyle = '#000000';
        offscreenCtx.fillRect(0, 0, canvas.width, canvas.height);

        offscreenCtx.strokeStyle = 'rgba(235, 0, 40, 0.3)';
        offscreenCtx.lineWidth = 1.5;

        if (completedLines.length > 0) {
          offscreenCtx.beginPath();
          for (const line of completedLines) {
            offscreenCtx.moveTo(line.x1, line.y1);
            offscreenCtx.lineTo(line.x2, line.y2);
          }
          offscreenCtx.stroke();
        }

        const linesToProcess = Math.min(animationSpeed, mazeLines.length);
        for (let i = 0; i < linesToProcess; i++) {
          if (mazeLines.length === 0) {
            animationComplete = true;
            break;
          }

          const line = mazeLines[0];
          line.progress += 0.1;

          if (line.progress >= 1) {
            line.progress = 1;
            drawLine(offscreenCtx, line, line.progress);
            completedLines.push(line);
            mazeLines.shift();
          } else {
            drawLine(offscreenCtx, line, line.progress);
          }
        }

        const previewCount = Math.min(animationSpeed * 3, mazeLines.length);
        for (let i = 0; i < previewCount; i++) {
          const line = mazeLines[i];
          if (line && line.progress > 0) {
            drawLine(offscreenCtx, line, line.progress);
          }
        }
      } else {
        offscreenCtx.fillStyle = '#000000';
        offscreenCtx.fillRect(0, 0, canvas.width, canvas.height);

        offscreenCtx.strokeStyle = 'rgba(235, 0, 40, 0.25)';
        offscreenCtx.lineWidth = 1.5;

        if (completedLines.length > 0) {
          offscreenCtx.beginPath();
          for (const line of completedLines) {
            offscreenCtx.moveTo(line.x1, line.y1);
            offscreenCtx.lineTo(line.x2, line.y2);
          }
          offscreenCtx.stroke();
        }

        const time = Date.now() / 1000;
        const pulseIntensity = 0.15 + 0.15 * Math.sin(time);

        offscreenCtx.strokeStyle = `rgba(235, 0, 40, ${pulseIntensity})`;
        offscreenCtx.lineWidth = 2;

        const maxGlowLines = Math.min(completedLines.length, 300);
        const glowLinesIndices = new Set();

        while (glowLinesIndices.size < maxGlowLines * 0.2) {
          glowLinesIndices.add(
            Math.floor(Math.random() * completedLines.length)
          );
        }

        offscreenCtx.beginPath();
        for (const index of glowLinesIndices) {
          const line = completedLines[index];
          offscreenCtx.moveTo(line.x1, line.y1);
          offscreenCtx.lineTo(line.x2, line.y2);
        }
        offscreenCtx.stroke();
      }

      ctx.drawImage(offscreenCanvas, 0, 0);

      animationFrameId = requestAnimationFrame(animate);
    }

    const resizeCanvas = () => {
      if (resizeCanvas.timeout) {
        clearTimeout(resizeCanvas.timeout);
      }

      resizeCanvas.timeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initMaze();
      }, 200);
    };

    window.addEventListener('resize', resizeCanvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initMaze();
    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      if (resizeCanvas.timeout) {
        clearTimeout(resizeCanvas.timeout);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default MazeBackground;
