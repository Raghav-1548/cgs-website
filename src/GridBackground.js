import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GridBackground = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.Fog('#000000', 20, 40);
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    rendererRef.current = renderer;
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.9); // Slightly transparent black
    mountRef.current.appendChild(renderer.domElement);

    // Create main grid
    const gridHelper = new THREE.GridHelper(80, 80, '#1a1a1a', '#0f0f0f');
    scene.add(gridHelper);

    // Create vertical grid (X-Z plane)
    const verticalGrid = new THREE.GridHelper(80, 80, '#1a1a1a', '#0f0f0f');
    verticalGrid.rotation.x = Math.PI / 2;
    verticalGrid.position.y = 40;
    scene.add(verticalGrid);

    // Create vertical grid (Y-Z plane)
    const verticalGrid2 = new THREE.GridHelper(80, 80, '#1a1a1a', '#0f0f0f');
    verticalGrid2.rotation.z = Math.PI / 2;
    verticalGrid2.position.x = -40;
    scene.add(verticalGrid2);

    // Position camera
    camera.position.set(-40, 8, 40);
    camera.rotation.x = -Math.PI / 6;

    let animationFrameId;

    // Animation
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Rotate grids slowly
      gridHelper.rotation.y += 0.0005;
      verticalGrid.rotation.x += 0.0005;
      verticalGrid2.rotation.z += 0.0005;
      
      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
          if (object.geometry) {
            object.geometry.dispose();
          }
        });
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default GridBackground;