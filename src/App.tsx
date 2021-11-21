import React, { useEffect, useState } from 'react';
import { TextData } from './@types/TextData';
import './styles/App.css';

const App: React.FC = () => {

	const getDefaultTextData = (): TextData[] => {
		const letters = 'hello amogus susy'.split('');
		const data: TextData[] = [];

		for(let i = 0; i < letters.length; i++) {
			data.push({
				index: i,
				state: 0,
				letter: letters[i]
			});
		}

		return data;
	}

	const [textData, setTextData] = useState(getDefaultTextData());
	const [currIndex, setCurrIndex] = useState(0);

	const test = (e: KeyboardEvent) => {
		setCurrIndex(currIndex+1);
	}

	useEffect(() => {
		document.addEventListener("keyup", test);
	});
	
	return (
		<>
			<div className="header">
				<div className="logo">
					worst-typing-platform
				</div>
			</div>

			<div className="content">
				<div className="words">
					<span id="caret" style={{left: currIndex*1}}>|</span>
					{textData.map(data => 
						<span className={`state-${data.state}`}>{data.letter}</span>
					)}
				</div>
			</div>
		</>
	)
}

export default App;
