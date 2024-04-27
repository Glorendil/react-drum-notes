import React, { useState, useEffect } from 'react';
import { StaffPositioning } from '../support/StaffMetrics';

interface TimeSignatureProps {
	timeSignature: string;
	height: number;
}

const staffPositioning = new StaffPositioning();

const TimeSignature: React.FC<TimeSignatureProps> = ({ timeSignature, height }) => {
	const [numeratorPosition, setNumeratorPosition] = useState<number>(0);
	const [denominatorPosition, setDenominatorPosition] = useState<number>(0);
	const [numbersSize, setNumbersSize] = useState<string>('');

	const [numerator, setNumerator] = useState<number>(0);
	const [denominator, setDenominator] = useState<number>(0);
	const [letterTime, setLetterTime] = useState<boolean>(false);
	const [cutTime, setCutTime] = useState<boolean>(false);

	// Use an appropriately thick font for the numbers
	var numberStyle: React.CSSProperties = {
		fontFamily: 'Old Standard TT, serif',
		fontWeight: 'bold',
		fontSize: numbersSize,
	};

	// var commonStyle: React.CSSProperties = {
	// 	fontFamily: 'Orelega One, serif',
	// 	fontWeight: '400',
	// 	fontSize: numbersSize,
	// };
		

	// This method calculates the size the font descent takes up in pixels
	// It will be used as offset for the numerator and denominator
	// to make sure they are aligned with the staff lines
	// (the font descent is the part of the font that extends below the baseline)
	const calculateFontDescent = (fontSize: string): number => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		if (context) {
			const fontString = fontSize + ' Old Standard TT, serif '; // + 'px ' + numberStyle.fontFamily;
			console.log("Font string: ", fontString);
			context.font = fontString
			const metrics = context.measureText('g');
			console.log("Font descent: ", metrics.actualBoundingBoxDescent);
			return metrics.actualBoundingBoxDescent;
		}
		return 0;
	};

	// This method calculates the width of the letter C in the font
	// It will be used to find the center of the letter C in the time signature
	const calculateCLetterWidth = (fontSize: string): number => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		if (context) {
			const fontString = fontSize + ' Old Standard TT, serif ';
			console.log("Font string: ", fontString);
			context.font = fontString
			const metrics = context.measureText('C');
			console.log("Letter C width: ", metrics.width);
			return metrics.width;
		}
		return 0;
	}

	useEffect(() => {
		const linesGapInPercent: number = staffPositioning.PositionOnAsNumber(2) - staffPositioning.PositionOnAsNumber(1);
		const calculatedLinesGapInPixels: number = linesGapInPercent * height / 100;
		const numbersFontSize: string = `${calculatedLinesGapInPixels * 2}px`;
		
		console.log("<Time Signature> height: ", height); 
		console.log("Calculated lines gap in pixels: ", calculatedLinesGapInPixels);
		setNumbersSize(numbersFontSize);
		console.log("Numbers size: ", numbersFontSize);

		const halfDescentOffsetInPercent : number = calculateFontDescent(numbersFontSize) * 50 / height;
		const numeratorPositionPercent : number= staffPositioning.PositionAboveAsNumber(3, halfDescentOffsetInPercent);
		const denominatorPositionPercent : number = staffPositioning.PositionAboveAsNumber(5, halfDescentOffsetInPercent);
		setNumeratorPosition(numeratorPositionPercent * height / 100);
		setDenominatorPosition(denominatorPositionPercent * height / 100);

		// If the time signature contains a / character, split it into the numerator and denominator
		// Otherwise, check if it is a letter time signature
		// A capital C would represent common time (4/4)
		// A regular c would represent cut time (2/2)
		if (timeSignature.includes('/')) {
			const splitTimeSignature = timeSignature.split('/');
			setNumerator(parseInt(splitTimeSignature[0]));
			setDenominator(parseInt(splitTimeSignature[1]));
			setLetterTime(false);
			setCutTime(false);
		} else {
			if (timeSignature === 'C') {
				setNumerator(4);
				setDenominator(4);
				setLetterTime(true);
				setCutTime(false);
			} else if (timeSignature === 'c') {
				setNumerator(2);
				setDenominator(2);
				setLetterTime(true);
				setCutTime(true);
			}
		}

	}, [height, timeSignature]);

	return (
		<>
			{letterTime && <text x="70" y={((numeratorPosition + denominatorPosition)/2)} style={numberStyle}>C</text>}
			{letterTime && cutTime && <line 
				x1={70 + calculateCLetterWidth(numbersSize) / 2} 
				y1={staffPositioning.PositionOnAsNumber(2) * height / 100} 
				x2={70 + calculateCLetterWidth(numbersSize) / 2}
				y2={staffPositioning.PositionOnAsNumber(4) * height / 100}
				stroke="black"
				strokeWidth={3}
				></line>
			}
			{!letterTime && <text x="70" y={numeratorPosition} style={numberStyle}>{numerator}</text>}
			{!letterTime && <text x="70" y={denominatorPosition} style={numberStyle}>{denominator}</text>}
		</>
	);
};

export default TimeSignature;
