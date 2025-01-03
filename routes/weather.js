const express = require('express');
const router = express.Router();
const { ensureSpotifyToken } = require('../middleware/spotifyToken');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi();

// 날씨 기반 노래 검색
router.get('/', ensureSpotifyToken, async (req, res) => {
  try {
    const weatherKeyword = 'sunny'; // 예제 키워드
    const data = await spotifyApi.searchTracks(weatherKeyword, { limit: 10 });
    res.json(data.body.tracks.items);
  } catch (error) {
    console.error('날씨 기반 노래 검색 실패:', error);
    res.status(500).send('날씨 기반 노래 검색 실패');
  }
});

module.exports = router;
