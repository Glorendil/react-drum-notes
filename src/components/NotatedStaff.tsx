import React, { useEffect, useRef, useState } from 'react';


//import FullNoteHead from '../assets/full_note_head.svg'; // import the SVG file
import DrumNote from './DrumNote';
import EmptyStaff from './EmptyStaff';
import DrumKey from './DrumKey';
import TimeSignature from './TimeSignature';


interface StaffProps {
//  noteLines: string[];
}

//const staffPositioning = new StaffPositioning();

const NotatedStaff: React.FC<StaffProps> = () => {
	const divRef = React.useRef(null);
	const [divHeight, setDivHeight] = React.useState(0);
	
	React.useEffect(() => {
		if (divRef.current) {
			const height = (divRef.current as HTMLElement).getBoundingClientRect().height;
			setDivHeight(height);
		}
	}, []);
	
	return (
		<div className='staff-block' ref={divRef}>
			<svg className="staff" width="100%" height="100%">
				<EmptyStaff/>
				<DrumKey/>
				<TimeSignature numerator={6} denominator={8} height={divHeight}/>
				<DrumNote drumName='kick'/>
				<DrumNote drumName='snare'/>
				<DrumNote drumName='hihat'/>
			</svg>
		</div>
	);
};

export default NotatedStaff;
