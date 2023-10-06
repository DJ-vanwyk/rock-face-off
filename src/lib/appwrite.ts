import { Account, Client, Databases } from 'appwrite';

export const client = new Client();
export const databases = new Databases(client);
export const account = new Account(client);

client.setEndpoint('https://appwrite.djjvanwyk.co.za/v1').setProject('652083a87caad5d4d4f3');

const unsubscribe = client.subscribe('account', (response) => {
	// Callback will be executed on changes for all files.
	console.log('account', response);
});