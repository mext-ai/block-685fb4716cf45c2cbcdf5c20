import { Controls } from "../Game";
import { BallCollider, RigidBody, useRapier, vec3 } from "@react-three/rapier";
import {
  useKeyboardControls,
  PerspectiveCamera,
  ContactShadows,
  Sphere,
  OrbitControls,
  Trail,
  PositionalAudio,
  Text,
  Billboard,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";

import { Mario } from "./models/characters/Mario_kart";
import { DriftParticlesLeft } from "./Particles/drifts/DriftParticlesLeft";
import { DriftParticlesRight } from "./Particles/drifts/DriftParticlesRight";

import { PointParticle } from "./Particles/drifts/PointParticle";

import { FlameParticles } from "./Particles/flames/FlameParticles";
import { useStore } from "./store";
import { Cylinder } from "@react-three/drei";
import FakeGlowMaterial from "./ShaderMaterials/FakeGlow/FakeGlowMaterial";
import { HitParticles } from "./Particles/hits/HitParticles";
import { CoinParticles } from "./Particles/coins/CoinParticles";
import { ItemParticles } from "./Particles/items/ItemParticles";
import { isHost } from "playroomkit";
import { Banana } from "./models/items/Banana_peel_mario_kart";

export const PlayerDummies = ( { player, userPlayer }) => {
  
  const upPressed = useKeyboardControls((state) => state[Controls.up]);
  const downPressed = useKeyboardControls((state) => state[Controls.down]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const shootPressed = useKeyboardControls((state) => state[Controls.shoot]);
  const resetPressed = useKeyboardControls((state) => state[Controls.reset]);
  
  const [isOnGround, setIsOnGround] = useState(false);
  const body = useRef();
  const kart = useRef();
  const cam = useRef();
  const text = useRef();
  const initialSpeed = 0;
  const maxSpeed = 30;
  const boostSpeed = 50;
  const acceleration = 0.1;
  const decceleration = 0.2;
  const damping = -0.1;
  const MaxSteeringSpeed = 0.01;
  const [currentSteeringSpeed, setCurrentSteeringSpeed] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(initialSpeed);
  const camMaxOffset = 1;
  let steeringAngle = 0;
  const isOnFloor = useRef(false);
  const jumpForce = useRef(0);
  const jumpIsHeld = useRef(false);
  const driftDirection = useRef(0);
  const driftLeft = useRef(false);
  const driftRight = useRef(false);
  const driftForce = useRef(0);
  const mario = useRef();
  const accumulatedDriftPower = useRef(0);
  const blueTurboThreshold = 10;
  const orangeTurboThreshold = 30;
  const purpleTurboThreshold = 60;
  const [turboColor, setTurboColor] = useState(0xffffff);
  const boostDuration = useRef(0);
  const [isBoosting, setIsBoosting] = useState(false);
  let targetXPosition = 0;
  let targetZPosition = 8;
  const [steeringAngleWheels, setSteeringAngleWheels] = useState(0);
  const engineSound = useRef();
  const driftSound = useRef();
  const driftTwoSound = useRef();
  const driftOrangeSound = useRef();
  const driftPurpleSound = useRef();
  const driftBlueSound = useRef();
  const jumpSound = useRef();
  const landingSound = useRef();
  const turboSound = useRef();
  const [scale, setScale] = useState(0);
  const raycaster = new THREE.Raycaster();
  const downDirection = new THREE.Vector3(0, -1, 0);
  const [shouldLaunch, setShouldLaunch] = useState(false);
  const effectiveBoost = useRef(0);
  const [networkBananas, setNetworkBananas] = useState([]);
  const [networkShells, setNetworkShells] = useState([]);


  const { actions, shouldSlowDown, item, coins, id} = useStore();
  const slowDownDuration = useRef(1500);
  
 useFrame((state, delta) => {
  const bodyPosition = player.getState("position");
  const bodyRotation = player.getState("rotation");
  setIsBoosting(player.getState("isBoosting"));
  setShouldLaunch(player.getState("shouldLaunch"));
  setTurboColor(player.getState("turboColor"));
  setScale(player.getState("scale"));





  if(bodyPosition && bodyRotation && kart.current && mario.current){
    kart.current.position.set(bodyPosition.x, bodyPosition.y -.5, bodyPosition.z);
    kart.current.rotation.set(0, bodyRotation, 0);
    body.current.setTranslation([bodyPosition.x, bodyPosition.y, bodyPosition.z]);
  }

 });

  return player.id != id? (
    <>
    <group>
      <RigidBody 
        type="kinematic"
        ref={body}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        colliders={false}
        name="player"
        >
        <BallCollider args={[0.5]} />
      </RigidBody>

      <group ref={kart} rotation={[0, Math.PI / 2, 0]}>
        <group ref={mario}>
        <Billboard>
            <Text font={"https://content.mext.app/uploads/fa3c16ab-7c93-4b77-950d-6117fe5f0b33.ttf"} ref={text} fontSize={0.4} outlineWidth={0.03} position={[0, 2, 0]}>{player.state.profile.name}</Text>
        </Billboard>
          <Mario
            currentSpeed={currentSpeed}
            steeringAngleWheels={steeringAngleWheels}
            isBoosting={isBoosting}
            shouldLaunch={shouldLaunch}
          />
          <CoinParticles coins={coins}/>
          <ItemParticles item={item}/>
          <mesh position={[0.6, 0.05, 0.5]} scale={scale}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              emissive={turboColor}
              toneMapped={false}
              emissiveIntensity={100}
              transparent
              opacity={0.4}
            />
          </mesh>
          <mesh position={[0.6, 0.05, 0.5]} scale={scale * 10}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <FakeGlowMaterial
              falloff={3}
              glowInternalRadius={1}
              glowColor={turboColor}
              glowSharpness={1}
            />
          </mesh>
          <mesh position={[-0.6, 0.05, 0.5]} scale={scale}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              emissive={turboColor}
              toneMapped={false}
              emissiveIntensity={100}
              transparent
              opacity={0.4}
            />
          </mesh>
          <mesh position={[-0.6, 0.05, 0.5]} scale={scale * 10}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <FakeGlowMaterial
              falloff={3}
              glowInternalRadius={1}
              glowColor={turboColor}
              glowSharpness={1}
            />
          </mesh>

          {/* <FlameParticles isBoosting={isBoosting} /> */}
          <DriftParticlesLeft turboColor={turboColor} scale={scale} />
          <DriftParticlesRight turboColor={turboColor} scale={scale} />
          <PointParticle
            position={[-0.6, 0.05, 0.5]}
            png="https://content.mext.app/uploads/ff335bae-ac35-4645-b6c1-46a96b365def.png"
            turboColor={turboColor}
          />
          <PointParticle
            position={[0.6, 0.05, 0.5]}
            png="https://content.mext.app/uploads/ff335bae-ac35-4645-b6c1-46a96b365def.png"
            turboColor={turboColor}
          />
          <PointParticle
            position={[-0.6, 0.05, 0.5]}
            png="https://content.mext.app/uploads/e0a5ad1c-b051-449d-8b72-ff77cfc42418.png"
            turboColor={turboColor}
          />
          <PointParticle
            position={[0.6, 0.05, 0.5]}
            png="https://content.mext.app/uploads/e0a5ad1c-b051-449d-8b72-ff77cfc42418.png"
            turboColor={turboColor}
          />
          <HitParticles shouldLaunch={shouldLaunch}/>
        </group>

        {/* <ContactShadows frames={1} /> */}
        <PositionalAudio
          ref={engineSound}
          url="https://content.mext.app/uploads/a87f0846-e126-4e20-a4f3-630d379866f6.wav"
          autoplay
          loop
          distance={1000}
        />
        <PositionalAudio
          ref={driftSound}
          url="https://content.mext.app/uploads/66df5c11-85d7-4de8-8047-c74982e67cde.mp3"
          loop
          distance={1000}
        />
        <PositionalAudio
          ref={driftTwoSound}
          url="https://content.mext.app/uploads/24c9f26f-3343-4e4c-8d31-d233e6a4bba9.mp3"
          loop
          distance={1000}
        />
        <PositionalAudio
          ref={driftOrangeSound}
          url="https://content.mext.app/uploads/c8b3b846-719d-4a4b-9d12-d759e8372b93.wav"
          loop={false}
          distance={1000}
        />
        <PositionalAudio
          ref={driftBlueSound}
          url="https://content.mext.app/uploads/d0f52307-7ccf-41bc-8cc6-3c3cd165a837.wav"
          loop={false}
          distance={1000}
        />

        <PositionalAudio
          ref={driftPurpleSound}
          url="https://content.mext.app/uploads/b076c85c-ebc7-4ca7-9c00-eefb7313b9e9.wav"
          loop={false}
          distance={1000}
        />
        <PositionalAudio
          ref={jumpSound}
          url="https://content.mext.app/uploads/8f5fcd4e-791d-4aaa-a65e-0043fee345e7.mp3"
          loop={false}
          distance={1000}
        />
        <PositionalAudio
          ref={landingSound}
          url="https://content.mext.app/uploads/ed0fc1a4-7d45-4533-9de2-c10c6e08dc97.wav"
          loop={false}
          distance={1000}
        />
        <PositionalAudio
          ref={turboSound}
          url="https://content.mext.app/uploads/3a1d1948-3edb-4fcd-9030-ae04ebb2408f.wav"
          loop={false}
          distance={1000}
        />
      </group>
    </group>
    </>
  ) : null;
};
