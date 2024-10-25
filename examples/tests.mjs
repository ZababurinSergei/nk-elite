// async function postData(url = "", data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: "GET", // *GET, POST, PUT, DELETE, etc.
//         mode: "cors", // no-cors, *cors, same-origin
//         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: "same-origin", // include, *same-origin, omit
//         redirect: "follow", // manual, *follow, error
//         referrerPolicy: "no-referrer", // no-referrer, *client
//     });
//
//     return await response.text(); // parses JSON response into native JavaScript objects
// }
//
// postData("http://192.168.169.1/", { answer: 42 }).then((data) => {
//     console.log(data); // JSON data parsed by `response.json()` call
// });


import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('http://192.168.169.1/');

// Set screen size.
await page.setViewport({width: 1080, height: 1024});

// Type into search box.
// await page.locator('.devsite-search-field').fill('automate beyond recorder');

// Wait and click on first result.
// await page.locator('.devsite-result-item-link').click();

// Locate the full title with a unique string.
// const textSelector = await page
//     .locator('text/Customize and automate')
//     .waitHandle();
// const fullTitle = await textSelector?.evaluate(el => el.textContent);

// Print the full title.
// console.log('The title of this blog post is "%s".', fullTitle);

// await browser.close();
