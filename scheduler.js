import express from 'express';
import cron from 'node-cron';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrape } from './scraper.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Start the Scraper Schedule (Runs every day at 3:00 AM)
console.log('GovWatch Scheduler Initiated: 03:00 AM Daily');
cron.schedule('0 3 * * *', () => {
  console.log('Running scheduled scrape job...');
  scrape();
});

// 2. Serve the Data File (Make data.json accessible to the frontend)
// We look for the file in the public folder one level up
app.use(express.static(path.join(__dirname, '../public')));

// 3. Serve the Frontend Website (The React App)
// We serve the 'dist' folder where the built website lives
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React Routing (Send all other requests to index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// 4. Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Run scraping once on startup so the site isn't empty
  console.log('Running initial scrape...');
  scrape();
});
