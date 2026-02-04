import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Sphere({ position, size, color, mouse }: { position: [number, number, number], size: number, color: string, mouse: React.MutableRefObject<[number, number]> }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            // Magnetic pull toward mouse
            const targetX = position[0] + mouse.current[0] * 2;
            const targetY = position[1] + mouse.current[1] * 2;

            meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02;
            meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.02;

            // Gentle rotation
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
            <mesh ref={meshRef} position={position}>
                <sphereGeometry args={[size, 32, 32]} />
                <MeshTransmissionMaterial
                    backside
                    samples={4}
                    thickness={0.5}
                    chromaticAberration={0.06}
                    anisotropy={0.1}
                    distortion={0.1}
                    distortionScale={0.3}
                    temporalDistortion={0.5}
                    color={color}
                    attenuationDistance={0.5}
                    attenuationColor={color}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    );
}

export default function DesignPhilosophyCanvas() {
    const mouse = useRef<[number, number]>([0, 0]);

    // Update mouse position on move
    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
        mouse.current = [
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1
        ];
    };

    React.useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const spheres = useMemo(() => [
        { position: [-6, 3, -2] as [number, number, number], size: 1.2, color: '#00D4FF' },
        { position: [5, -4, -1] as [number, number, number], size: 1.5, color: '#FF3366' },
        { position: [-4, -6, -3] as [number, number, number], size: 0.8, color: '#FFD700' },
        { position: [8, 2, -2] as [number, number, number], size: 1.0, color: '#00D4FF' },
        { position: [0, 8, -5] as [number, number, number], size: 2.0, color: '#1A1A24' },
    ], []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                    {spheres.map((s, i) => (
                        <Sphere key={i} {...s} mouse={mouse} />
                    ))}

                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
