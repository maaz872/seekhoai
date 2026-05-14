"use client";

import { useFrame } from "@react-three/fiber";
import { View, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

type GeometryKind = "torus" | "icosahedron" | "dodecahedron" | "octahedron";

function Shape({ kind, reducedMotion }: { kind: GeometryKind; reducedMotion: boolean }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.x += delta * 0.4;
    ref.current.rotation.y += delta * 0.6;
  });

  return (
    <mesh ref={ref}>
      {kind === "torus" && <torusGeometry args={[0.9, 0.32, 32, 64]} />}
      {kind === "icosahedron" && <icosahedronGeometry args={[1.1, 0]} />}
      {kind === "dodecahedron" && <dodecahedronGeometry args={[1.1, 0]} />}
      {kind === "octahedron" && <octahedronGeometry args={[1.2, 0]} />}
      <meshPhysicalMaterial
        color="#ff6b35"
        emissive="#ff3300"
        emissiveIntensity={0.15}
        roughness={0.3}
        metalness={0.3}
        clearcoat={0.5}
        iridescence={0.6}
        flatShading={kind !== "torus"}
      />
    </mesh>
  );
}

interface Props {
  kind: GeometryKind;
  className?: string;
}

export function MiniScene({ kind, className }: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <View className={className}>
      <PerspectiveCamera makeDefault position={[0, 0, 3.6]} fov={45} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 3, 2]} intensity={1.4} color="#ff8855" />
      <directionalLight position={[-3, -2, 1]} intensity={0.45} color="#4a9eff" />
      <Shape kind={kind} reducedMotion={reducedMotion} />
    </View>
  );
}
