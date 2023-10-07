import { databases } from '$lib/appwrite';
import { user } from '$lib/stores/user.store.js';
import { Query } from 'appwrite';

export async function load({ params }) {
	let document = undefined;
	let error = [];
	let isRegistered = false;

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
	try {
		const userId = user.getValue()?.account.$id;

		if (userId) {
			document = await databases.listDocuments('652128d14c078883668a', '65213e03b1f3ab84700f', [
				Query.equal('competition', params.id),
				Query.equal('userId', userId)
			]);

			console.log(document);

			if (document.total !== 0) {
				isRegistered = true;
			}
		}
	} catch (err) {
		error.push(err);
	}

	return {
		competition: document,
		error,
		isRegistered
	};
}
