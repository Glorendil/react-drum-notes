import React from 'react';
import { StaffPositioning } from '../support/StaffMetrics';

interface EmptyStaffProps {
}

const staffPositioning = new StaffPositioning();

const EmptyStaff: React.FC<EmptyStaffProps> = () => {
	return (
		<>
			<line x1="0" y1={staffPositioning.PositionOn(1)} x2="100%" y2={staffPositioning.PositionOn(1)} stroke="black" strokeWidth="2" />
			<line x1="0" y1={staffPositioning.PositionOn(2)} x2="100%" y2={staffPositioning.PositionOn(2)} stroke="black" strokeWidth="2" />
			<line x1="0" y1={staffPositioning.PositionOn(3)} x2="100%" y2={staffPositioning.PositionOn(3)} stroke="black" strokeWidth="2" />
			<line x1="0" y1={staffPositioning.PositionOn(4)} x2="100%" y2={staffPositioning.PositionOn(4)} stroke="black" strokeWidth="2" />
			<line x1="0" y1={staffPositioning.PositionOn(5)} x2="100%" y2={staffPositioning.PositionOn(5)} stroke="black" strokeWidth="2" />
		</>
	);
};

export default EmptyStaff;
