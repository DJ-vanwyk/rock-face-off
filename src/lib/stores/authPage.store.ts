import { writable } from 'svelte/store';

export type AuthPages = 'login' | 'signup' | 'app' | 'signUpSuccess';

export const authPageStore = writable<AuthPages>('app');
