import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Points, PointMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// ---------------------------------------------
// JSX intrinsic element helpers
// ---------------------------------------------

const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const SpotLight = 'spotLight' as any;
const Color = 'color' as any;
const Fog = 'fog' as any;
const Group = 'group' as any;
const Primitive = 'primitive' as any;


// ---------------------------------------------
// CLOTH SETTINGS
// ---------------------------------------------

const CLOTH_STRENGTH = 0.85;

// How wide the cloth influence is
const CLOTH_RADIUS = 2.5;

// Number of folds
const CLOTH_WAVE_FREQ = 14.0;

// Strength of cloth folds
const CLOTH_WAVE_AMOUNT = 0.18;

// Small bulge toward camera
const CLOTH_BULGE_AMOUNT = 0.12;

// Mouse smoothing
const DRAG_SMOOTHING = 0.12;

// How quickly the cloth activates
const CLOTH_ACTIVATE_SPEED = 0.15;


// ---------------------------------------------
// TYPES
// ---------------------------------------------

interface SpaceStationProps {
  introReady: boolean;
}


// =====================================================
// SPACE STATION
// =====================================================

const SpaceStation: React.FC<SpaceStationProps> = ({
  introReady
}) => {

  const { scene } = useGLTF('/models/space_boi.glb');

  const groupRef = useRef<THREE.Group>(null);

  const hasAnimated = useRef(false);

  const { camera } = useThree();


  // ---------------------------------------------
  // Cloth meshes
  // ---------------------------------------------

  const clothMeshes =
    useRef<
      {
        mesh: THREE.Mesh;
        uniforms: any;
      }[]
    >([]);


  // ---------------------------------------------
  // Raycasting
  // ---------------------------------------------

  const raycaster =
    useRef(new THREE.Raycaster());

  const dragPlane =
    useRef(new THREE.Plane());

  const planeNormal =
    useRef(new THREE.Vector3());


  // ---------------------------------------------
  // Mouse positions
  // ---------------------------------------------

  const targetWorldMouse =
    useRef(new THREE.Vector3());

  const currentWorldMouse =
    useRef(new THREE.Vector3());

  const grabWorldPoint =
    useRef(new THREE.Vector3());


  // ---------------------------------------------
  // Reusable objects
  // ---------------------------------------------

  const localMousePoint =
    useRef(new THREE.Vector3());

  const localGrabPoint =
    useRef(new THREE.Vector3());


  // ---------------------------------------------
  // Drag state
  // ---------------------------------------------

  const isDragging =
    useRef(false);


  // ---------------------------------------------
  // Time
  // ---------------------------------------------

  const clock =
    useRef(new THREE.Clock());


  // =====================================================
  // SETUP CLOTH SHADER
  // =====================================================

  useEffect(() => {

    clothMeshes.current = [];


    scene.traverse((child) => {

      if (!(child as THREE.Mesh).isMesh) {
        return;
      }


      const mesh =
        child as THREE.Mesh;


      mesh.castShadow = true;
      mesh.receiveShadow = true;


      // ---------------------------------------------
      // Material
      // ---------------------------------------------

     const material = mesh.material as THREE.Material;

if (!material) return;

if ('envMapIntensity' in material) {
  (material as any).envMapIntensity = 1.5;
}

if ('metalness' in material) {
  (material as any).metalness = 0.6;
}

if ('roughness' in material) {
  (material as any).roughness = 0.4;
}


      // ---------------------------------------------
      // Initial grab point
      // ---------------------------------------------

      const grabLocal =
        mesh.worldToLocal(
          new THREE.Vector3()
        );


      // ---------------------------------------------
      // Uniforms
      // ---------------------------------------------

      const clothUniforms = {

        uTime: {
          value: 0
        },

        uMouse: {
          value: grabLocal.clone()
        },

        uGrab: {
          value: grabLocal.clone()
        },

        uHover: {
          value: 0
        },

        uStrength: {
          value: CLOTH_STRENGTH
        },

        uRadius: {
          value: CLOTH_RADIUS
        }

      };


      // ---------------------------------------------
      // Inject shader
      // ---------------------------------------------

      material.onBeforeCompile = (shader) => {

  Object.assign(shader.uniforms, clothUniforms);

  shader.vertexShader = `
    uniform float uTime;
    uniform vec3 uMouse;
    uniform vec3 uGrab;
    uniform float uHover;
    uniform float uStrength;
    uniform float uRadius;

    ${shader.vertexShader}
  `;

  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `

    #include <begin_vertex>

    // ==========================================
    // DRAG VECTOR
    // ==========================================

    vec3 drag = uMouse - uGrab;

    float dragDistance = length(drag);

    vec3 dragDirection = vec3(0.0);

    if (dragDistance > 0.0001) {
      dragDirection = normalize(drag);
    }


    // ==========================================
    // DISTANCE FROM GRAB
    // ==========================================

    float distanceFromGrab =
      distance(transformed, uGrab);


    // ==========================================
    // INFLUENCE
    // ==========================================

    float influence =
      1.0 -
      smoothstep(
        0.0,
        uRadius,
        distanceFromGrab
      );

    influence =
      pow(
        clamp(influence, 0.0, 1.0),
        2.0
      );


    // ==========================================
    // MAIN CLOTH PULL
    // ==========================================

    vec3 pull =
      drag
      *
      uStrength
      *
      influence
      *
      uHover;


    // ==========================================
    // CLOTH RIPPLE
    // ==========================================

    float wave =
      sin(
        distanceFromGrab * ${CLOTH_WAVE_FREQ.toFixed(1)}
        -
        uTime * 5.0
      );


    float fold =
      wave
      *
      dragDistance
      *
      influence
      *
      ${CLOTH_WAVE_AMOUNT.toFixed(2)}
      *
      uHover;


    // ==========================================
    // PERPENDICULAR DIRECTION
    // ==========================================

    vec3 perpendicular =
      vec3(
        -dragDirection.z,
        0.0,
        dragDirection.x
      );


    pull +=
      perpendicular *
      fold;


    // ==========================================
    // APPLY DEFORMATION
    // ==========================================

    transformed += pull;


    // ==========================================
    // Z BULGE
    // ==========================================

    transformed.z +=
      dragDistance
      *
      influence
      *
      ${CLOTH_BULGE_AMOUNT.toFixed(2)}
      *
      uHover;


    // ==========================================
    // SMALL RIPPLE
    // ==========================================

    float ripple =
      sin(
        distanceFromGrab * 20.0
        -
        uTime * 7.0
      )
      *
      dragDistance
      *
      influence
      *
      0.025
      *
      uHover;


    transformed.z += ripple;

    `
  );
};


      material.needsUpdate = true;


      clothMeshes.current.push({
        mesh,
        uniforms: clothUniforms
      });

    });


    return () => {

      clothMeshes.current = [];

    };

  }, [scene]);


  // =====================================================
  // INTRO ANIMATION
  // =====================================================

  useEffect(() => {

    if (!groupRef.current) {
      return;
    }


    gsap.set(
      groupRef.current.scale,
      {
        x: 0.001,
        y: 0.001,
        z: 0.001
      }
    );


    gsap.set(
      groupRef.current.rotation,
      {
        y: -Math.PI * 1.5
      }
    );


    gsap.set(
      groupRef.current.position,
      {
        y: -6,
        x: 0,
        z: 0
      }
    );

  }, []);


  // =====================================================
  // PLAY INTRO
  // =====================================================

  useEffect(() => {

    if (
      introReady &&
      groupRef.current &&
      !hasAnimated.current
    ) {

      hasAnimated.current = true;


      const tl =
        gsap.timeline({
          defaults: {
            ease: 'power4.out'
          }
        });


      tl.to(
        groupRef.current.scale,
        {
          x: 1,
          y: 1,
          z: 1,

          duration: 2.2,

          ease:
            'elastic.out(0.5, 0.55)'

        },
        0
      );


      tl.to(
        groupRef.current.rotation,
        {
          y: 0,

          duration: 2.4,

          ease:
            'power3.out'

        },
        0
      );


      tl.to(
        groupRef.current.position,
        {
          y: -3,

          duration: 1.9,

          ease:
            'power4.out'

        },
        0.1
      );

    }

  }, [introReady]);


  // =====================================================
  // POINTER DOWN
  // =====================================================

  useEffect(() => {

    const handlePointerDown = (
      event: PointerEvent
    ) => {

      if (!groupRef.current) {
        return;
      }


      // ---------------------------------------------
      // Convert screen → NDC
      // ---------------------------------------------

      const mouse =
        new THREE.Vector2(

          (event.clientX /
            window.innerWidth) *
            2 -
            1,

          -(event.clientY /
            window.innerHeight) *
            2 +
            1

        );


      // ---------------------------------------------
      // Raycast
      // ---------------------------------------------

      raycaster.current.setFromCamera(
        mouse,
        camera
      );


      // ---------------------------------------------
      // Collect meshes
      // ---------------------------------------------

      const meshes:
        THREE.Object3D[] = [];


      scene.traverse((child) => {

        if (
          (child as THREE.Mesh).isMesh
        ) {

          meshes.push(child);

        }

      });


      // ---------------------------------------------
      // Find intersection
      // ---------------------------------------------

      const hits =
        raycaster.current.intersectObjects(
          meshes,
          true
        );


      if (hits.length === 0) {
        return;
      }


      // =============================================
      // WE HAVE GRABBED THE MODEL
      // =============================================

      isDragging.current = true;


      // Exact point where user clicked
      grabWorldPoint.current.copy(
        hits[0].point
      );


      // Mouse starts exactly at grab point
      currentWorldMouse.current.copy(
        hits[0].point
      );


      targetWorldMouse.current.copy(
        hits[0].point
      );


      // ---------------------------------------------
      // Activate cloth
      // ---------------------------------------------

      clothMeshes.current.forEach(
        ({ uniforms }) => {

          uniforms.uHover.value = 1;

        }
      );

    };


    // =================================================
    // POINTER MOVE
    // =================================================

    const handlePointerMove = (
      event: PointerEvent
    ) => {

      if (!isDragging.current) {
        return;
      }


      // ---------------------------------------------
      // Screen → NDC
      // ---------------------------------------------

      const mouse =
        new THREE.Vector2(

          (event.clientX /
            window.innerWidth) *
            2 -
            1,

          -(event.clientY /
            window.innerHeight) *
            2 +
            1

        );


      raycaster.current.setFromCamera(
        mouse,
        camera
      );


      // ---------------------------------------------
      // Create plane through grab point
      // ---------------------------------------------

      camera.getWorldDirection(
        planeNormal.current
      );


      dragPlane.current.setFromNormalAndCoplanarPoint(

        planeNormal.current,

        grabWorldPoint.current

      );


      // ---------------------------------------------
      // Mouse → world
      // ---------------------------------------------

      const hit =
        raycaster.current.ray.intersectPlane(

          dragPlane.current,

          targetWorldMouse.current

        );


      if (!hit) {
        return;
      }

    };


    // =================================================
    // POINTER UP
    // =================================================

    const handlePointerUp = () => {

      if (!isDragging.current) {
        return;
      }


      isDragging.current = false;


      // ---------------------------------------------
      // Spring back
      // ---------------------------------------------

      clothMeshes.current.forEach(
        ({ uniforms }) => {

          gsap.to(
            uniforms.uHover,
            {

              value: 0,

              duration: 0.7,

              ease:
                'elastic.out(1, 0.4)'

            }
          );

        }
      );

    };


    // =================================================
    // LISTENERS
    // =================================================

    window.addEventListener(
      'pointerdown',
      handlePointerDown
    );


    window.addEventListener(
      'pointermove',
      handlePointerMove
    );


    window.addEventListener(
      'pointerup',
      handlePointerUp
    );


    // =================================================
    // CLEANUP
    // =================================================

    return () => {

      window.removeEventListener(
        'pointerdown',
        handlePointerDown
      );


      window.removeEventListener(
        'pointermove',
        handlePointerMove
      );


      window.removeEventListener(
        'pointerup',
        handlePointerUp
      );

    };

  }, [camera, scene]);


  // =====================================================
  // CLOTH FRAME LOOP
  // =====================================================

  useFrame(() => {

    if (
      !groupRef.current ||
      clothMeshes.current.length === 0
    ) {
      return;
    }


    const time =
      clock.current.getElapsedTime();


    // ---------------------------------------------
    // Smooth cursor
    // ---------------------------------------------

    currentWorldMouse.current.lerp(

      targetWorldMouse.current,

      DRAG_SMOOTHING

    );


    // ---------------------------------------------
    // Update every mesh
    // ---------------------------------------------

    clothMeshes.current.forEach(
      ({ mesh, uniforms }) => {


        // =========================================
        // WORLD → LOCAL MOUSE
        // =========================================

        localMousePoint.current.copy(
          currentWorldMouse.current
        );


        mesh.worldToLocal(
          localMousePoint.current
        );


        // =========================================
        // WORLD → LOCAL GRAB
        // =========================================

        localGrabPoint.current.copy(
          grabWorldPoint.current
        );


        mesh.worldToLocal(
          localGrabPoint.current
        );


        // =========================================
        // UPDATE SHADER
        // =========================================

        uniforms.uMouse.value.copy(
          localMousePoint.current
        );


        uniforms.uGrab.value.copy(
          localGrabPoint.current
        );


        uniforms.uTime.value =
          time;


        // =========================================
        // ACTIVATE / DEACTIVATE SMOOTHLY
        // =========================================

        if (isDragging.current) {

          uniforms.uHover.value +=

            (
              1 -
              uniforms.uHover.value
            )

            *

            CLOTH_ACTIVATE_SPEED;

        }

      }
    );

  });


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <group ref={groupRef}>

      <Primitive
        object={scene}
        scale={1}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />

    </group>

  );

};


