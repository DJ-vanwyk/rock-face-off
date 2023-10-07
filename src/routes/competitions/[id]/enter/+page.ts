import { databases } from '$lib/appwrite.js';
import { Query } from 'appwrite';

export async function load({ params }) {
	const ageCategories = await databases.listDocuments(
		'652128d14c078883668a',
		'65213e43be9d7c4c9c7b',
		[Query.equal('competition', params.id), Query.orderAsc('order')]
	);

	const genderCategories = await databases.listDocuments(
		'652128d14c078883668a',
		'65213e81a6d20b49d5c6'
	);

	return {
		id: params.id,
		ageCategories: ageCategories.documents,
		genderCategories: genderCategories.documents
	};
}
