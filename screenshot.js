const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 375, height: 812});
  await page.goto('http://localhost:3000/projects/doppelganger', {waitUntil: 'networkidle2'});
  
  const header = await page.$('.detail-header');
  const headerBox = await header.boundingBox();
  
  const visual = await page.$('.project-main-visual');
  const visualBox = await visual.boundingBox();
  
  const title = await page.$('.project-large-title');
  const titleBox = await title.boundingBox();

  const badges = await page.$('.metadata-badges');
  const badgesBox = await badges.boundingBox();

  console.log(JSON.stringify({
    headerBox,
    visualBox,
    titleBox,
    badgesBox
  }, null, 2));

  await browser.close();
})();
