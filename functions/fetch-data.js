const axios = require('axios');

const airtableToken = 'Bearer patX200VGkvIdjhvl.85e8e525a33b49ef814bfbfc0c0af14631faf88b39fd566a99a5c3de203a181a';

exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    const { url } = JSON.parse(event.body);  // URL received from the client

    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL is required' }),
      };
    }

    try {
      const response = await axios.get(url, {
        headers: { Authorization: airtableToken },
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, data: response.data }),
      };
    } catch (error) {
      console.error('Error fetching data from Airtable:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch data' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method Not Allowed' }),
  };
};
