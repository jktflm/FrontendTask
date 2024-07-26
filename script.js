const apiUrl = 'https://cors-anywhere.herokuapp.com/https://bored-api.appbrewery.com/random';
const fetchCount = 15;
const data = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    document.getElementById('download-json').addEventListener('click', () => downloadFile('json'));
    document.getElementById('download-csv').addEventListener('click', () => downloadFile('csv'));
    document.getElementById('print-console').addEventListener('click', printToConsole);
});

async function fetchData() {
    const requests = Array.from({ length: fetchCount }, () => fetch(apiUrl).then(response => response.json()));
    try {
        const results = await Promise.all(requests);
        results.forEach(result => data.push(result));
        displayData();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData() {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = data.map(item => `
        <tr>
            <td>${item.activity}</td>
            <td>${item.type}</td>
            <td>${item.participants}</td>
            <td>${item.price}</td>
            <td>${item.accessibility}</td>
            <td>${item.duration}</td>
            <td>${item.kidFriendly ? 'Yes' : 'No'}</td>
            <td><a href="${item.link}" target="_blank">${item.link ? item.link : 'N/A'}</a></td>
            <td>${item.key}</td>
        </tr>
    `).join('');
}

function downloadFile(format) {
    let fileContent = '';
    const header = 'Activity,Type,Participants,Price,Link\n';
    
    if (format === 'json') {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
    } else if (format === 'csv') {
        fileContent = data.map(item => 
            `${item.activity},${item.type},${item.participants},${item.price},${item.link}`
        ).join('\n');
        const blob = new Blob([header + fileContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
}

function printToConsole() {
    console.log(data);
}
