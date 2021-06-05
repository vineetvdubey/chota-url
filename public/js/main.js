window.onload = () => {
  const apiHost = window.location.origin;

  const longUrlInput = document.querySelector('#long-url');
  const shortenUrlButton = document.querySelector('#shorten');
  const shortUrlOutput = document.querySelector('#short-url');
  const resultDiv = document.querySelector('#result');
  let allowCopyResult = false;

  const isUrlValid = (url) => {
    const tempUrl = url.trim();
    const nonEmpty = tempUrl.length > 0;
    const containsSpace = tempUrl.includes(' ');
    const containsPeriod = tempUrl.includes('.');
    return nonEmpty && containsPeriod && !containsSpace;
  };

  /**
   * @returns Promise
   */
  const postNewUrl = (longUrl) =>
    fetch(`${apiHost}/urls`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        longUrl: longUrl,
      }),
    });

  const updateResult = (msg) => {
    shortUrlOutput.value = msg;
    resultDiv.classList.remove('hidden');
  };

  const hideResult = () => {
    disableCopy();
    shortUrlOutput.value = '';
    resultDiv.classList.add('hidden');
  };

  const enableCopy = () => {
    allowCopyResult = true;
  };

  const disableCopy = () => {
    allowCopyResult = false;
  };

  const showCopiedMessage = () => {
    const copiedAlert = document.querySelector('.copy-style');
    copiedAlert.innerHTML = 'Copied!';
    copiedAlert.style.display = 'block';
    setTimeout(() => {
      copiedAlert.innerHTML = '';
      copiedAlert.style.display = 'none';
    }, 1500);
  };

  const shortenUrl = (longUrl) => {
    shortenUrlButton.disabled = true;
    if (isUrlValid(longUrl)) {
      let longUrlTemp = longUrl;
      if (!longUrlTemp.startsWith('http')) {
        longUrlTemp = `https://${longUrlTemp}`;
      }
      postNewUrl(longUrlTemp)
        .then((res) => res.json())
        .then((json) => {
          updateResult(json.shortUrl);
          enableCopy();
          shortenUrlButton.disabled = false;
        })
        .catch(() => updateResult('Unexpected Error - Please try again later.'));
    } else {
      updateResult('Invalid URL. Please try again.');
      shortenUrlButton.disabled = false;
    }
  };

  longUrlInput.addEventListener('keyup', (event) => {
    hideResult();
    if (event.target.value.length > 0) {
      shortenUrlButton.disabled = false;
    } else {
      shortenUrlButton.disabled = true;
    }
  });

  shortenUrlButton.addEventListener('click', () => {
    shortenUrl(longUrlInput.value);
  });

  resultDiv.addEventListener('click', () => {
    if (allowCopyResult) {
      shortUrlOutput.select();
      document.execCommand('copy');
      showCopiedMessage();
    }
  });
};
