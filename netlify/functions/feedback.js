import { google } from 'googleapis';

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, rating, feedback, resumeId } = data;

    const CLIENT_EMAIL = "resumebuilder1@core-respect-466222-q6.iam.gserviceaccount.com";
    
    // FIX: Use Template Literal to preserve newlines exactly as required by PEM format
    const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLOv5nhW8fPZBu
ybLj/JKEc5y8YzSmwD2oHOPWTobbERQxgoOHZvXRJHTcVuClfLdQiF3oVphBqyDP
1+Yj/TqP+zvtM/ha9+gCl4w73gZpHdmH+pmoFG90mD7/Se+mYWnFuK/c2AV17L0N
gWu47Q457hEDHZotrFB56z2YJXcdOjsnDZyYsIEzj82P4voj2tRsbIaWdCW8IUzI
A1yPOuc5DddZLqIKCtDtiz9IFIDlAUNMAgE71bkjdSCepBp55X+QH9bq3FTDS7fS
pd+NM8RoePtGqdZHLD8tc+/W5oau0GsDOMdp4mq/b5M0dJxLrs4MHBVzSbwXF4/3
D7+0PiZZAgMBAAECggEAJb+ec4IQYuAfjMSAKuLGID4NNdzDcdmxWiGLnEnXuKcS
diPE5IiWTjOUVTz52yMwNZAuyTIUc9YicRisEbE+iHHk7qlBjzwO5zRZAuG5lRrL
RfuhQNwS27hPs0F7dw8PA3/LgpzJXt8LOo/4f0/g3Ze/pzF/as5f4FV2imUjG9VZ
MejvCEfE/KaY9xfHMPKBWqXH8jRHzUrU7oiWAq8r5MEqoCcFyG9aYUbhavrbSqsc
yvKo/sEfWkRjdngU2mpdaxf6WOmHy68sUrNwaGcZT8opr0mELWeAjC21R+KMKWs4
us2Mv85zt0kLEoXUToWlenXTdivLofpXAWc2u7jRVQKBgQDy+zEQ4MWlLfDWkafx
PZIJtEv6pUVkTwaqjczM3hon69OOeCsSPaNNDf/ZXfcx58KEfgMw2rBGblZA3GFB
sQK3j2PykGrsp8tbOIEJCBwlHF4+uBRVvN9HIcPACo2xIJAAewYvVWZ3u+xXhQwF
jD0n/rgrEhF4NeoBXvcf7+PG+wKBgQDWHpFX2oQkgQjcFLz+v21QnW/hg5xdVOfy
Qq1piZvC8QJbhqeeh+1lnl3abKnz1WJsfcxCOl09IrFwWBbodnbQ45Ps6jUpU/Jt
2Xh+XWXRf6Osxl9sgAtwo6WOjDAI5Bawb4tfKjmhVpDVBm7xjHJieu4QccPeDm93
QY1xlg3XuwKBgQCSimYUHMt2jFd0wNG9j3mU+rTcDHLmRTbrA6whXk3+B59GjDjF
voDPRwMnsCEWawUIbQs1mp63S3IfmgnZ2Yye8g7AStMBuUzOziwcK1T2GL7KKrCw
6MDsIHPzTSoZSl8uuwOG5oVu7tpiCi6u5d44Ucn2x+XbTwC7JO/7xezkowKBgQDL
k4iQxNu6cUxhIv6GHq7qZKWI/j7epelZdne1zfXgJJEfQCmCGq5lXWrST1pO0GSh
zgE0PpWDmManj7lID8nr1VRBfnRI9N2b/5YGXvp9cyPFE16KpDs8PvsbSsIo0eOY
oJUcR+M/ODS/tTwqQGRIqaRK0j9tkr/73MGEayyCHQKBgGi7P+8mI9MnS2ikf8Cm
db1FzKeUEWwIzq4HSdfkXwYpRqOo3TF6oGnII+eMJDTQJVoxULWE7198tISO3SBE
eRHr0ZIJ5pDcGcAJn7Xf8k+/ZxxdaW/j47UORLDVH9ExoqIjiveg1cS13eQKNgjY
HJ5VUT3ZptZvmP4YHMq3phD1
-----END PRIVATE KEY-----`;

    // Use GoogleAuth with credentials object (Most robust method)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    // Prepare row data
    const row = [
      new Date().toISOString(),
      name,
      email,
      rating,
      feedback,
      resumeId || 'N/A'
    ];

    // Append to Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: '188uD1LVwEI8SgpDju7H4-2TzFJIShuPk_ODjzeNIQSU',
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Feedback submitted successfully' }),
    };

  } catch (error) {
    console.error('Feedback Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to submit feedback', 
        details: error.message || error.toString() 
      }),
    };
  }
};
