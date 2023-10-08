import { databases, db } from '$lib/appwrite';
import { Query } from 'appwrite';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const competition = await databases.getDocument(db, 'competitions', params.id);

	const rounds = await databases.listDocuments(db, 'competition_rounds', [
		Query.equal('competitionId', params.id),
		Query.orderAsc('order')
	]);

	const ageCategories = await databases.listDocuments(db, 'competition_age_categories', [
		Query.equal('competitionId', params.id),
		Query.orderAsc('order')
	]);

	const genderCategories = await databases.listDocuments(db, 'competition_gender_categories', []);

	return {
		competition,
		rounds,
		ageCategories,
		genderCategories
	};
}) satisfies PageLoad;
