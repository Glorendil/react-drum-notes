import React, { useEffect, useRef, useState } from 'react';
import { StaffPositioning, noteSize } from '../support/StaffMetrics';
import TimeSignature from './TimeSignature';
import DrumNote from './DrumNote';


//import FullNoteHead from '../assets/full_note_head.svg'; // import the SVG file
// import DrumNote from './DrumNote';
// import EmptyStaff from './EmptyStaff';
// import DrumKey from './DrumKey';
// import TimeSignature from './TimeSignature';


const staffPositioning = new StaffPositioning();

interface StaffProps {
	//timeSignature: string;
	notation: string;
}

const lineHeight = (height : number, line : number) => {
	const percentage = staffPositioning.PositionOnAsNumber(line);
	const pixel = (height * percentage) / 100.0;
	console.log("Height: ", height, "Line: ", line, "Percentage: ", percentage, "Pixel: ", pixel);
	return pixel;
}

const drawStaff = (height : number) => {
	const staffLines = [1, 2, 3, 4, 5];
	return (
		<>
			{staffLines.map((line) => (
				<line key={line} x1="0" y1={lineHeight(height, line)} x2="100%" y2={lineHeight(height, line)} stroke="black" strokeWidth="2"/>	
			))}
		</>
	);
}

const drawKey = (height : number) => {
	const line2 : number = lineHeight(height, 2);
	const line4 : number = lineHeight(height, 4);
	const lineThickness = noteSize * 1.5;
	const lineSpacing = noteSize;
	const keyLine1 = noteSize * 2;
	const keyLine2 = keyLine1 + lineSpacing + lineThickness;

return (
	<>
		<line x1={keyLine1} y1={line2} x2={keyLine1} y2={line4} stroke="black" strokeWidth={lineThickness} />
		<line x1={keyLine2} y1={line2} x2={keyLine2} y2={line4} stroke="black" strokeWidth={lineThickness} />
	</>
)
}

// The notation string is a series of drum names separated by commas.
// Following each drum name is a colon, then the lowest division for that drum (4, 8, 16, etc.),
// and then in parentheses a series of letters representing the drum notes, their durations
// and specific decorations.
// const translateNotationStringToComponents = (notation: string, staffHeight: number, startPos: number, stepPos: number) => {
// 	const drumNotationArray = notation.split(',');
// 	const drumComponents = drumNotationArray.map((drumNotation) => {
// 		const drumName = drumNotation.split(':')[0];
// 		const drumDivision = drumNotation.split(':')[1];
// 		const drumNotes = drumNotation.split(':')[2];
// 		return (
// 			<DrumNote drumName={drumName} height={staffHeight} division={drumDivision}}/>
// 		);
// 	});
// 	return drumComponents;
// }




const NotatedStaff: React.FC<StaffProps> = (notation) => {
	const divRef = useRef(null);
	const [divHeight, setDivHeight] = useState(0);
	
	useEffect(() => {
		if (divRef.current) {
			const height = (divRef.current as HTMLElement).getBoundingClientRect().height;
			console.log("<NotedStaff> Height: ", height);
			setDivHeight(height);
		}
	}, [divRef.current]);
	
	return (
		<div className='staff-block' ref={divRef}>
				<svg className='staff-block'>
					{divHeight ? drawStaff(divHeight) : <></>}
					{divHeight ? drawKey(divHeight) : <></>}
					{divHeight ? <TimeSignature timeSignature='c' height={divHeight}/> : <></>}
					{divHeight ? <DrumNote 
													drumName='kick' 
													height={divHeight} 
													xPosition={120}
													division={32}
													decorations=''
												/> : <></>}
				</svg>
		</div>
	);
};

export default NotatedStaff;
