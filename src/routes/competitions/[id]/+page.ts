import { databases } from '$lib/appwrite';

export async function load({ params }) {
	let document = undefined;
	let error = [];

	// Get Competition
	try {
		document = await databases.getDocument(
			'652128d14c078883668a',
			'652128f4e9f8b22fefbe',
			params.id
		);
	} catch (err) {
		error.push(err);
	}

	// Get User Entry

	return {
		competition: document,
		error
	};
}
