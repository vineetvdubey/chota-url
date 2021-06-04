const { nanoid } = require('nanoid');

const urlsStore = {
  '9009l3': 'https://www.google.com',
  '4m4z0n': 'https://www.amazon.in',
};

//TODO: Move configurable values to properties file
const redirectPrefix = 'http://localhost:3000';
const shortUrlIdSize = 8;

const resObject = (shortUrl, longUrl) => {
  return {
    shortUrl: shortUrl,
    longUrl: longUrl,
  };
};

const getShortUrl = (shortUrlId) => {
  return `${redirectPrefix}/${shortUrlId}`;
};

const getLongUrl = (shortUrlId) => {
  return urlsStore[shortUrlId];
};

const createShortUrl = (longUrl) => {
  const shortUrlId = nanoid(shortUrlIdSize);
  urlsStore[shortUrlId] = longUrl;
  return resObject(getShortUrl(shortUrlId), longUrl);
};

module.exports = { urlsStore, resObject, getShortUrl, getLongUrl, createShortUrl };
