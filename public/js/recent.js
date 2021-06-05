window.onload = () => {
  const apiHost = window.location.origin;

  const getAllUrls = () => {
    fetch(`${apiHost}/urls`)
      .then((res) => res.json())
      .then((json) => createTable(json))
      .catch(() => tableErrorMessage());
  };

  const tableErrorMessage = () => {
    const para = document.createElement('p');
    document.querySelector('#table-div').appendChild(para);
    para.innerHTML = 'Server Error - Unable to fetch recent data.<br>Please try again later.'
  };

  const createTable = (jsonObj) => {
    const table = document.createElement('table');
    document.querySelector('#table-div').appendChild(table);
    const header = table.createTHead();
    const thead = header.insertRow();
    thead.insertCell().innerHTML = 'Original Long&nbsp;URL';
    thead.insertCell().innerHTML = 'Shortened URL';
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
