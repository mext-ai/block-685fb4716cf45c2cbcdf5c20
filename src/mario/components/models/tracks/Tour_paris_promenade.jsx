
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export function Paris(props) {
  const { nodes, materials } = useGLTF('https://content.mext.app/uploads/59328301-4886-49be-a283-7dd5a52db9e6.glb')
  materials.M_Cmn_ShadowCollision.opacity = 0
  materials.M_Cmn_ShadowCollision.transparent = true
  return (
    <group {...props} scale={50} position={[0,-3.6,0]} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.N_Road_Ground_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} scale={0.01} />
      <mesh castShadow receiveShadow geometry={nodes.N_Road_Ground_M_Mobp1_Road_A_0.geometry} material={materials.M_Mobp1_Road_A} scale={0.01} />
      <mesh castShadow receiveShadow geometry={nodes.N_Road_Ground_M_Mobp1_Road_B_0.geometry} material={materials.M_Mobp1_Road_B} scale={0.01} />
      <mesh castShadow receiveShadow geometry={nodes.N_Road_Ground_M_Mobp1_Water_0.geometry} material={materials.M_Mobp1_Water} scale={0.01} />
<RigidBody type="fixed" colliders="trimesh" name="terrain">
<mesh castShadow receiveShadow geometry={nodes.ShadowCollision_M_Cmn_ShadowCollision_0.geometry} material={materials.M_Cmn_ShadowCollision} scale={0.01} />
</RigidBody>
      <mesh castShadow receiveShadow geometry={nodes.F_BlindBuilding_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} scale={0.01} />
      <mesh castShadow receiveShadow geometry={nodes.Gmob_Paris_VR_M_Mobp1_VR_0.geometry} material={materials.M_Mobp1_VR} scale={0.01} />
      <mesh castShadow receiveShadow geometry={nodes.N_Building_002_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} scale={0.01} />
      <mesh castShadow receiveShadow geometry={nodes.N_Building_002_M_Mobp1_gaisenmon_tex_0.geometry} material={materials.M_Mobp1_gaisenmon_tex} scale={0.01} />
      <mesh castShadow receiveShadow geometry={nodes.Rainbow_model_M_Mobp1_Rainbow_0.geometry} material={materials.M_Mobp1_Rainbow} position={[-0.16, 0.001, 0]} rotation={[0, -Math.PI / 2, 0]} scale={0.01} />
      <mesh castShadow receiveShadow geometry={nodes.N_Audience_NoMove_01_M_Cmn_AudienceModel_0.geometry} material={materials.M_Cmn_AudienceModel} scale={0.01} />
    </group>
  )
}

useGLTF.preload('https://content.mext.app/uploads/59328301-4886-49be-a283-7dd5a52db9e6.glb')
