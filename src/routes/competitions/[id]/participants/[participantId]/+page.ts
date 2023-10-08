import { databases, db } from '$lib/appwrite';
import { Query } from 'appwrite';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	// Initial Data
	const respArr = await Promise.all([
		databases.listDocuments(db, 'competition_rounds', [
			Query.equal('competitionId', params.id),
			Query.orderAsc('order')
		]),

		databases.getDocument(db, 'competitions', params.id),
		databases.getDocument(db, 'competition_participants', params.participantId)
	]);

	const rounds = respArr[0];
	const competition = respArr[1];
	const participant = respArr[2];

	// Fetches Participant data
	const respArr2 = await Promise.all([
		databases.getDocument(db, 'competition_age_categories', participant.ageCategoryId),
		databases.getDocument(db, 'competition_gender_categories', participant.genderCategoryId)
	]);

	const ageCategory = respArr2[0];
	const genderCategory = respArr2[1];

	// Merge Rounds and scores
	const newRounds: any[] = await Promise.all(
		rounds.documents.map(async (round) => ({
			...round,
			score:
				(
					await databases.listDocuments(db, 'competition_scores', [
						Query.equal('participantId', params.participantId),
						Query.equal('roundId', round.$id)
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
