"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { Suspense } from "react";
import Model from "../Model";

const Loader3d = () => {
    return (
        <div className="relative h-[200vh] w-full z-10">
            <Canvas>
                <OrbitControls />
                <directionalLight position={[-5, -5, -5]} intensity={4} />
                <Suspense fallback={null}>
                    <Model />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Loader3d;
