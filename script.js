document.addEventListener("DOMContentLoaded", function() {
    const API_URL = "https://bored-api.appbrewery.com/random";
    const PROXY_URL = "https://api.allorigins.win/get?url=";
    const dataTableBody = document.querySelector("#data-table tbody");
    const jsonData = [];

    async function fetchData() {
        try {
            for (let i = 0; i < 15; i++) {
                const response = await fetch(PROXY_URL + encodeURIComponent(API_URL));
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const proxyData = await response.json();
                const data = JSON.parse(proxyData.contents);
                jsonData.push(data);
                appendDataToTable(data);
            }
        } catch (error) {
            console.error("Failed to fetch data: ", error);
            alert("Too many requests on the API, please try again later.");
        }
    }

    function appendDataToTable(data) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.activity}</td>
            <td>${data.type}</td>
            <td>${data.participants}</td>
            <td>${data.price}</td>
            <td>${data.link ? `<a href="${data.link}" target="_blank">Link</a>` : ""}</td>
            <td>${data.key}</td>
            <td>${data.accessibility}</td>
        `;
        dataTableBody.appendChild(row);
    }

    function downloadJSON() {
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function downloadCSV() {
        const csvData = jsonData.map(item => [
            item.activity,
            item.type,
            item.participants,
            item.price,
            item.link,
            item.key,
            item.accessibility
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + 
            ["Activity,Type,Participants,Price,Link,Key,Accessibility", ...csvData.map(e => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const a = document.createElement("a");
        a.href = encodedUri;
        a.download = "data.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function printToConsole() {
        console.log(jsonData);
    }


    document.getElementById("download-json").addEventListener("click", downloadJSON);
    document.getElementById("download-csv").addEventListener("click", downloadCSV);
    document.getElementById("print-console").addEventListener("click", printToConsole);

    fetchData();
});
