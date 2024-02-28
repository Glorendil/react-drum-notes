import React from 'react';
import { StaffPositioning, noteSize } from '../support/StaffMetrics';


const DrumKey: React.FC = () => {

	const staffPositioning = new StaffPositioning();

	const line2 = staffPositioning.PositionOn(2);
	const line4 = staffPositioning.PositionOn(4);
	const lineThickness = noteSize * 1.5;
	const lineSpacing = noteSize;
	const keyLine1 = noteSize * 2;
	const keyLine2 = keyLine1 + lineSpacing + lineThickness;

	return (
		<>
			<line x1={keyLine1} y1={line2} x2={keyLine1} y2={line4} stroke="black" strokeWidth={lineThickness} />
			<line x1={keyLine2} y1={line2} x2={keyLine2} y2={line4} stroke="black" strokeWidth={lineThickness} />
		</>
	);
};

export default DrumKey;
