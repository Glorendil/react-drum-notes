import React from 'react';
import FullNoteHead from '../assets/full_note_head.svg'; // import the SVG file
import CymbalNoteHead from '../assets/cymbal_note_head.svg'; // import the SVG file
import { noteSize, formattedNoteSize, StaffPositioning } from '../support/StaffMetrics';

// This component is a single drum note on the staff
// It takes a the name of the drum played as a string prop
// and returns a note head at the appropriate position on the staff

interface DrumNoteProps {
	drumName: string;
}

// This JSON object maps the drum name to the note position on the staff and the 
// note head SVG file

const staffPositioning = new StaffPositioning();

const drumNoteMap: {[key: string]: {notePosition: string, noteHead: string}} = {
	'hihat': {
		notePosition: staffPositioning.PositionAbove(1, -noteSize/2), 
		noteHead: CymbalNoteHead
	},
	'snare': {
		notePosition: staffPositioning.PositionAbove(3, -noteSize/2), 
		noteHead: FullNoteHead
	},
	'kick': {
		notePosition: staffPositioning.PositionAbove(5, -noteSize/2), 
		noteHead: FullNoteHead
	}
}

const DrumNote: React.FC<DrumNoteProps> = ({drumName}) => {
	return (
		<image 
			href={drumNoteMap[drumName].noteHead} 
			x="110" 
			y={drumNoteMap[drumName].notePosition} 
			height={formattedNoteSize} 
			width={formattedNoteSize}/>
	);
};

export default DrumNote;