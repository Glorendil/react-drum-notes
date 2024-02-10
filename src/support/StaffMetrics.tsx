

const StaffLineHeight = 
[
	20,
	28,
	36,
	44,
	52,
	60,
	68
];

const noteSize: number = StaffLineHeight[2] - StaffLineHeight[1];
const formattedNoteSize: string = `${noteSize}%`;


class StaffPositioning {
	private staffLineHeight: number[];

	constructor() {
		this.staffLineHeight = StaffLineHeight;
	}

	PositionOn(staffLine: number, offset: number = 0): string {
		if (staffLine >= 1 && staffLine <= 5) {
			var averageOfLineAndNextLine = (this.staffLineHeight[staffLine] + this.staffLineHeight[staffLine + 1]) / 2;

			return `${averageOfLineAndNextLine - offset}%`;
		}

		return "0%";
	}

	PositionAbove(staffLine: number, offset: number = 0): string {
		if (staffLine >= 1 && staffLine <= 5) {
			return `${this.staffLineHeight[staffLine-1] + offset}%`;
		}

		return "0%";
	}

	PositionBelow(staffLine: number, offset: number = 0): string {
		if (staffLine >= 1 && staffLine <= 5) {
			return `${this.staffLineHeight[staffLine] + offset}%`;
		}

		return "0%";
	}
}

export { 
	StaffPositioning,
	noteSize,
	formattedNoteSize
};
