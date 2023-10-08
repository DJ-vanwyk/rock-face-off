import { Account, Client, Databases, Teams } from 'appwrite';

export const client = new Client();
export const databases = new Databases(client);
export const account = new Account(client);
export const teams = new Teams(client);

export const db = 'rock_face_off';

client.setEndpoint('https://appwrite.djjvanwyk.co.za/v1').setProject('652083a87caad5d4d4f3');
