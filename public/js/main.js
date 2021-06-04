window.onload = () => {
  const apiHost = window.location.origin;

  const longUrlInput = document.querySelector('#long-url');
  const shortenUrlButton = document.querySelector('#shorten');
  const shortUrlOutput = document.querySelector('#short-url');

  const shortenUrl = (longUrl) => {
    fetch(`${apiHost}/urls`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        longUrl: longUrl,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        shortUrlOutput.value = json.shortUrl;
      });
  };

  shortenUrlButton.addEventListener('click', () => {
    let inputLongUrl = longUrlInput.value;
    if (!inputLongUrl.startsWith('http')) {
      inputLongUrl = `https://${inputLongUrl}`;
    }
    shortenUrl(inputLongUrl);
  });
};
