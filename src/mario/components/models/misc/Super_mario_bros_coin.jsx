import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useStore } from "../../store";

export function Coin(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "https://content.mext.app/uploads/a1d3e40f-be99-4bb5-9cf7-8776e805ca62.glb"
  );
  const { actions } = useStore();
  const [scale, setScale] = React.useState(0.424);
  const frames = useRef(0);
  useFrame((state, delta) => {

    group.current.rotation.y += 4 * delta;
    if(scale < 0.424 && frames.current > 0){
      frames.current -= 1 * delta * 144;

    }
    if(frames.current <= 0){
      setScale(Math.min(scale + 0.5 * delta, 0.424));
      if(body.current){
        body.current.setEnable(true);
      }
    }
  });

  const body = useRef();

  return (
    <>
      <RigidBody
        type="fixed"
        name="coin"
        sensor
        onIntersectionEnter={({ manifold, target, other}) => {
          if(other.rigidBodyObject.name === "player"){
            actions.addCoins();
            setScale(0);
            frames.current = 600;
            body.current.setEnable(false);
          }
        }}
        position={props.position}
      >
        <mesh
        ref={group}
          castShadow
          receiveShadow
          geometry={nodes.Coin_CoinBlinn_0.geometry}
          material={materials.CoinBlinn}
          scale={scale}
        />
      </RigidBody>
    </>
  );
}

useGLTF.preload("https://content.mext.app/uploads/a1d3e40f-be99-4bb5-9cf7-8776e805ca62.glb");
