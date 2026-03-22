"use client"

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function AmbientGlCanvas() {
    const mountRef = useRef<HTMLDivElement>(null);
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const pathname = usePathname();
    const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

    useEffect(() => {
        if (!mountRef.current) return;

        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0.1, 10 );
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(2, 2);

        const uniforms = {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(w, h) },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uTurbulence: { value: 0.0 }
        };

        const fragmentShader = `
            uniform float uTime;
            uniform vec2 uResolution;
            uniform vec2 uMouse;
            uniform float uTurbulence;
            
            // Simplex 2D noise
            vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
            float snoise(vec2 v){
                const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1;
                i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod(i, 289.0);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                    dot(x12.zw,x12.zw)), 0.0);
                m = m*m ;
                m = m*m ;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / uResolution.xy;
                vec2 st = uv;
                
                // Mouse interaction effect
                float dist = distance(uv, uMouse);
                float mouseGlow = exp(-dist * 4.0) * 0.5;

                // Subtle fluid distortion combined with route transition turbulence
                vec2 noisePos = vec2(st.x * 2.0 + uTime * 0.05, st.y * 2.0 - uTime * 0.04);
                // Apply a gentle warp when uTurbulence spikes
                vec2 warpedPos = noisePos + vec2(snoise(noisePos * 2.0) * uTurbulence * 0.2);
                float noise = snoise(warpedPos) * 0.5 + 0.5;
                
                // Base FAFAFA: vec3(0.98, 0.98, 0.98)
                // Highlights: vec3(0.94, 0.94, 0.95)
                vec3 c1 = vec3(0.98, 0.98, 0.98);
                vec3 c2 = vec3(0.94, 0.94, 0.95);
                
                // Blend smoothly with mouse reaction
                vec3 finalColor = mix(c1, c2, noise * 0.15 + mouseGlow * 0.1);
                
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: `
                void main() { gl_Position = vec4(position, 1.0); }
            `,
            fragmentShader,
            transparent: true
        });
        
        materialRef.current = material;

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        let animationFrameId: number;
        const startTime = Date.now();

        const render = () => {
            // Smooth mouse interpolation (lerp)
            const m = mouseRef.current;
            m.x += (m.targetX - m.x) * 0.05;
            m.y += (m.targetY - m.y) * 0.05;
            
            material.uniforms.uTime.value = (Date.now() - startTime) * 0.001;
            material.uniforms.uMouse.value.set(m.x, m.y);
            
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        const handleResize = () => {
            if (!mountRef.current) return;
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            renderer.setSize(width, height);
            material.uniforms.uResolution.value.set(width, height);
        };
        window.addEventListener('resize', handleResize);

        const handleMouseMove = (e: MouseEvent) => {
            if (!mountRef.current) return;
            // WebGL coordinates (Y is flipped)
            mouseRef.current.targetX = e.clientX / window.innerWidth;
            mouseRef.current.targetY = 1.0 - (e.clientY / window.innerHeight);
        };
        window.addEventListener('mousemove', handleMouseMove);

        const mountNode = mountRef.current;
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            mountNode?.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    // Trigger turbulence animation on path change (no flash, just liquid distortion)
    useEffect(() => {
        if (materialRef.current) {
            // Spike the turbulence and settle back
            gsap.fromTo(materialRef.current.uniforms.uTurbulence, 
                { value: 1.5 },
                {
                    value: 0.0,
                    duration: 1.8,
                    ease: "power3.out"
                }
            );
        }
    }, [pathname]);

    return (
        <div 
            ref={mountRef} 
            className="absolute inset-0 pointer-events-none z-0" 
            style={{ mixBlendMode: 'multiply', opacity: 0.8 }}
        />
    );
}
