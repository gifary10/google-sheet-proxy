import express from 'express';
import fetch from 'node-fetch';
import csvtojson from 'csvtojson';

const app = express();
const PORT = process.env.PORT || 3000;

const SHEET_ID = '1sRDicyAgsVelztvyX-V-oEsrU4R1ijkK4JWJt5qtrtA';
const SHEET_NAME = 'Master';

app.get('/sheet-data-json', async (req, res) => {
  try {
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;

    const response = await fetch(sheetUrl);
    if (!response.ok) throw new Error(`Failed to fetch sheet: ${response.statusText}`);

    const csvData = await response.text();

    // Convert CSV ke JSON array objek
    const jsonArray = await csvtojson().fromString(csvData);

    res.set('Access-Control-Allow-Origin', '*');
    res.json(jsonArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
