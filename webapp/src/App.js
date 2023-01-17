import React, { useEffect, useState } from 'react';
import './style.css';

export const CreateNewNode = (props) => {
	const { attributes, setStart, start, end, setEnd, setObstrucles, obstrucles } = props;
	const [currentNode, setCurrentNode] = useState(attributes);

	function handleClick(data) {
		if (!start || !end) {
			if (!start) {
				setCurrentNode((prevState) => ({ ...prevState, color: '#000', start_node: true }));
				setStart(data);
			} else if (!end) {
				if (!start || !end) {
					setCurrentNode((prevState) => ({ ...prevState, color: '#0235' }));
					setEnd(data);
				}
			}
		} else {
			setObstrucles((prevState) => [...prevState, data]);
			setCurrentNode((prevState) => ({ ...prevState, color: '#FF0000' }));
		}
		console.log(obstrucles);
	}

	return (
		<div className="node" style={{ background: currentNode.color }}>
			<span onClick={() => handleClick(currentNode)}>{currentNode.row + '-' + currentNode.col}</span>
		</div>
	);
};

export default function App() {
	const [grid, setGrid] = useState([]);
	const [GRID_ROW_LENGTH, SET_GRID_ROW_LENGTH] = useState(16);
	const [GRID_COL_LENGTH, SET_GRID_COL_LENGTH] = useState(16);
	const [start, setStart] = useState();
	const [end, setEnd] = useState();
	const [obstrucles, setObstrucles] = useState([]);

	useEffect(() => {
		createGrid();
		return () => {};
	}, []);
	const createGrid = () => {
		var x = new Array(GRID_ROW_LENGTH);
		for (let i = 0; i < GRID_COL_LENGTH; i++) {
			x[i] = new Array(2);
		}
		for (var i = 0; i < GRID_ROW_LENGTH; i++) {
			for (var j = 0; j < GRID_COL_LENGTH; j++) {
				x[i][j] = new Node(i, j);
			}
		}
		setGrid(x);
	};

	const handleReset = () => {
		setEnd({});
		setStart({});
	};
	function Node(i, j) {
		this.row = i;
		this.col = j;
		this.color = '#ffff';
		this.g = 0; //distance from the end pos
		this.h = 0; //distance from the start pos
		this.f = 0; //f = g+h
		this.start_node = false;
		this.end_node = false;
		this.wall_node = false;
		this.open_node = false;
		this.closed_node = false;
		this.parent = null;
	}

	return (
		<div className="grid">
			<div className="mainContent">
				{grid.map((row, rowIndex) => {
					console.log(rowIndex);
					return (
						<div key={rowIndex}>
							{row.map((node, colIndex) => {
								return (
									<CreateNewNode
										attributes={node}
										setStart={setStart}
										start={start}
										end={end}
										setEnd={setEnd}
										setObstrucles={setObstrucles}
										obstrucles={obstrucles}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
			<div className="optionContent">
				<button class="glow-on-hover" type="button" disabled={start ? true : false}>
					start
				</button>
				<button class="glow-on-hover" type="button" disabled={end ? true : false}>
					End
				</button>
				<button class="glow-on-hover" type="button">
					Obstrucles
				</button>
				<button class="glow-on-hover" type="button">
					search
				</button>
				<button class="glow-on-hover" type="button" onClick={handleReset}>
					Reset
				</button>
			</div>
		</div>
	);
}
