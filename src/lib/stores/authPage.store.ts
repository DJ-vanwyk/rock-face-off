import { writable } from 'svelte/store';

export type AuthPages = 'login' | 'signup' | 'app';

export const authPageStore = writable<AuthPages>('app');
