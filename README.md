# API Data Fetcher

This project is a simple web application that fetches data from the [Bored API](https://bored-api.appbrewery.com/random) using a CORS proxy. It displays the fetched data in a table and provides buttons to download the data in JSON or CSV format, or print it to the console.

## Features

- Fetches data from the API 15 times.
- Displays the fetched data in a table.
- Provides buttons to:
  - Download the data as a JSON file.
  - Download the data as a CSV file.
  - Print the data to the browser console.

## Running the Project
1. User opens the web interface by opening `index.html` in a browser.
2. The frontend automatically fetches data from the API 15 times and displays it in a table.
3. The user can click on:
   - **Download JSON**: to download the data as a JSON file.
   - **Download CSV**: to download the data as a CSV file.
   - **Print to Console**: to print the data to the browser console.

---

## Project Structure

- `index.html`: The main HTML file.
- `styles.css`: The CSS file for styling the application.
- `script.js`: The JavaScript file containing the logic for fetching data, populating the table, and handling button clicks.



