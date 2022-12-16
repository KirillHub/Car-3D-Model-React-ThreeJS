import { a, useSpring } from "@react-spring/three"
import { useEffect, useState } from "react";

export const Rectangles = ({positionOfRec, defaultRecColor,
	onChangeRecColor}) => {

	const [hovered, setHovered] = useState(false)

	const { colorLeftRectangle, scaleLeftRectangle } =
		useSpring({
			scaleLeftRectangle: hovered ?
				[1.15, 1.15, 1] : [1, 1, 1], colorLeftRectangle: hovered ? 
				onChangeRecColor : defaultRecColor
		});

	useEffect(() => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
		[hovered]);

	return (
		<group>
			<a.mesh
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
				receiveShadow position={positionOfRec} castShadow scale={scaleLeftRectangle}>
				<boxGeometry args={[0.65, 0.35, 30]} />
				<a.meshStandardMaterial color={colorLeftRectangle} />
			</a.mesh>
		</group>
	)
};