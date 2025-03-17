'use client';

import React, { useEffect, useRef } from 'react';

const MazeBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
  
    let animationFrameId;
    let mazeLines = [];
    let completedLines = [];
    let animationComplete = false;
    let cols, rows;

    const gridSize = 40;
    const animationSpeed = 8; 

    function initMaze() {
  
      mazeLines = [];
      completedLines = [];
      animationComplete = false;
      
      cols = Math.floor(canvas.width / gridSize);
      rows = Math.floor(canvas.height / gridSize);
      

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() > 0.4) { 
            mazeLines.push({
              x1: i * gridSize,
              y1: j * gridSize,
              x2: i * gridSize,
              y2: (j + 1) * gridSize,
              drawn: false,
              progress: 0
            });
          }
        }
      }
      

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j <= rows; j++) {
          if (Math.random() > 0.4) { 
            mazeLines.push({
              x1: i * gridSize,
              y1: j * gridSize,
              x2: (i + 1) * gridSize,
              y2: j * gridSize,
              drawn: false,
              progress: 0
            });
          }
        }
      }
      

      mazeLines.sort(() => Math.random() - 0.5);
    }
    

    function drawLine(line, progress) {
      const dx = line.x2 - line.x1;
      const dy = line.y2 - line.y1;
      
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x1 + dx * progress, line.y1 + dy * progress);
      ctx.stroke();
    }
    
  
    function animate() {
      if (!animationComplete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
       
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
     
        ctx.strokeStyle = 'rgba(235, 0, 40, 0.3)';
        ctx.lineWidth = 1.5;
        

        completedLines.forEach(line => {
          ctx.beginPath();
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
          ctx.stroke();
        });
        
     
        for (let i = 0; i < Math.min(animationSpeed, mazeLines.length); i++) {
          if (mazeLines.length === 0) {
            animationComplete = true;
            break;
          }
          
          const line = mazeLines[0];
          line.progress += 0.1;
          
          if (line.progress >= 1) {
            line.progress = 1;
            drawLine(line, line.progress);
            completedLines.push(line);
            mazeLines.shift();
          } else {
            drawLine(line, line.progress);
          }
        }
        
        for (let i = animationSpeed; i < Math.min(animationSpeed * 5, mazeLines.length); i++) {
          const line = mazeLines[i];
          if (line.progress > 0) {
            drawLine(line, line.progress);
          }
        }
      } else {
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(235, 0, 40, 0.25)';
        ctx.lineWidth = 1.5;
        
        completedLines.forEach(line => {
          ctx.beginPath();
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
          ctx.stroke();
        });
        
        const time = Date.now() / 1000;
        const pulseIntensity = 0.15 + 0.15 * Math.sin(time);
        
        ctx.strokeStyle = `rgba(235, 0, 40, ${pulseIntensity})`;
        ctx.lineWidth = 2;
        
        const glowLines = completedLines.filter(() => Math.random() > 0.8);
        glowLines.forEach(line => {
          ctx.beginPath();
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
          ctx.stroke();
        });
      }
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initMaze(); 
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); 

    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ 
        width: '100%',
        height: '100%'
      }}
    />

  );
};

export default MazeBackground;