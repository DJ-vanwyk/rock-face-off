import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const competition = await databases.getDocument(
		'652128d14c078883668a',
		'652128f4e9f8b22fefbe',
		params.id
	);

	const rounds = await databases.listDocuments('652128d14c078883668a', '65213d72bf27fad7aa36', [
		Query.equal('competition', params.id),
		Query.orderAsc('order')
	]);

	const ageCategories = await databases.listDocuments(
		'652128d14c078883668a',
		'65213e43be9d7c4c9c7b',
		[Query.equal('competition', params.id), Query.orderAsc('order')]
	);

	const genderCategories = await databases.listDocuments(
		'652128d14c078883668a',
		'65213e81a6d20b49d5c6',
		[]
	);

	return {
		competition,
		rounds,
		ageCategories,
		genderCategories
	};
}) satisfies PageLoad;
