import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	// Initial Data
	const respArr = await Promise.all([
		databases.listDocuments('652128d14c078883668a', '65213d72bf27fad7aa36', [
			Query.equal('competition', params.id),
			Query.orderAsc('order')
		]),

		databases.getDocument('652128d14c078883668a', '652128f4e9f8b22fefbe', params.id),
		databases.getDocument('652128d14c078883668a', '65213e03b1f3ab84700f', params.participantId)
	]);

	const rounds = respArr[0];
	const competition = respArr[1];
	const participant = respArr[2];

	// Fetches Participant data
	const respArr2 = await Promise.all([
		databases.getDocument('652128d14c078883668a', '65213e43be9d7c4c9c7b', participant.ageCategory),
		databases.getDocument(
			'652128d14c078883668a',
			'65213e81a6d20b49d5c6',
			participant.genderCategory
		)
	]);

	const ageCategory = respArr2[0];
	const genderCategory = respArr2[1];

	// Merge Rounds and scores
	const newRounds: any[] = await Promise.all(
		rounds.documents.map(async (round) => ({
			...round,
			score:
				(
					await databases.listDocuments('652128d14c078883668a', '65213f2b9b700d69e385', [
						Query.equal('participant', params.participantId),
						Query.equal('round', round.$id)
					])
				).documents[0] ?? null
		}))
	);

	return {
		participantId: params.participantId,
		rounds: newRounds,
		competition,
		participant,
		genderCategory,
		ageCategory
		// participantRounds: participantRounds.documents
	};
}) satisfies PageLoad;
