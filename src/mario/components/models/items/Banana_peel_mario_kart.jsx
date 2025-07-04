import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { BallCollider, RigidBody } from '@react-three/rapier'
import { useStore } from '../../store';

export function Banana({onCollide, id, position, setNetworkBananas, networkBananas}) {
  const { nodes, materials } = useGLTF('https://content.mext.app/uploads/ef252acf-d489-4135-92bd-0b4822670573.glb');
  const rigidBody = useRef();
  const ref = useRef();
  const [scale, setScale] = React.useState(0.002);


  const {actions} = useStore();

   return (
    <>
            <RigidBody
      ref={rigidBody}
      type='fixed'
      position={[position.x, position.y, position.z]}
      sensor
      onIntersectionEnter={({other}) => {
        if(other.rigidBodyObject.name === "player"){
          actions.setShouldSlowDown(true);
          setNetworkBananas(networkBananas.filter((banana) => banana.id !== id));
        }
      }}
      colliders={false}
      name='banana'
      >
      <BallCollider args={[0.5]} />

      </RigidBody>

    <group position={[position.x, position.y, position.z]} ref={ref} scale={scale} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes['Banana_Peel_02_-_Default_0'].geometry} material={materials['02_-_Default']} position={[39.973, -25.006, -0.017]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes['Banana_Peel_07_-_Default_0'].geometry} material={materials['07_-_Default']} position={[39.973, -25.006, -0.017]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes['Banana_Peel_03_-_Default_0'].geometry} material={materials['03_-_Default']} position={[39.973, -25.006, -0.017]} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
    </>
  )
}

useGLTF.preload('https://content.mext.app/uploads/ef252acf-d489-4135-92bd-0b4822670573.glb')
