window.onload = () => {
  const apiHost = window.location.origin;

  const getAllUrls = () => {
    fetch(`${apiHost}/urls`)
      .then((res) => res.json())
      .then((json) => createTable(json));
  };

  const createTable = (jsonObj) => {
    const table = document.createElement('table');
    document.querySelector('#table-div').appendChild(table);

    const header = table.createTHead();
    const thead = header.insertRow();
    thead.insertCell().innerText = 'Original Long URL';
    thead.insertCell().innerText = 'Shortened URL';

    const tbody = table.createTBody();
    jsonObj
      .reverse()
      .slice(0, 5)
      .forEach((entry) => {
        const tr = tbody.insertRow();
        tr.insertCell().innerHTML = `<a href="${entry['longUrl']}" target="_blank">${entry['longUrl']}</a>`;
        tr.insertCell().innerHTML = `<a href="${entry['shortUrl']}" target="_blank">${entry['shortUrl']}</a>`;
      });
  };

  getAllUrls();
};
