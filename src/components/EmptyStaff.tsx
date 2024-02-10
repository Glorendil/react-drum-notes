import React from 'react';
import { StaffPositioning } from '../support/StaffMetrics';

interface EmptyStaffProps {
}

const staffPositioning = new StaffPositioning();

const EmptyStaff: React.FC<EmptyStaffProps> = () => {

	const line1 = staffPositioning.PositionOn(1);
	const line2 = staffPositioning.PositionOn(2);
	const line3 = staffPositioning.PositionOn(3);
	const line4 = staffPositioning.PositionOn(4);
	const line5 = staffPositioning.PositionOn(5);
	
	return (
		<>
			<line x1="0" y1={line1} x2="100%" y2={line1} stroke="black" strokeWidth="2" />
			<line x1="0" y1={line2} x2="100%" y2={line2} stroke="black" strokeWidth="2" />
			<line x1="0" y1={line3} x2="100%" y2={line3} stroke="black" strokeWidth="2" />
			<line x1="0" y1={line4} x2="100%" y2={line4} stroke="black" strokeWidth="2" />
			<line x1="0" y1={line5} x2="100%" y2={line5} stroke="black" strokeWidth="2" />
		</>
	);
};

export default EmptyStaff;
