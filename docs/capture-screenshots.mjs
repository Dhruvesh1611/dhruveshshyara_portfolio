import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, 'screenshots');

const screenshots = [
  {
    name: 'hero1.png',
    url: 'http://localhost:3000',
    waitFor: 3000,
    viewport: { width: 1440, height: 900 },
  },
  {
    name: 'projects.png',
    url: 'http://localhost:3000/projects',
    waitFor: 3000,
    viewport: { width: 1440, height: 900 },
  },
  {
    name: 'about.png',
    url: 'http://localhost:3000/aboutme',
    waitFor: 3000,
    viewport: { width: 1440, height: 900 },
  },
  {
    name: 'certificates.png',
    url: 'http://localhost:3000/certificates',
    waitFor: 3000,
    viewport: { width: 1440, height: 900 },
  },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const shot of screenshots) {
    console.log(`📸 Capturing ${shot.name}...`);
    const page = await browser.newPage();
    await page.setViewport(shot.viewport);

    try {
      await page.goto(shot.url, { waitUntil: 'networkidle2', timeout: 15000 });
      // Wait for animations to settle
      await new Promise(r => setTimeout(r, shot.waitFor));

      await page.screenshot({
        path: path.join(screenshotsDir, shot.name),
        type: 'png',
        fullPage: false,
      });
      console.log(`✅ Saved ${shot.name}`);
    } catch (err) {
      console.error(`❌ Failed ${shot.name}:`, err.message);
    }
    await page.close();
  }

  await browser.close();
  console.log('\n🎉 All screenshots captured!');
})();
