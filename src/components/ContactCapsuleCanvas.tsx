import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleExplosion({ count = 500 }) {
    const pointsRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 10;
            p[i * 3 + 1] = (Math.random() - 0.5) * 10;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, [count]);

    useFrame(() => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.001;
            pointsRef.current.rotation.x += 0.0005;
        }
    });

    return (
        <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00D4FF"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
}

function FloatingShape({ position, type }: { position: [number, number, number], type: 'box' | 'sphere' | 'torus' }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                {type === 'box' && <boxGeometry args={[0.5, 0.5, 0.5]} />}
                {type === 'sphere' && <sphereGeometry args={[0.3, 32, 32]} />}
                {type === 'torus' && <torusGeometry args={[0.4, 0.1, 16, 100]} />}
                <meshStandardMaterial color="#2A2A3A" roughness={0.1} metalness={0.8} />
            </mesh>
        </Float>
    );
}

export default function ContactCapsuleCanvas() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <ParticleExplosion />

                <FloatingShape position={[-2, 1, -1]} type="box" />
                <FloatingShape position={[2, -1.5, -2]} type="torus" />
                <FloatingShape position={[-1.5, -2, -0.5]} type="sphere" />
                <FloatingShape position={[2.5, 1.5, -3]} type="box" />

            </Canvas>
        </div>
    );
}
