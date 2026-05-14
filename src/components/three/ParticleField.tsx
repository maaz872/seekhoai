"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points as ThreePoints } from "three";
import { BufferAttribute } from "three";

interface Props {
  count?: number;
  mouse: { x: number; y: number };
  reducedMotion?: boolean;
}

export function ParticleField({ count = 800, mouse, reducedMotion = false }: Props) {
  const ref = useRef<ThreePoints>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = (r * Math.cos(phi)) - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (reducedMotion) {
      ref.current.rotation.y = 0;
      return;
    }
    ref.current.rotation.y += delta * 0.02;
    // Parallax at half the rate of the knot
    const tx = mouse.x * 0.04;
    const ty = mouse.y * 0.04;
    ref.current.position.x += (tx - ref.current.position.x) * 0.04;
    ref.current.position.y += (ty - ref.current.position.y) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#4a9eff"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
