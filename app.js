const express = require('express');
const app = express();
const config = require('./config.json');
const port = process.env.PORT || config['server.port'];
const urlsManager = require('./urls/urlsManager');

app.use(express.static('public'));
app.use(express.json());

app.use('/urls', require('./urls/urls'));

app.get('/:shortUrlId', (req, res) => {
  const shortUrlId = req.params.shortUrlId;
  const longUrl = urlsManager.getLongUrl(shortUrlId);
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send({
      error: `No URL mapped for id: ${shortUrlId}`,
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
  console.log('Started chota-url service');
});
