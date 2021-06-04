const express = require('express');
const router = express.Router();
const urlsManager = require('./urlsManager');

router.get('/', (req, res) => {
  res.send(urlsManager.getAllUrls());
});

router.get('/:shortUrlId', (req, res) => {
  const shortUrlId = req.params.shortUrlId;
  const longUrl = urlsManager.getLongUrl(shortUrlId);
  if (longUrl) {
    const shortUrl = urlsManager.getShortUrl(shortUrlId);
    res.send(urlsManager.resObject(shortUrl, longUrl));
  } else {
    res.status(404).send({
      error: `No URL mapped for id: ${shortUrlId}`,
    });
  }
});

router.post('/', (req, res) => {
  const { longUrl } = req.body;
  const result = urlsManager.createShortUrl(longUrl);
  res.send(result);
});

module.exports = router;
