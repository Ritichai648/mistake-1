const container = document.getElementById('mistake-list');
const dataElements = document.getElementById('data');

let dataText = '';
for (const element of dataElements) {
  dataText += element.textContent + ' ';
}

container.textContent = dataText.trim();