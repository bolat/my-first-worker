import { env } from 'cloudflare:workers';
import { google } from 'googleapis';

// Определите необходимые scopes для Google Calendar API
const GOOGLE_CALENDAR_SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
];

export default {
  async fetch(request, env, ctx) {
    const serviceAccountKeyString = await env.GOOGLE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKeyString) {
      return new Response('Google Service Account Key not found in environment variables.', { status: 500 });
    }

    let serviceAccountKey;
    try {
      serviceAccountKey = JSON.parse(serviceAccountKeyString);
    } catch (e) {
      console.error('Error parsing service account key:', e);
      return new Response('Invalid Google Service Account Key format.', { status: 500 });
    }

    try {
      // Создаем JWT клиент, который будет управлять аутентификацией
      const auth = new google.auth.JWT(
        serviceAccountKey.client_email,
        null, // keyFile - не используется, т.к. ключ уже загружен
        serviceAccountKey.private_key,
        GOOGLE_CALENDAR_SCOPES,
        null // subject - для делегирования на уровне домена, не нужно для обычного сервисного аккаунта
      );

      // Получаем access token (или авторизуемся)
      // Этот вызов выполнит создание JWT и запрос токена за вас
      await auth.authorize();

      // Теперь создаем клиент Google Calendar API
      const calendar = google.calendar({ version: 'v3', auth });

      // Выполняем запрос к API
      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });

      return new Response(JSON.stringify(response.data), {
        headers: { 'Content-Type': 'application/json' },
      });

    } catch (error) {
      console.error('Error in Worker:', error);
      return new Response(`Internal Server Error: ${error.message}`, { status: 500 });
    }
  },
};
