import React, { useEffect, useState } from 'react';
import { TextData } from './@types/TextData';
import './styles/App.css';

const App: React.FC = () => {

	const getDefaultTextData = (): TextData[] => {
		const letters = 'hello amogus susy'.split('');
		const data: TextData[] = [];

		for(const letter of letters) {
			data.push({
				state: 0,
				letter
			});
		}

		console.log(data);
		return data;
	}

	const [textData, setTextData] = useState(getDefaultTextData());

	const test = (e: KeyboardEvent) => {
		console.log(e.key);
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
					<span id="caret">
						|
					</span>
					{textData.map(data => 
						{data.letter}
					)}
				</div>
			</div>
		</>
	)
}

export default App;
