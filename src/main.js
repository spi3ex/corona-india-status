const axios = require('axios').default;
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// this is a legit government site to get status
const sourceSiteURL = 'https://www.mohfw.gov.in/';

// we don't handle the error intensionally for easy debugging in production 

console.log(`fetching the site from: ${sourceSiteURL}`);

axios.get(sourceSiteURL)
.then(res => res.data)
.then(data => {
  const $ = cheerio.load(data);
  const scrapedData = {};
  const lastUpdated = new Date().toString();
  
  const rows = $('table > tbody > tr');
  
  for(let i = 1; i < rows.length - 1; i++) {
    const tds = $('td', rows[i]).toArray();

    // lil clensing
    const state = $(tds[1]).text().trim().replace(/'/g, '');
    const totalIndianCases = parseInt($(tds[2]).text());
    const totalForeignCases = parseInt($(tds[3]).text());
    const totalRecovered = parseInt($(tds[4]).text());
    const totalDeaths = parseInt($(tds[5]).text());

    scrapedData[state] = {
      totalIndianCases,
      totalForeignCases,
      totalRecovered,
      totalDeaths
    }
  }

  const filePath = path.resolve(process.cwd(), 'docs', 'covid19-indian-states.json');

  console.log(`writting JSON to ${filePath}`);
  fs.writeFileSync(filePath, JSON.stringify({
    data: scrapedData,
    lastUpdated
  }, ' ', 2));
  console.log('Done!');
});

