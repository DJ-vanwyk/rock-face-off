import { databases } from '$lib/appwrite';

export async function load({ params }) {
	let document = undefined;
	let error = undefined;

	try {
		document = await databases.getDocument(
			'652128d14c078883668a',
			'652128f4e9f8b22fefbe',
			params.id
		);
	} catch (error) {
		error = error;
	}

	return {
		competition: document,
		error
	};
}
