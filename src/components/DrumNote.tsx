import React, { useRef, useEffect, useState } from 'react';
import FullNoteHead from '../assets/full_note_head.svg'; // import the SVG file
import CymbalNoteHead from '../assets/cymbal_note_head.svg'; // import the SVG file
import EighthDivisionFlag from '../assets/eighth_division_flag.svg'; // import the SVG file
import { noteSize, StaffPositioning } from '../support/StaffMetrics';

// This component is a single drum note on the staff
// It takes a the name of the drum played as a string prop
// and returns a note head at the appropriate position on the staff

interface DrumNoteProps {
	drumName: string;
	height: number;
	xPosition: number;
	division: number;
	decorations: string;
}

// This JSON object maps the drum name to the note position on the staff and the 
// note head SVG file

const staffPositioning = new StaffPositioning();
const lineWidth = 3;

const drumNoteMap: {[key: string]: {
											notePosition: number, 
											noteHead: string, 
											stemStartFromMiddle: boolean, 
											stemUp: boolean
										}} = {
	'hihat': {
		notePosition: staffPositioning.PositionAboveAsNumber(1, 0), 
		noteHead: CymbalNoteHead,
		stemStartFromMiddle: false,
		stemUp: true
	},
	'snare': {
		notePosition: staffPositioning.PositionAboveAsNumber(3, -noteSize/2), 
		noteHead: FullNoteHead,
		stemStartFromMiddle: true,
		stemUp: true
	},
	'kick': {
		notePosition: staffPositioning.PositionAboveAsNumber(5, -noteSize/2), 
		noteHead: FullNoteHead,
		stemStartFromMiddle: true,
		stemUp: false
	}
}

// const stripPercent = (percent: string): number => {
// 	return Number(percent.substring(0, percent.length - 1));
// }

const stemX = (drumName: string, noteWidth: number, xPosition: number): string => {
	// if the stem is up, it should be on the right side of the note head
	// This means that the x should be shifted to the right by the width of the note head
	// if the stem is down, it should be on the left side of the note head
	// This means that the x should not be shifted at all

	// The width of the note head is the width of the associated SVG file
	// when the height is set to the note size
	const shift = drumNoteMap[drumName].stemUp ? noteWidth - lineWidth/2 : lineWidth/2;
	
	return `${shift + xPosition}` ;
}

const stemStart = (drumName: string, height: number): number => {
	const baseYpercent = drumNoteMap[drumName].notePosition;
	const shiftPercent = drumNoteMap[drumName].stemStartFromMiddle ? noteSize/2 : 0

	const stemStartY = (baseYpercent + shiftPercent) * height / 100.0;

	console.log("Stem start: ", stemStartY);

	return stemStartY;
}

const stemLengthMultiplier = (drumName: string): number => {
	return drumNoteMap[drumName].stemStartFromMiddle ? 2.5 : 2;
}

const stemEnd = (drumName: string, height: number): number => {
	const lengthMultiplier = stemLengthMultiplier(drumName);
	const stemLengthPercent = noteSize * lengthMultiplier * (drumNoteMap[drumName].stemUp ? -1 : 1);
	const stemLength = stemLengthPercent * height / 100.0;

	return stemStart(drumName, height) + stemLength;
}

// This method takes an imported SVG file and extracts the width of the SVG 
const extractSvgWidth = (svgFile : string, targetHeight : number) : number => {
	const tempImage = new Image();
	tempImage.src = svgFile;

	const aspectRatio = tempImage.width / tempImage.height;
	const targetWidth = targetHeight * aspectRatio;

	console.log("SVG width: ", targetWidth);
	return targetWidth;
}

const noteHeight = (height : number) => {
	// Note size is the gap between two staff lines, in percentage
	// To calculate the note height we multiply the height of the component in pixels
	// by the percentage of the note size

	// Ensure that the height is not 0 and not NaN
	if (height === 0 || isNaN(height)) {
		console.log("Invalid height: ", height);
		return 0;
	}

	console.log("Note size: ", noteSize, "Height: ", height, "Note height: ", noteSize * height / 100.0);
	return noteSize * height / 100.0;
}

// This method draws the division flags for notes with divisions greater than 4
// For 8 divisions, one flag is drawn, for 16 two flags are drawn, etc.
// The orientation of the flags is determined by the drum note
const drawDivisionFlags = (drumName: string, division: number, height: number, xPosition: number, notePosition: number) => {
	if (division <= 4) {
		return <></>;
	}

	const flags = [];
	const flagHeight : number = noteSize * 1.5 * height / 100.0;
	const flagStep : number = flagHeight / 3;
	const flagWidth : number  = extractSvgWidth(EighthDivisionFlag, flagHeight);

	const flagX = xPosition + extractSvgWidth(drumNoteMap[drumName].noteHead, noteHeight(height));
	const flagY = (noteSize * stemLengthMultiplier(drumName))* height / 100.0;// + flagHeight * (division / 8);

	for (let i = division / 8, j = 1; i >= 1; i /= 2, j++) {
		flags.push(
			<image 
				key={i} 
				href={EighthDivisionFlag} 
				x={flagX} 
				y={flagY + j * flagStep} 
				height={flagHeight} 
				width={flagWidth} 
			/>
		);
	}

	return flags;
}

const DrumNote: React.FC<DrumNoteProps> = ({
	drumName, 
	height,
	xPosition,
	division,
	decorations
	}) => {

	const svgRef = useRef(null);

	return (
		<>
			<image 
				href={drumNoteMap[drumName].noteHead}
				ref={svgRef}
				x={xPosition}
				y={drumNoteMap[drumName].notePosition * height / 100.0} 
				height={noteHeight(height)} 
			/>
			<line
				x1={stemX(drumName, extractSvgWidth(drumNoteMap[drumName].noteHead, noteHeight(height)), xPosition)}
				y1={stemStart(drumName, height)}
				x2={stemX(drumName, extractSvgWidth(drumNoteMap[drumName].noteHead, noteHeight(height)), xPosition)}
				y2={stemEnd(drumName, height)}
				stroke="black"
				strokeWidth={lineWidth}
			/>
			{division > 4 && drawDivisionFlags(drumName, division, height, xPosition, drumNoteMap[drumName].notePosition)}
		</>
	);
};

export default DrumNote;