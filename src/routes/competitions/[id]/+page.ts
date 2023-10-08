import { databases, db } from '$lib/appwrite';
import { Query } from 'appwrite';

export async function load({ params }) {
	let competition = undefined;
	let rounds;
	let error = [];

	// Get Competition

	const [compResult, roundsResult] = await Promise.allSettled([
		databases.getDocument(db, 'competitions', params.id),

		databases.listDocuments(db, 'competition_rounds', [Query.equal('competitionId', params.id)])
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
