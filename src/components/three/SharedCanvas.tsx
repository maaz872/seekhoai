"use client";

import { Canvas } from "@react-three/fiber";
import { View, PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useState } from "react";

/**
 * Single persistent WebGL canvas mounted at layout level. All scroll-driven 3D
 * scenes (hero, pillar mini-shapes) portal into this canvas via drei <View>.
 *
 * - DPR + bloom adapt on PerformanceMonitor decline.
 * - Mobile starts at reduced settings (DPR [1,1], bloom off).
 * - pointer-events: none — canvas is decorative; pointer events flow to underlying DOM.
 */
export function SharedCanvas() {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);
  const [bloomEnabled, setBloomEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => {
      if (mq.matches) {
        setDpr([1, 1]);
        setBloomEnabled(false);
      } else {
        setDpr([1, 1.5]);
        setBloomEnabled(true);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        eventSource={document.body}
        eventPrefix="client"
      >
        <PerformanceMonitor
          onDecline={() => {
            setDpr([1, 1]);
            setBloomEnabled(false);
          }}
        >
          <Suspense fallback={null}>
            <View.Port />
            {bloomEnabled && (
              <EffectComposer>
                <Bloom
                  intensity={0.6}
                  luminanceThreshold={0.6}
                  luminanceSmoothing={0.3}
                  radius={0.6}
                />
                <Vignette eskil={false} offset={0.25} darkness={0.55} />
              </EffectComposer>
            )}
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
