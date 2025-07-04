import { Controls } from "../Game";
import { BallCollider, RigidBody, useRapier, vec3 } from "@react-three/rapier";
import {
  useKeyboardControls,
  PerspectiveCamera,
  PositionalAudio,
} from "@react-three/drei";
import { useFrame, useThree, extend } from "@react-three/fiber";
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
import { geometry } from "maath";
import { useGamepad } from "./useGamepad";
extend(geometry);

export const PlayerControllerGamepad = ({
  player,
  userPlayer,
  setNetworkBananas,
  setNetworkShells,
  networkBananas,
  networkShells,
}) => {

  const [isOnGround, setIsOnGround] = useState(false);
  const body = useRef();
  const kart = useRef();
  const cam = useRef();
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
  const text = useRef();

  const { actions, shouldSlowDown, item, bananas, coins, id, controls } = useStore();
  const slowDownDuration = useRef(1500);
  const { buttonA, buttonB, RB, LB, joystick, select} = useGamepad();

  useFrame(({ pointer, clock }, delta) => {
    if (player.id !== id) return;
    const time = clock.getElapsedTime();
    if (!body.current && !mario.current) return;
    engineSound.current.setVolume(currentSpeed / 300 + 0.2);
    engineSound.current.setPlaybackRate(currentSpeed / 10 + 0.1);
    jumpSound.current.setPlaybackRate(1.5);
    jumpSound.current.setVolume(0.5);
    driftSound.current.setVolume(0.2);

    driftBlueSound.current.setVolume(0.5);
    driftOrangeSound.current.setVolume(0.6);
    driftPurpleSound.current.setVolume(0.7);
    // HANDLING AND STEERING
    const kartRotation =
      kart.current.rotation.y - driftDirection.current * driftForce.current;
    const forwardDirection = new THREE.Vector3(
      -Math.sin(kartRotation),
      0,
      -Math.cos(kartRotation)
    );

    // mouse steering

    if (!driftLeft.current && !driftRight.current) {
      steeringAngle = currentSteeringSpeed * -joystick[0];
      targetXPosition = -camMaxOffset * -joystick[0];
    } else if (driftLeft.current && !driftRight.current) {
      steeringAngle = currentSteeringSpeed * -(joystick[0] - 1);
      targetXPosition = -camMaxOffset * -joystick[0];
    } else if (driftRight.current && !driftLeft.current) {
      steeringAngle = currentSteeringSpeed * -(joystick[0] + 1);
      targetXPosition = -camMaxOffset * -joystick[0];
    }
    // ACCELERATING
    const shouldSlow = actions.getShouldSlowDown();

    if (buttonA && currentSpeed < maxSpeed) {
      // Accelerate the kart within the maximum speed limit
      setCurrentSpeed(
        Math.min(currentSpeed + acceleration * delta * 144, maxSpeed)
      );
    } else if (
      buttonA &&
      currentSpeed > maxSpeed &&
      effectiveBoost.current > 0
    ) {
      setCurrentSpeed(
        Math.max(currentSpeed - decceleration * delta * 144, maxSpeed)
      );
    }

    if (buttonA) {
      if (currentSteeringSpeed < MaxSteeringSpeed) {
        setCurrentSteeringSpeed(
          Math.min(
            currentSteeringSpeed + 0.0001 * delta * 144,
            MaxSteeringSpeed
          )
        );
      }
    }
    if (shouldSlow) {
      setCurrentSpeed(
        Math.max(currentSpeed - decceleration * 2 * delta * 144, 0)
      );
      setCurrentSteeringSpeed(0);
      slowDownDuration.current -= 1500 * delta;
      setShouldLaunch(true);
      if (slowDownDuration.current <= 1) {
        actions.setShouldSlowDown(false);
        slowDownDuration.current = 1500;
        setShouldLaunch(false);
      }
    }

    // REVERSING
    if (buttonB && currentSpeed < -maxSpeed) {
      setCurrentSpeed(
        Math.max(currentSpeed - acceleration * delta * 144, -maxSpeed)
      );
    }
    // DECELERATING
    else if (!buttonA && !buttonB) {
      if (currentSteeringSpeed > 0) {
        setCurrentSteeringSpeed(
          Math.max(currentSteeringSpeed - 0.00005 * delta * 144, 0)
        );
      } else if (currentSteeringSpeed < 0) {
        setCurrentSteeringSpeed(
          Math.min(currentSteeringSpeed + 0.00005 * delta * 144, 0)
        );
      }
      setCurrentSpeed(Math.max(currentSpeed - decceleration * delta * 144, 0));
    }

    // Update the kart's rotation based on the steering angle
    kart.current.rotation.y += steeringAngle * delta * 144;

    // Apply damping to simulate slowdown when no keys are pressed
    body.current.applyImpulse(
      {
        x: -body.current.linvel().x * (1 - damping) * delta * 144,
        y: 0,
        z: -body.current.linvel().z * (1 - damping) * delta * 144,
      },
      true
    );
    const bodyPosition = body.current.translation();
    kart.current.position.set(
      bodyPosition.x,
      bodyPosition.y - 0.5,
      bodyPosition.z
    );

    // JUMPING
    if (RB && isOnGround && !jumpIsHeld.current) {
      jumpForce.current += 10;
      isOnFloor.current = false;
      jumpIsHeld.current = true;
      jumpSound.current.play();
      setIsOnGround(false);

      if (jumpSound.current.isPlaying) {
        jumpSound.current.stop();
        jumpSound.current.play();
      }
    }

    if (isOnFloor.current && jumpForce.current > 0) {
      landingSound.current.play();
    }
    if (!isOnGround && jumpForce.current > 0) {
      jumpForce.current -= 1 * delta * 144;
    }
    if (!RB) {
      jumpIsHeld.current = false;
      driftDirection.current = 0;
      driftForce.current = 0;
      driftLeft.current = false;
      driftRight.current = false;
    }
    // DRIFTING
    if (
      jumpIsHeld.current &&
      currentSteeringSpeed > 0 &&
      joystick[0] < -0.1 &&
      !driftRight.current
    ) {
      driftLeft.current = true;
    }
    if (
      jumpIsHeld.current &&
      currentSteeringSpeed > 0 &&
      joystick[0] > 0.1 &&
      !driftLeft.current
    ) {
      driftRight.current = true;
    }

    if (!jumpIsHeld.current && !driftLeft.current && !driftRight.current) {
      mario.current.rotation.y = THREE.MathUtils.lerp(
        mario.current.rotation.y,
        0,
        0.0001 * delta * 144
      );
      setTurboColor(0xffffff);
      accumulatedDriftPower.current = 0;
      driftSound.current.stop();
      driftTwoSound.current.stop();
      driftOrangeSound.current.stop();
      driftPurpleSound.current.stop();
    }

    if (driftLeft.current) {
      driftDirection.current = 1;
      driftForce.current = 0.4;
      mario.current.rotation.y = THREE.MathUtils.lerp(
        mario.current.rotation.y,
        steeringAngle * 25 + 0.4,
        0.05 * delta * 144
      );
      accumulatedDriftPower.current += 0.1 * (steeringAngle + 1) * delta * 144;
    }
    if (driftRight.current) {
      driftDirection.current = -1;
      driftForce.current = 0.4;
      mario.current.rotation.y = THREE.MathUtils.lerp(
        mario.current.rotation.y,
        -(-steeringAngle * 25 + 0.4),
        0.05 * delta * 144
      );
      accumulatedDriftPower.current += 0.1 * (-steeringAngle + 1) * delta * 144;
    }
    if (!driftLeft.current && !driftRight.current) {
      mario.current.rotation.y = THREE.MathUtils.lerp(
        mario.current.rotation.y,
        steeringAngle * 30,
        0.05 * delta * 144
      );
      setScale(0);
    }
    if (accumulatedDriftPower.current > blueTurboThreshold) {
      setTurboColor(0x00ffff);
      boostDuration.current = 50;
      driftBlueSound.current.play();
    }
    if (accumulatedDriftPower.current > orangeTurboThreshold) {
      setTurboColor(0xffcf00);
      boostDuration.current = 100;
      driftBlueSound.current.stop();
      driftOrangeSound.current.play();
    }
    if (accumulatedDriftPower.current > purpleTurboThreshold) {
      setTurboColor(0xff00ff);
      boostDuration.current = 250;
      driftOrangeSound.current.stop();
      driftPurpleSound.current.play();
    }

    if (driftLeft.current || driftRight.current) {
      const oscillation = Math.sin(time * 1000) * 0.1;
      const vibration = oscillation + 0.9;
      if (turboColor === 0xffffff) {
        setScale(vibration * 0.8);
      } else {
        setScale(vibration);
      }
      if (isOnFloor.current && !driftSound.current.isPlaying) {
        driftSound.current.play();
        driftTwoSound.current.play();
        landingSound.current.play();
      }
    }
    // RELEASING DRIFT

    if (boostDuration.current > 1 && !jumpIsHeld.current) {
      setIsBoosting(true);
      effectiveBoost.current = boostDuration.current;
      boostDuration.current = 0;
    } else if (effectiveBoost.current <= 1) {
      targetZPosition = 8;
      setIsBoosting(false);
    }

    if (isBoosting && effectiveBoost.current > 1) {
      setCurrentSpeed(boostSpeed);
      effectiveBoost.current -= 1 * delta * 144;
      targetZPosition = 10;
      if (!turboSound.current.isPlaying) turboSound.current.play();
      driftTwoSound.current.play();
      driftBlueSound.current.stop();
      driftOrangeSound.current.stop();
      driftPurpleSound.current.stop();
    } else if (effectiveBoost.current <= 1) {
      setIsBoosting(false);
      targetZPosition = 8;
      turboSound.current.stop();
    }

    // CAMERA WORK

    cam.current.updateMatrixWorld();

    cam.current.position.x = THREE.MathUtils.lerp(
      cam.current.position.x,
      targetXPosition,
      0.01 * delta * 144
    );

    cam.current.position.z = THREE.MathUtils.lerp(
      cam.current.position.z,
      targetZPosition,
      0.01 * delta * 144
    );

    body.current.applyImpulse(
      {
        x: forwardDirection.x * currentSpeed * delta * 144,
        y: 0 + jumpForce.current * delta * 144,
        z: forwardDirection.z * currentSpeed * delta * 144,
      },
      true
    );

    // Update the kart's rotation based on the steering angle
    setSteeringAngleWheels(steeringAngle * 25);

    // SOUND WORK

    // MISC

    if (select) {
      body.current.setTranslation({ x: 8, y: 2, z: -119 });
      body.current.setLinvel({ x: 0, y: 0, z: 0 });
      body.current.setAngvel({ x: 0, y: 0, z: 0 });
      setCurrentSpeed(0);
      setCurrentSteeringSpeed(0);
      setIsBoosting(false);
      effectiveBoost.current = 0;
      setIsOnGround(false);
      jumpForce.current = 0;
      driftDirection.current = 0;
      kart.current.rotation.y = Math.PI / 2;
    }

    // ITEMS

    if (LB && item === "banana") {
      const distanceBehind = 2;
      const scaledBackwardDirection =
        forwardDirection.multiplyScalar(distanceBehind);

      const kartPosition = new THREE.Vector3(
        ...vec3(body.current.translation())
      );

      const bananaPosition = kartPosition.sub(scaledBackwardDirection);
      const newBanana = {
        id: Math.random() + "-" + +new Date(),
        position: bananaPosition,
        player: true,
      };
      setNetworkBananas([...networkBananas, newBanana]);

      actions.useItem();
    }

    if (LB && item === "shell") {
      const distanceBehind = -2;
      const scaledBackwardDirection =
        forwardDirection.multiplyScalar(distanceBehind);

      const kartPosition = new THREE.Vector3(
        body.current.translation().x,
        body.current.translation().y,
        body.current.translation().z
      );

      const shellPosition = kartPosition.sub(scaledBackwardDirection);
      const newShell = {
        id: Math.random() + "-" + +new Date(),
        position: shellPosition,
        player: true,
        rotation: kartRotation,
      };
      setNetworkShells([...networkShells, newShell]);
      actions.useItem();
    }

    if (LB && item === "mushroom") {
      setIsBoosting(true);
      effectiveBoost.current = 300;
      actions.useItem();
    }

    player.setState("position", body.current.translation());
    player.setState("rotation", kartRotation + mario.current.rotation.y);
    player.setState("isBoosting", isBoosting);
    player.setState("shouldLaunch", shouldLaunch);
    player.setState("turboColor", turboColor);
    player.setState("scale", scale);
    player.setState("bananas", bananas);
  });

  return player.id === id ? (
    <group>
      <RigidBody
        ref={body}
        colliders={false}
        position={[8, 60, -119]}
        centerOfMass={[0, -1, 0]}
        mass={3}
        ccd
        name="player"
        type={player.id === id ? "dynamic" : "kinematic"}
      >
        <BallCollider
          args={[0.5]}
          mass={3}
          onCollisionEnter={({ other }) => {
            isOnFloor.current = true;
            setIsOnGround(true);
          }}
          onCollisionExit={({ other }) => {
            isOnFloor.current = false;
            setIsOnGround(false);
          }}
        />
      </RigidBody>

      <group ref={kart} rotation={[0, Math.PI / 2, 0]}>
        <group ref={mario}>
          <Mario
            currentSpeed={currentSpeed}
            steeringAngleWheels={steeringAngleWheels}
            isBoosting={isBoosting}
            shouldLaunch={shouldLaunch}
          />
          <CoinParticles coins={coins} />
          <ItemParticles item={item} />
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
          <HitParticles shouldLaunch={shouldLaunch} />
        </group>

        {/* <ContactShadows frames={1} /> */}
        <PerspectiveCamera
          makeDefault
          position={[0, 2, 8]}
          fov={50}
          ref={cam}
          far={5000}
        />
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
  ) : null;
};
