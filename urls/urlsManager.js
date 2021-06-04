const config = require('../config.json');

const { nanoid } = require('nanoid');

const urlsStore = {
  '7r2RFMa4e': 'https://workat.tech/backend-development/tutorial/designing-apis-basics-l64bq1id8gew',
  '4zmd_3mdT': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects',
  '1bTAkrd2_': 'https://confluence.atlassian.com/bitbucketserver/markdown-syntax-guide-776639995.html',
};

//TODO: Move configurable values to properties file
const hostAddress = config['server.address'];
const shortUrlIdSize = 8;

const resObject = (shortUrl, longUrl) => {
  return {
    shortUrl: shortUrl,
    longUrl: longUrl,
  };
};

const getAllUrls = () => {
  return Object.keys(urlsStore).map((key) => {
    return { shortUrlId: key, ...resObject(getShortUrl(key), urlsStore[key]) };
  });
};

const getShortUrl = (shortUrlId) => {
  return `${hostAddress}/${shortUrlId}`;
};

const getLongUrl = (shortUrlId) => {
  return urlsStore[shortUrlId];
};

const createShortUrl = (longUrl) => {
  const shortUrlId = nanoid(shortUrlIdSize);
  urlsStore[shortUrlId] = longUrl;
  return resObject(getShortUrl(shortUrlId), longUrl);
};

module.exports = { getAllUrls, resObject, getShortUrl, getLongUrl, createShortUrl };
