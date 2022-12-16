import { a, useSpring } from "@react-spring/three"
import {useGLTF, useAnimations} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import React from "react";
import gsap from 'gsap';
import { ARButton } from 'three/addons/webxr/ARButton.js';


export const CarModel = () => {
	let carBodyColor;
	const gltf = useLoader(GLTFLoader, '../models/car/scene.gltf');
	const { nodes, animations } = useGLTF('../models/car/car-model.glb');
	const { ref, actions, names } = useAnimations(animations);
	const [hovered, setHovered] = useState(false);

	const refARButton = useRef(null);

	const movingCar = useRef(null);
	useEffect(() => {
		if(!!movingCar.current){
			gsap.to(movingCar.current.position, {
				duration: 10,
				x: 0,
				z: -13,
			});
		}
	}, [movingCar.current]);

	useEffect(() => {
		actions[names].reset().fadeIn(9).play()

		return () => actions[names].fadeOut(9).play()
	}, [ actions, names ] );

	const { color, scale } =
		useSpring({
			scale: hovered ?
				[1.05, 1.05, 1] : [1, 1, 1], color: hovered ? 
				carBodyColor = {isColor: true, r: 1.0, g: 1.0, b: 1.0} :
				carBodyColor = {isColor: true, r: 255.0, g: 255.0, b: 255.0}
		});
		
	useEffect(() => {
		document.body.style.cursor = hovered ? "pointer" : "auto";
		gltf.materials.Orange.color = carBodyColor;
	}, [hovered]);

	gltf.scene.traverse(node => {
		if (node.isMesh || node.isLight) node.castShadow = true;
		if (node.isMesh || node.isLight) node.receiveShadow = true;
	});

	useEffect(() => {
		gltf.scene.position.set(0.10, 0.75, 13);
		gltf.scene.scale.set(0.01, 0.01, 0.01);
		gltf.scene.rotation.set(0, -29.87, 0);
	}, [gltf]);

	useFrame((state, delta) => {
		let t = state.clock.getElapsedTime();

		if (t <= 12){
		let group = gltf.scene.children[0].children[0].children[0].children[0];
			if (!!movingCar.current){
				group.children[17].rotation.z = -(t * 1.5);
				group.children[18].rotation.z = -(t * 1.5);
				group.children[19].rotation.z = (t * 1.5);
				group.children[20].rotation.z = (t * 1.5);
	
			};
		};
	});

	document.body.appendChild(ARButton.createButton(refARButton,  
		{ requiredFeatures: [ 'hit-test' ] }))

	return (
		<group ref={ref} dispose={null}>
			<a.mesh
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)} scale={scale}>
				<primitive ref={movingCar} object={gltf.scene} castShadow 
				scale={0.4}  color={color} />
			</a.mesh>
		</group>
	);
}

useGLTF.preload("../models/car/scene.gltf");

