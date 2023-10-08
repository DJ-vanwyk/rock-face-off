import { databases, db } from '$lib/appwrite';
import { Query } from 'appwrite';
import type { PageLoad } from './$types';
import { loadErrorStore } from '$lib/stores/loadErrors.store';

export const load = (async ({ params }) => {
	loadErrorStore.set([]);
	const errors: any[] = [];

	let round;
	let competition;
	let score;

	const [roundResult, scoreResult, compResult] = await Promise.allSettled([
		databases.getDocument(db, 'competition_rounds', params.roundId),
		databases.listDocuments(db, 'competition_scores', [
			Query.equal('roundId', params.roundId),
			Query.equal('participantId', params.participantId)
		]),
		databases.getDocument(db, 'competitions', params.id)
	]);

	if (roundResult.status === 'fulfilled') {
		round = roundResult.value;
	} else {
		errors.push(roundResult.reason);
	}

	if (scoreResult.status === 'fulfilled') {
		score = scoreResult.value;
	} else {
		errors.push(scoreResult.reason);
	}

	if (compResult.status === 'fulfilled') {
		competition = compResult.value;
	} else {
		errors.push(compResult.reason);
	}

	loadErrorStore.set(errors);

	return {
		round,
		score,
		competition
	};
}) satisfies PageLoad;
