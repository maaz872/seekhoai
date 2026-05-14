"use client";

import { useFrame } from "@react-three/fiber";
import { View, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useScroll, type MotionValue } from "framer-motion";
import type { PerspectiveCamera as PerspectiveCameraImpl } from "three";
import { TorusKnot } from "@/components/three/TorusKnot";
import { ParticleField } from "@/components/three/ParticleField";

function CameraDolly({
  scrollProgress,
  reducedMotion,
}: {
  scrollProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const cameraRef = useRef<PerspectiveCameraImpl>(null);
  useFrame(() => {
    const cam = cameraRef.current;
    if (!cam) return;
    if (reducedMotion) {
      cam.position.z = 6;
      return;
    }
    const targetZ = 6 + scrollProgress.get() * 6; // z: 6 → 12
    cam.position.z += (targetZ - cam.position.z) * 0.05;
  });
  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 6]} fov={50} />;
}

export function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onMq);

    const mobileMq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileMq.matches);
    const onMobile = () => setIsMobile(mobileMq.matches);
    mobileMq.addEventListener("change", onMobile);

    return () => {
      mq.removeEventListener("change", onMq);
      mobileMq.removeEventListener("change", onMobile);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <View className="absolute inset-0" aria-hidden>
      <CameraDolly scrollProgress={scrollYProgress} reducedMotion={reducedMotion} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[6, 4, 4]} intensity={1.2} color="#ff8855" />
      <directionalLight position={[-5, -3, -2]} intensity={0.6} color="#4a9eff" />
      <TorusKnot
        mouse={mouse.current}
        scrollProgress={scrollYProgress}
        reducedMotion={reducedMotion}
      />
      <ParticleField
        count={isMobile ? 200 : 800}
        mouse={mouse.current}
        reducedMotion={reducedMotion}
      />
    </View>
  );
}
