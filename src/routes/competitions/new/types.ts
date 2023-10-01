export interface Competition {
	name: string;
	description: string;
	climbingType: 'Boulder' | 'Top Rope' | 'Lead';
	startDate: string;
	endDate: string;
	enableGenderCategories: boolean;
	ageCategories: string[];
	rounds: string[];
	createdBy: {
		uid: string;
		displayName: string;
	};
}
