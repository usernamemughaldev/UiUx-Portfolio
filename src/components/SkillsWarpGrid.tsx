import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WarpGrid({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
    const meshRef = useRef<THREE.Points>(null);

    const points = useMemo(() => {
        const p = [];
        const size = 20;
        const divisions = 40;
        for (let i = 0; i <= divisions; i++) {
            for (let j = 0; j <= divisions; j++) {
                const x = (i / divisions - 0.5) * size;
                const y = (j / divisions - 0.5) * size;
                p.push(x, y, 0);
            }
        }
        return new Float32Array(p);
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
            const time = state.clock.getElapsedTime();

            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const y = positions[i + 1];

                // Base wave
                let z = Math.sin(x * 0.5 + time) * 0.2 + Math.cos(y * 0.5 + time) * 0.2;

                // Magnetic warp toward mouse
                const dx = x - mouse.current[0] * 12;
                const dy = y - mouse.current[1] * 12;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 5) {
                    z += (5 - dist) * 0.8;
                }

                positions[i + 2] = z;
            }
            meshRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.06} color="#00D4FF" transparent opacity={0.4} />
        </points>
    );
}

export default function SkillsWarpGrid() {
    const mouse = useRef<[number, number]>([0, 0]);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = [
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            ];
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <WarpGrid mouse={mouse} />
            </Canvas>
        </div>
    );
}
