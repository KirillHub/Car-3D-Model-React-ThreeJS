import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Three } from '../components/Three'
import './App.css'

function App() {

	return (
		<Canvas id='three-canvas-ccontainer' shadows>
			<Suspense fallback={null}>
				<Three />
			</Suspense>
		</Canvas>
	)
}

export default App
