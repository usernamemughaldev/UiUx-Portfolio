import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  uniform float uVelocity;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Warp corners based on velocity
    float distortion = sin(uv.x * 3.14159) * sin(uv.y * 3.14159) * uVelocity * 0.4;
    pos.z += distortion;
    
    // Subtle wave
    pos.z += sin(pos.x * 2.0 + uTime) * 0.05;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uOpacity;
  
  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    gl_FragColor = vec4(tex.rgb, tex.a * uOpacity);
  }
`;

interface WarpedPlaneProps {
    image: string;
    velocity: number;
    hovered: boolean;
}

function WarpedPlane({ image, velocity, hovered }: WarpedPlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Use a fallback image if necessary, but here we assume image path is valid
    const texture = useTexture(image);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uVelocity: { value: 0 },
        uTexture: { value: texture },
        uOpacity: { value: 1.0 }
    }), [texture]);

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();

            // Smoothly interpolate velocity
            material.uniforms.uVelocity.value += (velocity - material.uniforms.uVelocity.value) * 0.1;

            // Hover scale and rotation
            const targetScale = hovered ? 1.1 : 1.0;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);

            const targetRotationY = hovered ? 0.05 : 0;
            meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1;

            // Ensure texture is updated if changed
            material.uniforms.uTexture.value = texture;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[4, 3, 32, 32]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    );
}

export default function WarpedProjectCanvas({ image, velocity, hovered }: WarpedPlaneProps) {
    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <WarpedPlane image={image} velocity={velocity} hovered={hovered} />
                </Suspense>
            </Canvas>
        </div>
    );
}
