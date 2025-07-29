// import { env } from 'cloudflare:workers';
import { google } from 'googleapis';

// src/index.js
// This is a Cloudflare Worker that uses an environment variable for a Google Service Account key.
export default {
	async fetch(request, env, ctx) {
		const APIkey = await env.GOOGLE_SERVICE_ACCOUNT_KEY;
		// const serviceAccountKey = JSON.parse(APIkey);

		// const jwtClient = new google.auth.JWT(
		// 	serviceAccountKey.client_email,
		// 	undefined, // private key is not used directly here
		// 	serviceAccountKey.private_key,
		// 	['https://www.googleapis.com/auth/calendar.readonly']
		// );
		// const auth = new google.auth.GoogleAuth({
		// 	credentials: JSON.parse(APIkey),
		// 	scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
		// });
		return new Response('Hello Worker! ' + APIkey);
	},
};
