import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';

export async function load({ params }) {
	let competition = undefined;
	let rounds;
	let error = [];

	// Get Competition

	const [compResult, roundsResult] = await Promise.allSettled([
		databases.getDocument('652128d14c078883668a', '652128f4e9f8b22fefbe', params.id),

		databases.listDocuments('652128d14c078883668a', '65213d72bf27fad7aa36', [
			Query.equal('competition', params.id)
		])
	]);

	if (compResult.status === 'fulfilled') {
		competition = compResult.value;
	} else {
		console.log(compResult.reason);
		error.push(compResult.reason);
	}

	if (roundsResult.status === 'fulfilled') {
		rounds = roundsResult.value;
	} else {
		console.log(roundsResult.reason);
		error.push(roundsResult.reason);
	}

	// Get User Entry

	return {
		competition: competition,
		rounds,
		error
	};
}
