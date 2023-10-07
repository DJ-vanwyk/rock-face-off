import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const rounds = await databases.listDocuments('652128d14c078883668a', '65213d72bf27fad7aa36', [
		Query.equal('competition', params.id),
		Query.orderAsc('order')
	]);

	const participantRounds = await databases.listDocuments(
		'652128d14c078883668a',
		'65213f2b9b700d69e385',
		[Query.equal('participant', params.participantId)]
	);

	const competition = await databases.getDocument(
		'652128d14c078883668a',
		'652128f4e9f8b22fefbe',
		params.id
	);

	const participant = await databases.getDocument(
		'652128d14c078883668a',
		'65213e03b1f3ab84700f',
		params.participantId
	);

	const ageCategory = await databases.getDocument(
		'652128d14c078883668a',
		'65213e43be9d7c4c9c7b',
		participant.ageCategory
	);
	const genderCategory = await databases.getDocument(
		'652128d14c078883668a',
		'65213e81a6d20b49d5c6',
		participant.genderCategory
	);

	rounds.documents = rounds.documents.map((round) => ({
		...round,
		score: null
	}));

	participantRounds.documents.forEach((doc) => {
		const index = rounds.documents.findIndex((round) => round.$id == doc.round);
		if (index >= 0) {
			rounds.documents[index]['score'] = doc;
		}
	});

	return {
		participantId: params.participantId,
		rounds: rounds.documents,
		competition,
		participant,
		genderCategory,
		ageCategory
		// participantRounds: participantRounds.documents
	};
}) satisfies PageLoad;
