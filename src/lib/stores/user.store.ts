import { account } from '$lib/appwrite';
import { Account, AppwriteException, ID } from 'appwrite';
import type { Models } from 'appwrite';
import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

export const userStore = writable<User | null>(null);

interface AppwriteUser {
	account: Models.User<Models.Preferences>;
	session: Models.Session;
}

function createUser() {
	const user = writable<AppwriteUser | null>(null);

	async function init() {
		const restoredAccount = await account.get();
		const restoredSession = await account.getSession('current');

		user.set({
			account: restoredAccount,
			session: restoredSession
		});
	}

	init();

	async function login(email: string, password: string) {
		try {
			const newSession = await account.createEmailSession(email, password);
			const loggedInUser = await account.get();

			user.set({
				account: loggedInUser,
				session: newSession
			});

			return null;
		} catch (error) {
			if (error instanceof AppwriteException) {
				const appwriteError = error as AppwriteException;
				return appwriteError.message;
			} else {
				console.log(error);
				return 'App Error occurred';
			}
		}
	}

	async function singUp(
		email: string,
		password: string,
		name: string = ''
	): Promise<null | string> {
		try {
			// Create user
			const newUser = await account.create(ID.unique(), email, password, name);
			// Get Session
			// const newSession = await account.getSession('current');
			// session.set(newSession);
			return null;
		} catch (error) {
			if (error instanceof AppwriteException) {
				const appwriteError = error as AppwriteException;
				console.log(appwriteError.message);

				return appwriteError.message;
			} else {
				console.log('Signup Error:', error);
				return 'App Error occurred';
			}
		}
	}

	async function logout() {
		await account.deleteSession('current');
		user.set(null);
	}

	return {
		...user,
		login,
		singUp,
		logout
	};
}

export const user = createUser();
