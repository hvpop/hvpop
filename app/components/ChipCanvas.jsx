"use client"
import React, { Suspense, useRef } from "react"
import { Float, OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

const Chip = ({ props, scale }) => {
  const { nodes, materials } = useGLTF("/chip.glb")
  return (
    <Float
      speed={7}
      floatIntensity={0.1}>
      <group
        {...props}
        dispose={null}>
        <hemisphereLight intensity={0.5} />
        <directionalLight
          position={[-1, 1, 1]}
          intensity={2}
        />
        <directionalLight
          position={[1, -1, -1]}
          intensity={2}
        />
        <group
          rotation={[0, 1.2, 1.3]}
          scale={[-0.857, -0.044, -0.857]}>
          <mesh
            scale={scale}
            castShadow
            receiveShadow
            geometry={nodes.chip_1.geometry}
            material={materials["Material.002"]}
          />
          <mesh
            scale={scale}
            castShadow
            receiveShadow
            geometry={nodes.chip_2.geometry}
            material={materials["Material.001"]}
          />
        </group>
      </group>
    </Float>
  )
}

const ChipCanvas = ({ scale }) => {
  return (
    <div className="w-[200px] h-[200px]">
      <Canvas
        resize={{ debounce: 0 }}
        shadows
        camera={{ position: [0, 0, 5], fov: 20 }}
        gl={{ preserveDrawingBuffer: true }}>
        <Suspense fallback={null}>
          <Chip scale={scale} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}

export default ChipCanvas
