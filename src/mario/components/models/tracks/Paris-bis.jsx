
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export function ParisBis(props) {
  const { nodes, materials } = useGLTF('https://content.mext.app/uploads/paris-track.glb')
  materials.M_Cmn_ShadowCollision.opacity = 0
  materials.M_Cmn_ShadowCollision.transparent = true
  return (
    <group {...props} scale={50} position={[0,-3.6,0]} dispose={null}>
      <group scale={0.01}>
        <mesh castShadow receiveShadow geometry={nodes.N_Audience_NoMove_01_M_Cmn_AudienceModel_0.geometry} material={materials.M_Cmn_AudienceModel} />
        <mesh castShadow receiveShadow geometry={nodes.F_Building_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.F_Building_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} />
        <mesh castShadow receiveShadow geometry={nodes.F_Obj_01_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.M_GeneralMansion_Roof_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.M_GeneralMansion_Roof_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} />
        <mesh castShadow receiveShadow geometry={nodes.N_MansionObj_01_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_MansionObj_01_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_MansionObj_01_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} />
        <mesh castShadow receiveShadow geometry={nodes.N_MansionObj_02_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_MansionObj_02_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_MansionObj_02_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_001_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_001_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_002_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_002_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_003_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_003_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_003_M_Mobp1_Window_0.geometry} material={materials.M_Mobp1_Window} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_004_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_004_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_005_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_005_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_005_M_Mobp1_Window_0.geometry} material={materials.M_Mobp1_Window} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_006_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_006_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_007_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_007_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_008_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_008_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_009_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_009_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_010_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_010_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_UniqueBuilding_Parts_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_UniqueBuilding_Parts_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.Rainbow_model_M_Mobp1_Rainbow_0.geometry} material={materials.M_Mobp1_Rainbow} position={[-16, 0.14, 0]} rotation={[0, -1.571, 0]} />
        <mesh castShadow receiveShadow geometry={nodes.F_BlindBuilding_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.F_BlindBuilding_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} />
        <mesh castShadow receiveShadow geometry={nodes.F_effel_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.F_Ground_01_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.F_Ground_01_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} />
        <mesh castShadow receiveShadow geometry={nodes.F_Ground_01_M_Mobp1_Water_0.geometry} material={materials.M_Mobp1_Water} />
        <mesh castShadow receiveShadow geometry={nodes.F_Ground_01_M_Mobp1_Window_0.geometry} material={materials.M_Mobp1_Window} />
        <mesh castShadow receiveShadow geometry={nodes.Gmob_Paris_VR_M_Mobp1_VR_0.geometry} material={materials.M_Mobp1_VR} position={[0, -451.06, 0]} />
        <mesh castShadow receiveShadow geometry={nodes.M_Building_001_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.M_Building_001_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} />
        <mesh castShadow receiveShadow geometry={nodes.M_Building_001_M_Mobp1_Window_0.geometry} material={materials.M_Mobp1_Window} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_001_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_001_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_001_M_Mobp1_Window_0.geometry} material={materials.M_Mobp1_Window} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_002_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_002_M_Mobp1_gaisenmon_tex_0.geometry} material={materials.M_Mobp1_gaisenmon_tex} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_002_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_002_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_002_M_Mobp1_Window_0.geometry} material={materials.M_Mobp1_Window} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_003_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_003_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_003_M_Mobp1_Window_0.geometry} material={materials.M_Mobp1_Window} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_004_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_004_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} />
        <mesh castShadow receiveShadow geometry={nodes.N_Building_004_M_Mobp1_Window_0.geometry} material={materials.M_Mobp1_Window} />
        <mesh castShadow receiveShadow geometry={nodes.N_effel_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_effel_M_Mobp1_Window_0.geometry} material={materials.M_Mobp1_Window} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_000_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_000_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_000_M_Mobp1_Transparent_0.geometry} material={materials.M_Mobp1_Transparent} />
        <mesh castShadow receiveShadow geometry={nodes.N_Obj_000_M_Mobp1_Window_0.geometry} material={materials.M_Mobp1_Window} />
        <mesh castShadow receiveShadow geometry={nodes.N_UniqueBuilding_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_UniqueBuilding_M_Mobp1_gaisenmon_tex_0.geometry} material={materials.M_Mobp1_gaisenmon_tex} />
        <mesh castShadow receiveShadow geometry={nodes.N_UniqueBuilding_M_Mobp1_Textures01_0.geometry} material={materials.M_Mobp1_Textures01} />
        <mesh castShadow receiveShadow geometry={nodes.N_UniqueBuilding_M_Mobp1_Window_0.geometry} material={materials.M_Mobp1_Window} />
        <mesh castShadow receiveShadow geometry={nodes.BlindTree_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.Low_Obj_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.Low_Obj_M_Mobp1_kanban_0.geometry} material={materials.M_Mobp1_kanban} />
        <mesh castShadow receiveShadow geometry={nodes.N_Road_Ground_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Road_Ground_M_Mobp1_Road_A_0.geometry} material={materials.M_Mobp1_Road_A} />
        <mesh castShadow receiveShadow geometry={nodes.N_Road_Ground_M_Mobp1_Road_B_0.geometry} material={materials.M_Mobp1_Road_B} />
        <mesh castShadow receiveShadow geometry={nodes.N_Road_Ground_M_Mobp1_RoadColor_0.geometry} material={materials.M_Mobp1_RoadColor} />
        <mesh castShadow receiveShadow geometry={nodes.N_Road_Ground_M_Mobp1_Water_0.geometry} material={materials.M_Mobp1_Water} />
        <mesh castShadow receiveShadow geometry={nodes.N_Road_Ground_M_Mobp1_Window_0.geometry} material={materials.M_Mobp1_Window} />
        <mesh castShadow receiveShadow geometry={nodes.N_Trocadero_M_Cmn_MainColor_Detail_0.geometry} material={materials.M_Cmn_MainColor_Detail} />
        <mesh castShadow receiveShadow geometry={nodes.N_Trocadero_M_Mobp1_RoadColor_0.geometry} material={materials.M_Mobp1_RoadColor} />
        <mesh castShadow receiveShadow geometry={nodes.N_Trocadero_Water_M_Mobp1_Water_0.geometry} material={materials.M_Mobp1_Water} />
        <RigidBody type="fixed" colliders="trimesh" name="terrain">
        <mesh castShadow receiveShadow geometry={nodes.ShadowCollision_M_Cmn_ShadowCollision_0.geometry} material={materials.M_Cmn_ShadowCollision} position={[0, 0.244, 0]} />
        </RigidBody>
      </group>
    </group>
  )
}

useGLTF.preload('https://content.mext.app/uploads/paris-track.glb')
