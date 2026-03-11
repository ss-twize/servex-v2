"use client";
import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Animated orb core ─── */
function Orb() {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const coreMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const wireMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const wire2MatRef = useRef<THREE.MeshBasicMaterial>(null);
  const outerGlowRef = useRef<THREE.MeshBasicMaterial>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const mouseProximity = useRef(0);
  const birthTime = useRef<number | null>(null);
  const { viewport } = useThree();

  useFrame(({ pointer, clock }) => {
    const t = clock.getElapsedTime();

    /* ── Birth time tracking ── */
    if (birthTime.current === null) birthTime.current = t;
    const age = t - birthTime.current;

    /* ── Awakening progress (0→1 over 2.2s) ── */
    const AWAKE_DURATION = 2.2;
    const awakeRaw = Math.min(age / AWAKE_DURATION, 1.0);
    // Cubic ease-out
    const awake = 1 - Math.pow(1 - awakeRaw, 3);

    /* ── Spring entrance scale (0→1 with overshoot) ── */
    // Dampened oscillation: 1 - e^(-kt) * cos(ωt)
    const SPRING_DURATION = 1.0;
    let entranceScale = 1.0;
    if (age < SPRING_DURATION * 2) {
      const k = 4.5; // damping
      const omega = 10; // frequency
      const s = age / SPRING_DURATION;
      entranceScale = Math.max(0.001, 1 - Math.exp(-k * s) * Math.cos(omega * s));
    }

    /* ── Ignition flash at ~1.4s ── */
    // A brief spike of green intensity at ignition moment
    const IGNITION_TIME = 1.4;
    const flashAge = age - IGNITION_TIME;
    const flashIntensity =
      flashAge > 0 && flashAge < 0.5
        ? Math.exp(-flashAge * 12) * 5.0
        : 0;

    /* ── Mouse tracking ── */
    mouse.current.x += (pointer.x * 0.9 - mouse.current.x) * 0.1;
    mouse.current.y += (pointer.y * 0.6 - mouse.current.y) * 0.1;

    const dist = Math.sqrt(pointer.x ** 2 + pointer.y ** 2);
    const targetProx = Math.max(0, 1 - dist * 1.2);
    mouseProximity.current += (targetProx - mouseProximity.current) * 0.08;
    const prox = mouseProximity.current * awake; // no mouse reaction while asleep

    /* ── Group rotation + scale ── */
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08 + mouse.current.x * 2.5 * awake;
      groupRef.current.rotation.x =
        Math.sin(t * 0.05) * 0.1 * awake + mouse.current.y * 1.5 * awake;
      groupRef.current.rotation.z = Math.sin(t * 0.03) * 0.05 * awake;

      const breathSpeed = 1.2 + prox * 3.0;
      const breathAmp = 0.02 + prox * 0.06;
      const breathe = awake > 0.8 ? 1 + Math.sin(t * breathSpeed) * breathAmp : 1;

      groupRef.current.scale.setScalar(entranceScale * breathe);
    }

    /* ── Wireframe counter-rotation ── */
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * (0.04 + prox * 0.15);
      wireRef.current.rotation.x = -t * (0.02 + prox * 0.08);
    }

    /* ── Point light: charges up + ignition flash ── */
    if (glowRef.current) {
      const baseIntensity = awake * (1.5 + Math.sin(t * 1.2) * 0.4 + prox * 2.5);
      glowRef.current.intensity = baseIntensity + flashIntensity;
    }

    /* ── Wireframe green fill-in ── */
    if (wireMatRef.current) {
      // Green fills in from 0, spikes slightly at ignition then settles
      const baseOpacity = awake * (0.35 + prox * 0.4);
      const flashOpacity = flashIntensity * 0.15;
      wireMatRef.current.opacity = baseOpacity + flashOpacity;
      wireMatRef.current.color.setRGB(
        prox * 0.15,
        0.94 + prox * 0.06,
        0.56 + prox * 0.2
      );
    }

    if (wire2MatRef.current) {
      wire2MatRef.current.opacity = awake * (0.12 + prox * 0.18);
    }

    /* ── Core: dark at birth, hints of green at ignition ── */
    if (coreMatRef.current) {
      // At ignition, core gets a brief green pulse
      const coreGreen = awake > 0.6 ? prox * 0.15 + flashIntensity * 0.03 : 0;
      coreMatRef.current.emissive.setRGB(0, coreGreen, coreGreen * 0.5);
      coreMatRef.current.emissiveIntensity = prox * 2 + flashIntensity * 0.2;
    }

    /* ── Outer glow shell: invisible at birth, brightens at ignition ── */
    if (outerGlowRef.current) {
      outerGlowRef.current.opacity = awake * 0.04 + flashIntensity * 0.06;
    }
  });

  const radius = Math.min(viewport.width, viewport.height) * 0.28;
  const clampedRadius = Math.max(1.2, Math.min(radius, 2.2));

  const icoGeo = useMemo(
    () => new THREE.IcosahedronGeometry(clampedRadius, 2),
    [clampedRadius]
  );
  const sphereGeo = useMemo(
    () => new THREE.IcosahedronGeometry(clampedRadius * 0.92, 3),
    [clampedRadius]
  );
  const glowGeo = useMemo(
    () => new THREE.IcosahedronGeometry(clampedRadius * 1.15, 3),
    [clampedRadius]
  );

  return (
    <group ref={groupRef}>
      <pointLight
        ref={glowRef}
        color="#00F090"
        intensity={0} /* starts dark, filled by useFrame */
        distance={12}
        decay={2}
      />

      {/* Dark solid core */}
      <mesh geometry={sphereGeo}>
        <meshStandardMaterial
          ref={coreMatRef}
          color="#040F0F"
          roughness={0.7}
          metalness={0.3}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Green energy wireframe — starts invisible */}
      <mesh ref={wireRef} geometry={icoGeo}>
        <meshBasicMaterial
          ref={wireMatRef}
          color="#00F090"
          wireframe
          transparent
          opacity={0}
        />
      </mesh>

      {/* Secondary finer wireframe — starts invisible */}
      <mesh geometry={icoGeo} rotation={[0.4, 0.3, 0.1]}>
        <meshBasicMaterial
          ref={wire2MatRef}
          color="#00F090"
          wireframe
          transparent
          opacity={0}
        />
      </mesh>

      {/* Outer glow shell — starts invisible */}
      <mesh geometry={glowGeo}>
        <meshBasicMaterial
          ref={outerGlowRef}
          color="#00F090"
          transparent
          opacity={0}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ─── Particles: fade in after orb awakens ─── */
function Particles({ count = 40 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const birthTime = useRef<number | null>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 2;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (birthTime.current === null) birthTime.current = t;
    const age = t - birthTime.current;

    if (ref.current) ref.current.rotation.y = t * 0.02;

    // Particles fade in after ignition (~1.4s)
    if (matRef.current) {
      const fadeStart = 1.6;
      const fadeProgress = Math.min(Math.max((age - fadeStart) / 1.0, 0), 1);
      matRef.current.opacity = fadeProgress * 0.6;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color="#00F090"
        size={0.02}
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Exported Canvas wrapper ─── */
export default function HeroOrb({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Suspense fallback={<div className="w-full h-full" />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 3, 5]} intensity={0.3} color="#FDFBED" />
          <Orb />
          <Particles />
        </Canvas>
      </Suspense>
    </div>
  );
}
