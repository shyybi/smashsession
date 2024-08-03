const axios = require('axios');
const express = require('express');
const router = express.Router();
require('dotenv').config();

const client_secret = process.env.CLIENT_SECRET;
const client_id = "1267839474046603265";
const redirect_uri = "http://localhost:3000/callback";

router.get('/discord', (req, res) => {
  const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=1267839474046603265&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=identify+connections`;
  res.redirect(discordAuthUrl);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('No code provided');
  }

  try {
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
      client_id,
      client_secret,
      grant_type: 'client_credentials',
      scope: 'identify connections',
      code,
      redirect_uri,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json(userResponse.data);
  } catch (error) {
    console.error('Error during OAuth process:', error.response ? error.response.data : error.message);
    res.status(500).send('An error occurred during the OAuth process');
  }
});

module.exports = router;