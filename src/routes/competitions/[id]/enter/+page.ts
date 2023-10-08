import { databases } from '$lib/appwrite.js';
import { loadErrorStore } from '$lib/stores/loadErrors.store.js';
import { Query, type Models } from 'appwrite';

export async function load({ params }) {
	const errors: any[] = [];
	loadErrorStore.set([]);

	const [ageCategoriesResults, genderCategoriesResults] = await Promise.allSettled([
		databases.listDocuments('652128d14c078883668a', '65213e43be9d7c4c9c7b', [
			Query.equal('competition', params.id),
			Query.orderAsc('order')
		]),
		databases.listDocuments('652128d14c078883668a', '65213e81a6d20b49d5c6')
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
