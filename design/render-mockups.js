const puppeteer = require('puppeteer');
const path = require('path');

const files = [
  'home.html',
  'event-detail.html',
  'checkout.html',
  'my-tickets.html',
  'door-validation.html',
  'create-event.html',
  'organizer-dashboard.html',
  'login.html',
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/home/luizmatheusga/.cache/puppeteer/chrome/linux-151.0.7922.77/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const file of files) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    const filePath = 'file://' + path.resolve(__dirname, file);
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await page.screenshot({
      path: path.resolve(__dirname, file.replace('.html', '.png')),
      fullPage: true,
    });
    await page.close();
    console.log('Rendered', file);
  }

  await browser.close();
})();
