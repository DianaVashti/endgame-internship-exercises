const cheerio = require('cheerio');
const request = require('request');
const n = process.argv[3];
let htmlLoad;

async function loadHTML() {
  let promise = new Promise((resolve, reject) => request(process.argv[2], (error, response, body) => resolve(body)));
  const result = await promise;
  htmlLoad = result;
  return;
}

loadHTML().then(() => {
  const $ = cheerio.load(htmlLoad);
  let wordsArray = $('*').text().split(' ');
  let wordCount = wordsArray.reduce((acc, i) => {
    acc[i.toLowerCase()] = acc[i.toLowerCase()] ? acc[i.toLowerCase()] = acc[i.toLowerCase()] + 1 : 1;
    return acc;
  }, {});
  let sortableArray = [];
  for (let key in wordCount) if(key.length !== 0) sortableArray.push([key, wordCount[key]]);
  sortableArray.sort((a,b) => b[1] - a[1]).slice(0, n).map(i => {

    console.log(i[0].padEnd(15), "|", i[1].toString().padStart(15))
  });
})
