import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';

export async function load({ params }) {
	let document = undefined;
	let rounds;
	let error = [];

	// Get Competition
	try {
		document = await databases.getDocument(
			'652128d14c078883668a',
			'652128f4e9f8b22fefbe',
			params.id
		);

		rounds = await databases.listDocuments('652128d14c078883668a', '65213d72bf27fad7aa36', [
			Query.equal('competition', params.id)
		]);
	} catch (err) {
		error.push(err);
	}

	// Get User Entry

	return {
		competition: document,
		rounds,
		error
	};
}
