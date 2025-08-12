import fetch from 'node-fetch';
import csvtojson from 'csvtojson';

export default async function handler(req, res) {
  const SHEET_ID = '1sRDicyAgsVelztvyX-V-oEsrU4R1ijkK4JWJt5qtrtA';
  const SHEET_NAME = 'Master';

  try {
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;
    const response = await fetch(sheetUrl);
    if (!response.ok) throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    const csvData = await response.text();
    const jsonArray = await csvtojson().fromString(csvData);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(jsonArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
