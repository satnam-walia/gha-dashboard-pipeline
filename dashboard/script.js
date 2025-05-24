import Papa from 'papaparse';

//rouler http-server sur le dossier docs
//voir si il y a moyen dajouter react
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('upload');
  const output = document.getElementById('output');
  //parsed csv data
  let data = []

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        data = results.data;
        renderTable(data);
      },
      error: (err) => {
        output.innerHTML = `<p style="color:red">Parsing csv failed: ${err.message}</p>`;
      }
    });
  });

  //test function to show file content
  //styling not done
  function renderTable(data) {
    if (!data.length) {
      output.innerHTML = '<p>No data found</p>';
      return;
    }
    //prints in console to make sure data is valid
    console.log(data);
    const headers = Object.keys(data[0]);
    let html = '<table><thead><tr>';
    html += headers.map(property => `<th>${property}</th>`).join('');
    html += '</tr></thead><tbody>';
    html += data.map(row => {
      return '<tr>' + headers.map(property => `<td>${row[property] || ''}</td>`).join('') + '</tr>';
    }).join('');
    html += '</tbody></table>';

    output.innerHTML = html;
  }
});
