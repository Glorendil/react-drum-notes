import React from 'react';
//import FullNoteHead from '../assets/full_note_head.svg'; // import the SVG file
import DrumNote from './DrumNote';
import { StaffPositioning } from '../support/StaffMetrics';
import EmptyStaff from './EmptyStaff';
import DrumKey from './DrumKey';


interface StaffProps {
//  noteLines: string[];
}

//const staffPositioning = new StaffPositioning();

const NotatedStaff: React.FC<StaffProps> = () => {
	return (
		<div className='staff-block'>
			<svg className="staff" width="100%" height="100%">
				<EmptyStaff/>
				<DrumKey/>
				<DrumNote drumName='kick'/>
				<DrumNote drumName='snare'/>
				<DrumNote drumName='hihat'/>
			</svg>
		</div>
	);
};

export default NotatedStaff;
