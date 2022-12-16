import {  Environment, 
	OrbitControls, 
	PerspectiveCamera } from "@react-three/drei";
import {  useFrame } from "@react-three/fiber";
import {  useRef } from "react";
import * as THREE from "three";
import { angleToRadians } from "../util/angle";
import { CarModel } from "./Car"
import { Ground } from './Ground';
import { Rectangles } from './Rectangles';

export const Three = () => {

	const colorAmbientLight = '#d62fac';
	const environmentBackground = '#577db3';
	const defaultRectangleColor = "aquamarine";

	const orbitControlsRef = useRef(null);

	useFrame((state) => {
		if (!!orbitControlsRef.current) {
			const { x, y } = state.mouse;
			orbitControlsRef.current.setAzimutalAngle(angleToRadians(x));
		}
	});

	return (
		<>
			{/* Camera */}
			<PerspectiveCamera makeDefault position={[1, 1, 5]} />
			<OrbitControls minPolarAngle={angleToRadians(20)}
				maxPolarAngle={angleToRadians(80)} />

			<CarModel castShadow/>
			<Rectangles positionOfRec={[1.45, 0.2, 0]} 
			defaultRecColor = {defaultRectangleColor}
			onChangeRecColor= {"#213ddb"}/>
			<Rectangles positionOfRec={[-1.45, 0.2, 0]} 
			defaultRecColor={defaultRectangleColor}
			onChangeRecColor={"#bb4fe3"}/>
			<Ground castShadow />

			<color args={[0, 0, 0]} attach="background" />
			<spotLight
				color={[1, 0.25, 0.7]}
				intensity={1.5}
				angle={2.0}
				penumbra={0.5}
				position={[10, 5, 0]}
				castShadow
				shadow-bias={-0.0001}
			/>
			<spotLight
				color={[0.14, 0.5, 1]}
				intensity={2}
				angle={2.0}
				penumbra={0.5}
				position={[-10, 5, 0]}
				castShadow
				shadow-bias={-0.0001}
			/>

			<ambientLight args={[colorAmbientLight, 0.20]} />

			<Environment background>
				<mesh>
					<sphereGeometry args={[50, 100, 100]} />
					<meshBasicMaterial side={THREE.BackSide} 
					color={environmentBackground} />
				</mesh>
			</Environment>
		</>
	)
}




