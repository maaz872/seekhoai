"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useEffect, useRef, useState, Suspense } from "react";
import { Vector2 } from "three";
import { useScroll, type MotionValue } from "framer-motion";
import { TorusKnot } from "@/components/three/TorusKnot";
import { ParticleField } from "@/components/three/ParticleField";

function CameraDolly({
  scrollProgress,
  reducedMotion,
}: {
  scrollProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();
  useFrame(() => {
    if (reducedMotion) {
      camera.position.z = 6;
      return;
    }
    const targetZ = 6 + scrollProgress.get() * 6; // z: 6 → 12
    camera.position.z += (targetZ - camera.position.z) * 0.05;
  });
  return null;
}

function SceneContents({
  mouse,
  scrollProgress,
  reducedMotion,
  isMobile,
}: {
  mouse: { x: number; y: number };
  scrollProgress: MotionValue<number>;
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  return (
    <>
      <color attach="background" args={["#0a0e1a"]} />
      <fog attach="fog" args={["#1a1024", 8, 20]} />

      <ambientLight intensity={0.15} />
      <directionalLight position={[6, 4, 4]} intensity={1.2} color="#ff8855" />
      <directionalLight position={[-5, -3, -2]} intensity={0.6} color="#4a9eff" />

      <CameraDolly scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

      <TorusKnot mouse={mouse} scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
      <ParticleField count={isMobile ? 200 : 800} mouse={mouse} reducedMotion={reducedMotion} />

      {!isMobile && (
        <EffectComposer>
          <Bloom intensity={0.8} luminanceThreshold={0.6} luminanceSmoothing={0.3} radius={0.6} />
          <ChromaticAberration
            offset={new Vector2(0.0006, 0.0006)}
            blendFunction={BlendFunction.NORMAL}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.25} darkness={0.55} />
        </EffectComposer>
      )}
    </>
  );
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
    <div
      className="absolute inset-0"
      style={{ transform: "translateZ(0)", willChange: "transform" }}
      aria-hidden
    >
      <Canvas
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneContents
            mouse={mouse.current}
            scrollProgress={scrollYProgress}
            reducedMotion={reducedMotion}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
