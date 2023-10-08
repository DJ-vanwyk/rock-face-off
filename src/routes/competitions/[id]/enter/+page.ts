import { databases, db } from '$lib/appwrite.js';
import { loadErrorStore } from '$lib/stores/loadErrors.store.js';
import { Query, type Models } from 'appwrite';

export async function load({ params }) {
	const errors: any[] = [];
	loadErrorStore.set([]);

	const [ageCategoriesResults, genderCategoriesResults] = await Promise.allSettled([
		databases.listDocuments(db, 'competition_age_categories', [
			Query.equal('competitionId', params.id),
			Query.orderAsc('order')
		]),
		databases.listDocuments(db, 'competition_gender_categories')
	]);

	let ageCategories: Models.Document[] = [];
	let genderCategories: Models.Document[] = [];

	if (ageCategoriesResults.status == 'fulfilled') {
		ageCategories = ageCategoriesResults.value.documents;
	} else {
		errors.push(ageCategoriesResults.reason);
	}

	if (genderCategoriesResults.status == 'fulfilled') {
		genderCategories = genderCategoriesResults.value.documents;
	} else {
		errors.push(genderCategoriesResults.reason);
	}

	loadErrorStore.set(errors);

	return {
		id: params.id,
		ageCategories,
		genderCategories,
		errors
	};
}
