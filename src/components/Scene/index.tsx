import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Points, PointMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Fix: Define intrinsic elements as local components to bypass JSX.IntrinsicElements type checking errors
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const SpotLight = 'spotLight' as any;
const Color = 'color' as any;
const Fog = 'fog' as any;
const Group = 'group' as any;
const Primitive = 'primitive' as any;

const SpaceStation = () => {
  // Use the local model
  const { scene } = useGLTF('/models/space_boi.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          // Enhance materials for cinematic look
          mat.envMapIntensity = 1.5;
          mat.metalness = 0.6;
          mat.roughness = 0.4;
        }
      }
    });
  }, [scene]);

  return (
    <group>
      <Primitive object={scene} scale={1} position={[0, -3, 0]} rotation={[0, 0, 0]} />
    </group>
  );
};

const Scene: React.FC = () => {
  const rimLightRef = useRef<THREE.SpotLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);

  const { camera, mouse } = useThree();

  // State for camera physics
  const state = useRef({
    mouse: new THREE.Vector2(0, 0),
    mouseLerp: new THREE.Vector2(0, 0),
    scrollProgress: 0,
    targetLookAt: new THREE.Vector3(0, 0, 0),
    currentLookAt: new THREE.Vector3(0, 0, 0),
  });

  // Handle Scroll
  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      state.current.scrollProgress = progress;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Main Loop
  useFrame((clockState) => {
    const time = clockState.clock.getElapsedTime();

    // --- 1. Idle State (Drift) ---
    // Slow orbital drift
    const idleRotX = Math.sin(time * 0.1) * 0.05; // Very subtle
    const idleRotY = Math.cos(time * 0.15) * 0.05;

    // Breathing zoom (very subtle Z shift)
    const breathZ = Math.sin(time * 0.5) * 0.2;

    // --- 2. Mouse Parallax (Lagged) ---
    // Target mouse position (normalized -1 to 1)
    state.current.mouse.set(mouse.x, mouse.y);

    // Lerp mouse values (Smooth lag ~120ms equivalent)
    state.current.mouseLerp.lerp(state.current.mouse, 0.05);

    // Map mouse to rotation degrees (converted to radians)
    const mouseRotY = state.current.mouseLerp.x * THREE.MathUtils.degToRad(4);
    const mouseRotX = -state.current.mouseLerp.y * THREE.MathUtils.degToRad(3);

    // --- 3. Scroll Depth Push ---
    const scrollZ = THREE.MathUtils.mapLinear(state.current.scrollProgress, 0, 1, 14, 8);

    // --- 4. Orbit Controls (Mouse) ---
    const azimuth = state.current.mouseLerp.x * 0.5;
    const elevation = state.current.mouseLerp.y * 0.3;

    const distance = scrollZ + breathZ;

    const targetCamX = distance * Math.sin(azimuth) * Math.cos(elevation);
    const targetCamY = distance * Math.sin(elevation);
    const targetCamZ = distance * Math.cos(azimuth) * Math.cos(elevation);

    const sectionOffsetX = Math.sin(state.current.scrollProgress * Math.PI * 2) * 2;
    const finalCamX = targetCamX + sectionOffsetX;

    // Smoothly move camera
    const targetPos = new THREE.Vector3(finalCamX, targetCamY, targetCamZ);
    camera.position.lerp(targetPos, 0.05);

    // Always look at the center
    camera.lookAt(0, 0, 0);

    // Apply subtle "drift" rotation on top for extra life
    camera.rotateZ(idleRotX * 0.5);
    camera.rotateY(mouseRotY + idleRotY);

    // --- 5. Light Color Cycling ---
    if (rimLightRef.current) {
      const t = time * 0.2;
      const hue = 0.6 + Math.sin(t) * 0.15;
      const color = new THREE.Color().setHSL(hue, 1, 0.6);
      rimLightRef.current.color.lerp(color, 0.05);
    }
  });

  // Space Dust
  const particles = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 40;
    }
    return positions;
  }, []);

  return (
    <>
      {/* Lighting & Atmosphere */}
      <AmbientLight intensity={1.0} />

      {/* Main Rim Light (Cycling) */}
      <SpotLight
        ref={rimLightRef}
        position={[8, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={15}
        castShadow
      />

      {/* Fill Light (Soft) */}
      <PointLight
        ref={fillLightRef}
        position={[-5, -2, -5]}
        intensity={2}
        color="#4c1d95"
      />

      {/* Top Cool Light */}
      <PointLight position={[0, 10, 0]} intensity={1} color="#a5f3fc" />

      {/* The Hero Model */}
      <Group>
        <SpaceStation />
      </Group>

      {/* Particles */}
      <Points positions={particles} stride={3}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.3}
        />
      </Points>

      <Color attach="background" args={['#030005']} />
      <Fog attach="fog" args={['#030005', 5, 30]} />

      <Environment preset="night" blur={0.8} />
    </>
  );
};

export default Scene;
