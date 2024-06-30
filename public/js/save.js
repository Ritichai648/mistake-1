function saveMistake() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const mistake = document.getElementById('mistake').value;
    const point = document.getElementById('point').value;
    const pay = document.getElementById('pay').value;

    let mistakes = JSON.parse(localStorage.getItem('mistakes')) || [];

    const newMistake = {
        date,
        time,
        mistake,
        point,
        pay
    };

    mistakes.push(newMistake);

    localStorage.setItem('mistakes', JSON.stringify(mistakes));

    showMistake();
}

function showMistake() {
    const mistakes = JSON.parse(localStorage.getItem('mistakes')) || [];

    if (mistakes.length === 0) {
        document.getElementById('mistake-list').innerHTML = '<p>ยังไม่มีข้อมูล</p>';
        return;
    }

    const mistakeList = document.createElement('div');
    mistakeList.id = 'mistake-list';

    // Iterate through each mistake and create list items
    mistakes.forEach(mistake => {
        const listItem = document.createElement('div');
        listItem.id = 'mistake-list';
        listItem.innerHTML = `
        <div id="data">${mistake.date}</div>
        <div id="data">${mistake.time}</div>
        <div id="data">${mistake.mistake}</div>
        <div id="data">${mistake.point}</div>
        <div id="data">${mistake.pay}</div>
      `;
        mistakeList.appendChild(listItem);
    });

    const existingList = document.getElementById('mistake-list');
    if (existingList) {
        existingList.parentNode.removeChild(existingList);
    }

    const container = document.getElementById('mistake-container');
    container.appendChild(mistakeList);
}

showMistake();
