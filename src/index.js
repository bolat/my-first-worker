/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const APIkey = await env.GOOGLE_SERVICE_ACCOUNT_KEY.get();
		return new Response('Hello World!');
	},
};

// export default {
//   async fetch(request, env) {
//     // Example of using the secret safely in an API request
//     const response = await fetch("https://api.example.com/data", {
//       headers: { "Authorization": `Bearer ${APIkey}` },
//     });
//     if (!response.ok) {
//       return new Response("Failed to fetch data", { status: response.status });
//     }
//     const data = await response.json();
//     return new Response(JSON.stringify(data), {
//       headers: { "Content-Type": "application/json" },
//     });
//   },
// };