// =====================================================
// SCENE
// =====================================================

interface SceneProps {
  introReady?: boolean;
}


const Scene: React.FC<SceneProps> = ({
  introReady = true
}) => {


  // ---------------------------------------------
  // Lights
  // ---------------------------------------------

  const rimLightRef =
    useRef<THREE.SpotLight>(null);

  const fillLightRef =
    useRef<THREE.PointLight>(null);


  // ---------------------------------------------
  // Three state
  // ---------------------------------------------

  const {
    camera,
    mouse
  } = useThree();


  // ---------------------------------------------
  // Camera state
  // ---------------------------------------------

  const state = useRef({

    mouse:
      new THREE.Vector2(0, 0),

    mouseLerp:
      new THREE.Vector2(0, 0),

    scrollProgress: 0,

    targetLookAt:
      new THREE.Vector3(0, 0, 0),

    currentLookAt:
      new THREE.Vector3(0, 0, 0)

  });


  // =====================================================
  // SCROLL
  // =====================================================

  useEffect(() => {

    const onScroll = () => {

      const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


      const progress =
        totalHeight > 0

          ? window.scrollY / totalHeight

          : 0;


      state.current.scrollProgress =
        progress;

    };


    window.addEventListener(
      'scroll',
      onScroll,
      {
        passive: true
      }
    );


    return () => {

      window.removeEventListener(
        'scroll',
        onScroll
      );

    };

  }, []);


  // =====================================================
  // CAMERA ANIMATION
  // =====================================================

  useFrame((clockState) => {

    const time =
      clockState.clock.getElapsedTime();


    // ---------------------------------------------
    // Idle movement
    // ---------------------------------------------

    const idleRotX =
      Math.sin(time * 0.1) * 0.05;


    const idleRotY =
      Math.cos(time * 0.15) * 0.05;


    const breathZ =
      Math.sin(time * 0.5) * 0.2;


    // ---------------------------------------------
    // Mouse
    // ---------------------------------------------

    state.current.mouse.set(
      mouse.x,
      mouse.y
    );


    state.current.mouseLerp.lerp(
      state.current.mouse,
      0.05
    );


    // ---------------------------------------------
    // Mouse camera rotation
    // ---------------------------------------------

    const mouseRotY =
      state.current.mouseLerp.x *
      THREE.MathUtils.degToRad(4);


    const mouseRotX =
      -state.current.mouseLerp.y *
      THREE.MathUtils.degToRad(3);


    // ---------------------------------------------
    // Scroll camera
    // ---------------------------------------------

    const scrollZ =
      THREE.MathUtils.mapLinear(

        state.current.scrollProgress,

        0,
        1,

        8,
        14

      );


    // ---------------------------------------------
    // Camera spherical movement
    // ---------------------------------------------

    const azimuth =
      state.current.mouseLerp.x *
      0.5;


    const elevation =
      state.current.mouseLerp.y *
      0.3;


    const distance =
      scrollZ +
      breathZ;


    const targetCamX =
      distance *
      Math.sin(azimuth) *
      Math.cos(elevation);


    const targetCamY =
      distance *
      Math.sin(elevation);


    const targetCamZ =
      distance *
      Math.cos(azimuth) *
      Math.cos(elevation);


    // ---------------------------------------------
    // Section movement
    // ---------------------------------------------

    const sectionOffsetX =
      Math.sin(
        state.current.scrollProgress *
        Math.PI *
        2
      ) *
      2;


    const finalCamX =
      targetCamX +
      sectionOffsetX;


    // ---------------------------------------------
    // Camera target
    // ---------------------------------------------

    const targetPos =
      new THREE.Vector3(
        finalCamX,
        targetCamY,
        targetCamZ
      );


    camera.position.lerp(
      targetPos,
      0.05
    );


    camera.lookAt(
      0,
      0,
      0
    );


    camera.rotateZ(
      idleRotX * 0.5
    );


    camera.rotateY(
      mouseRotY +
      idleRotY
    );


    // ---------------------------------------------
    // Animated rim light
    // ---------------------------------------------

    if (rimLightRef.current) {

      const t =
        time * 0.2;


      const hue =
        0.6 +
        Math.sin(t) *
        0.15;


      const color =
        new THREE.Color().setHSL(
          hue,
          1,
          0.6
        );


      rimLightRef.current.color.lerp(
        color,
        0.05
      );

    }

  });


  // =====================================================
  // PARTICLES
  // =====================================================

  const particles =
    useMemo(() => {

      const count = 1500;


      const positions =
        new Float32Array(
          count * 3
        );


      for (
        let i = 0;
        i < count * 3;
        i++
      ) {

        positions[i] =
          (
            Math.random() -
            0.5
          ) *
          40;

      }


      return positions;

    }, []);


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <>

      {/* =========================================
          LIGHTING
      ========================================= */}

      <AmbientLight
        intensity={1.0}
      />


      <SpotLight
        ref={rimLightRef}
        position={[8, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={15}
        castShadow
      />


      <PointLight
        ref={fillLightRef}
        position={[-5, -2, -5]}
        intensity={2}
        color="#4c1d95"
      />


      <PointLight
        position={[0, 10, 0]}
        intensity={1}
        color="#a5f3fc"
      />


      {/* =========================================
          MODEL
      ========================================= */}

      <Group>

        <SpaceStation
          introReady={introReady}
        />

      </Group>


      {/* =========================================
          PARTICLES
      ========================================= */}

      <Points
        positions={particles}
        stride={3}
      >

        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
          opacity={0.3}
        />

      </Points>


      {/* =========================================
          ENVIRONMENT
      ========================================= */}

      <Color
        attach="background"
        args={['#030005']}
      />


      <Fog
        attach="fog"
        args={[
          '#030005',
          5,
          30
        ]}
      />


      <Environment
        preset="night"
        blur={0.8}
      />

    </>

  );

};


export default Scene;