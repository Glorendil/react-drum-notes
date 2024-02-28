import React, { useState, useEffect } from 'react';
import { StaffPositioning } from '../support/StaffMetrics';

interface TimeSignatureProps {
	numerator: number;
	denominator: number;
	height: number;
}

const TimeSignature: React.FC<TimeSignatureProps> = ({ numerator, denominator, height }) => {
	const [numeratorPosition, setNumeratorPosition] = useState<string>("");
	const [denominatorPosition, setDenominatorPosition] = useState<string>("");
	const [numbersSize, setNumbersSize] = useState<string>('');

	// Use an appropriately thick font for the numbers
	var numberStyle: React.CSSProperties = {
		fontFamily: 'Old Standard TT, serif',
		fontWeight: 'bold',
		fontSize: numbersSize,
	};

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

	useEffect(() => {
		const staffPositioning = new StaffPositioning();
		const linesGapInPercent: number = staffPositioning.PositionOnAsNumber(2) - staffPositioning.PositionOnAsNumber(1);
		const calculatedLinesGapInPixels: number = linesGapInPercent * height / 100;
		const numbersFontSize: string = `${calculatedLinesGapInPixels * 2}px`;
		
		console.log("height: ", height); 
		console.log("Calculated lines gap in pixels: ", calculatedLinesGapInPixels);
		setNumbersSize(numbersFontSize);
		console.log("Numbers size: ", numbersFontSize);

		const halfDescentOffsetInPercent = calculateFontDescent(numbersFontSize) * 50 / height;
		setNumeratorPosition(staffPositioning.PositionAbove(3, halfDescentOffsetInPercent));
		setDenominatorPosition(staffPositioning.PositionAbove(5, halfDescentOffsetInPercent));
	}, [height]);

	return (
		<>
			<text x="70" y={numeratorPosition} style={numberStyle}>{numerator}</text>
			<text x="70" y={denominatorPosition} style={numberStyle}>{denominator}</text>
		</>
	);
};

export default TimeSignature;
