import React, { useRef } from "react";
import { useGLTF, Float, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useStore } from "../../store";

export function ItemBox(props) {

  const { actions } = useStore();
  return (
    <>
        <RigidBody type="fixed" name="itemBox"
      sensor
      onIntersectionEnter={() => {
        actions.setItem();
        
      }}
      position={props.position}
      >
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </RigidBody>
    <group {...props} dispose={null}>
    

      <Float
        speed={2} // Animation speed, defaults to 1
        rotationIntensity={20} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[1, 2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
          <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="green" />
        </mesh>
      </Float>
    </group>
    </>
  );
}
