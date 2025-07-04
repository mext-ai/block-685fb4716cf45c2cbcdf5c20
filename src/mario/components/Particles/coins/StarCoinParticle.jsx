import React, { useEffect, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const StarCoinParticle = ({ position, coins, timeModifier }) => {
  const texture = useLoader(THREE.TextureLoader, "https://content.mext.app/uploads/a83722bf-02b6-49c4-9d16-67e1a7c13a11.png");
  const pointsRef = useRef();
  const materialRef = useRef();
  const sizeRef = useRef(1);
  const opacityRef = useRef(1);
  const originalYpos = useRef(0);

  const points = React.useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(position, 3)
    );
    return geom;
  }, [position]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.multiplyScalar(6);
    }
  }, []);

  useEffect(() => {
    sizeRef.current = 0;
    opacityRef.current = 1;
    pointsRef.current.position.x = Math.random() * 1 - 0.5;
    pointsRef.current.position.y = Math.random() * 0.5 - 0.25;
    originalYpos.current = pointsRef.current.position.y;
  }, [coins]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    pointsRef.current.position.y += 0.008 * delta * 144;
    if (sizeRef.current < 1) {
      sizeRef.current = Math.min(sizeRef.current + 0.01 * delta * 144, 1);
    }

    if (pointsRef.current.position.y > originalYpos.current + 0.01) {
      opacityRef.current = Math.max(opacityRef.current - 0.01 * delta * 144, 0);
    } else {
      opacityRef.current = Math.abs(Math.sin(time * timeModifier * 1500));
    }

    // Update material properties directly
    if (materialRef.current) {
      materialRef.current.size = sizeRef.current;
      materialRef.current.opacity = opacityRef.current;
    }
});

  return (
    <points ref={pointsRef} geometry={points}>
      <pointsMaterial
        ref={materialRef}
        alphaMap={texture}
        transparent={true}
        depthWrite={false}
        toneMapped={false}
        color={0xbf8717}
      />
    </points>
  );
};
