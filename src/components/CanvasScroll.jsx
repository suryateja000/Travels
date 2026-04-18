import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// We add props so the component can talk to the main App
export default function CanvasScroll({ onProgress, onComplete }) {
  const canvasRef = useRef(null);
  
  const frameCount = 85; 
  const framePrefix = "ezgif-frame-"; 
  const frameExtension = ".png"; 
  
  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const images = [];
    let loadedCount = 0; // Keep track of how many images have loaded

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, '0'); 
      img.src = `/sequence/${framePrefix}${frameNumber}${frameExtension}`;
      
      // When this specific image finishes downloading:
      img.onload = () => {
        loadedCount++;
        
        // Calculate percentage (0 to 100) and send it to the parent
        const percent = Math.round((loadedCount / frameCount) * 100);
        if (onProgress) onProgress(percent);

        // If this is the final image to load, draw the first frame and trigger completion
        if (loadedCount === frameCount) {
          context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
          if (onComplete) onComplete();
        }
      };

      images.push(img);
    }

    const animationState = { frame: 0 };

    gsap.to(animationState, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: "#hero-scroll-container", 
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
      onUpdate: () => {
        const currentFrame = animationState.frame;
        if (images[currentFrame]) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(images[currentFrame], 0, 0, canvas.width, canvas.height);
        }
      }
    });
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <canvas 
        ref={canvasRef} 
        width={1920} 
        height={1080} 
        className="w-full h-full object-cover opacity-100" 
      />
    </div>
  );
}