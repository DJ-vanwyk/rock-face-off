import { databases, db } from '$lib/appwrite';
import { Query } from 'appwrite';
import type { PageLoad } from './$types';
import { loadErrorStore } from '$lib/stores/loadErrors.store';

export const load = (async ({ params }) => {
	loadErrorStore.set([]);
	const errors: any = [];

	let competition;
	let rounds;
	let ageCategories;
	let genderCategories;

	const [competitionResult, roundsResult, ageCategoriesResult, genderCategoriesResult] =
		await Promise.allSettled([
			databases.getDocument(db, 'competitions', params.id),
			databases.listDocuments(db, 'competition_rounds', [
				Query.equal('competitionId', params.id),
				Query.orderAsc('order')
			]),
			databases.listDocuments(db, 'competition_age_categories', [
				Query.equal('competitionId', params.id),
				Query.orderAsc('order')
			]),
			databases.listDocuments(db, 'competition_gender_categories', [])
		]);

	if (competitionResult.status === 'fulfilled') {
		competition = competitionResult.value;
	} else {
		errors.push(competitionResult.reason);
	}

	if (roundsResult.status === 'fulfilled') {
		rounds = roundsResult.value;
	} else {
		errors.push(roundsResult.reason);
	}

	if (ageCategoriesResult.status === 'fulfilled') {
		ageCategories = ageCategoriesResult.value;
	} else {
		errors.push(ageCategoriesResult.reason);
	}

	if (genderCategoriesResult.status === 'fulfilled') {
		genderCategories = genderCategoriesResult.value;
	} else {
		errors.push(genderCategoriesResult.reason);
	}

	loadErrorStore.set(errors);
	return {
		competition,
		rounds,
		ageCategories,
		genderCategories
	};
}) satisfies PageLoad;
