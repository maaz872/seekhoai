"use client";

import { useRef } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import type { Mesh } from "three";
import { MathUtils } from "three";

interface Props extends Omit<ThreeElements["mesh"], "ref"> {
  /** Normalized mouse position, range [-1, 1] for both axes */
  mouse: { x: number; y: number };
  /** 0..1 scroll progress through the page */
  scrollProgress: number;
  /** Reduce motion: if true, locks rotation to a static pose */
  reducedMotion?: boolean;
}

export function TorusKnot({ mouse, scrollProgress, reducedMotion = false, ...rest }: Props) {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (reducedMotion) {
      ref.current.rotation.x = 0.4;
      ref.current.rotation.y = 0.6;
      return;
    }
    // Idle auto-rotation
    ref.current.rotation.y += delta * 0.15;
    ref.current.rotation.x += delta * 0.05;

    // Scroll-driven additional rotation (0.5 turn over full page)
    const scrollRot = scrollProgress * Math.PI;

    // Mouse tilt — damped lerp toward target up to ~8 degrees
    const targetX = mouse.y * MathUtils.degToRad(8);
    const targetY = mouse.x * MathUtils.degToRad(8) + scrollRot;
    ref.current.rotation.x = MathUtils.lerp(ref.current.rotation.x, targetX + ref.current.rotation.x * 0.0, 0.05) + ref.current.rotation.x * 0.0;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.05;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.05;
  });

  return (
    <mesh ref={ref} {...rest}>
      <torusKnotGeometry args={[1.1, 0.35, 220, 32, 2, 3]} />
      <meshPhysicalMaterial
        color="#ff6b35"
        emissive="#ff3300"
        emissiveIntensity={0.12}
        roughness={0.25}
        metalness={0.4}
        clearcoat={0.5}
        clearcoatRoughness={0.2}
        iridescence={1}
        iridescenceIOR={1.4}
        sheen={0.2}
        sheenColor="#ffb084"
      />
    </mesh>
  );
}
