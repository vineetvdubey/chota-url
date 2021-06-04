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
        shortUrlOutput.innerHTML = json.shortUrl;
        shortenUrlButton.disabled = false;
      });
  };

  longUrlInput.addEventListener('keyup', (event, x) => {
    shortUrlOutput.innerHTML = '';
    if (event.target.value.length > 0) {
      shortenUrlButton.disabled = false;
    } else {
      shortenUrlButton.disabled = true;
    }
  });

  shortenUrlButton.addEventListener('click', () => {
    shortenUrlButton.disabled = true;
    let inputLongUrl = longUrlInput.value;
    if (!inputLongUrl.startsWith('http')) {
      inputLongUrl = `https://${inputLongUrl}`;
    }
    shortenUrl(inputLongUrl);
  });
};
