import { page } from '$app/stores';
import { readable } from 'svelte/store';

export const selectedComp = readable(null, (set) => {
	console.log('Init comp');
	let count = 1;

	const unsubscribe = page.subscribe(async ({ params }) => {
		console.log('Page Change', count);
		count++;
	});

	// 	async function getComp() {
	// 	if (history.state['competition']) {
	// 		return history.state['competition'];
	// 	} else {
	// 		return (await getDoc(doc(db, 'competitions', $page.params.id))).data();
	// 	}
	// }

	return unsubscribe;
});

page;
