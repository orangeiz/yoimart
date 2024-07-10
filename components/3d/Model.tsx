import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
useGLTF.preload("/3d-models/test7.glb")
export default function Model(){
    const group=useRef<Group>(null)
    const {nodes,materials,animations,scene}=useGLTF("/3d-models/test7.glb")
    return(
        <group ref={group}>
            <primitive object={scene}/>
        </group>
    )
}