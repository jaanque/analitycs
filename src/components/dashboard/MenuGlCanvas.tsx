"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function MenuGlCanvas({ activePath }: { activePath: string }) {
    const mountRef = useRef<HTMLDivElement>(null);
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0.1, 10 );
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(2, 2);

        // A shader that renders FAFAFA but with a subtle moving fluid highlight
        const uniforms = {
            uTime: { value: 0 },
            uHighlight: { value: 0 }, // 0 to 1, animated on path change
            uColor: { value: new THREE.Color('#FAFAFA') },
            uHighlightColor: { value: new THREE.Color('#E4E4E7') } // zinc-200
        };

        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float uTime;
            uniform float uHighlight;
            uniform vec3 uColor;
            uniform vec3 uHighlightColor;
            varying vec2 vUv;

            void main() {
                // Subtle moving wave based on Y axis and time
                float wave = sin(vUv.y * 5.0 + uTime * 1.5) * 0.5 + 0.5;
                
                // Add a swipe effect when uHighlight > 0
                float swipe = smoothstep(uHighlight - 0.3, uHighlight, vUv.x) * smoothstep(uHighlight + 0.3, uHighlight, vUv.x);
                
                // Blend base color with the wave and swipe highlight
                vec3 finalColor = mix(uColor, uHighlightColor, wave * 0.03 + swipe * 0.12);
                
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true
        });
        
        materialRef.current = material;

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        let animationFrameId: number;
        const startTime = Date.now();

        const render = () => {
            uniforms.uTime.value = (Date.now() - startTime) * 0.001;
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        const handleResize = () => {
            if (!mountRef.current) return;
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        const mountNode = mountRef.current;
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            mountNode?.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    // Trigger swipe animation on path change
    useEffect(() => {
        if (materialRef.current) {
            // Animate uHighlight from negative to positive to cross the UV space
            materialRef.current.uniforms.uHighlight.value = -0.3;
            gsap.to(materialRef.current.uniforms.uHighlight, {
                value: 1.3,
                duration: 1.0,
                ease: "power2.out"
            });
        }
    }, [activePath]);

    return <div ref={mountRef} className="absolute inset-0 pointer-events-none rounded-l-[10px] overflow-hidden" />;
}
