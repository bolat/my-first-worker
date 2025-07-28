import { env } from 'cloudflare:workers';

// src/index.js
// This is a Cloudflare Worker that uses an environment variable for a Google Service Account key.
export default {
	async fetch(request, env, ctx) {
		const APIkey = await env.GOOGLE_SERVICE_ACCOUNT_KEY.get();
		// Example of using the secret safely in an API request
		return new Response('Hello Worker!' + APIkey);
	},
};
