import './App.css';
import Move from './Move';
import React, { useEffect, useState } from 'react';

const colors = ['red', 'purple', 'blue', 'green'];

function App() {
	const [dragging, setDragging] = useState(false);
	const [zIndex, setZIndex] = useState(1);
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight - 40);
	const [style, setStyle] = useState({ width: width, height: height })

	const setDraggingState = (value) => {
		setDragging(value);
	};

	const setZIndexState = () => {
		setZIndex(zIndex => zIndex + 1);
	};

	const setWidthState = (amount) => {
		setWidth(amount);
	};

	const setHeightState = (amount) => {
		setHeight(amount);
	};

	useEffect(() => {
		setStyle({ ...style, width });
	}, [width]);

	useEffect(() => {
		setStyle({ ...style, height });
	}, [height]);

	return (
		<div className="App" onMouseUp={() => setDraggingState(false)} >
			<header style={{ width: '100%', height: '40px', backgroundColor: '#eee' }}></header>
			<div style={style}>
				{colors.map(item => (
					<Move
						key={item}
						dragging={dragging}
						setDraggingState={setDraggingState}
						color={item}
						zIndex={zIndex}
						setZIndex={setZIndexState}
						width={width}
						setWidth={setWidthState}
						height={height}
						setHeight={setHeightState}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
