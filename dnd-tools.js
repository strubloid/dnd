const puppeteer = require('puppeteer');
const path = require('path');

require('dotenv').config();
const EXTENSION_PATH_LIVE_CHAT_OVERLAY = path.join('extensions', 'live-chat-overlay-main');


(async () => {

  const width = 1920;
  const height = 1080;

  // Launch the browser with the specified window size
  const browser = await puppeteer.launch({
    headless: false,
    // devtools: true,
    // executablePath: '/usr/bin/google-chrome',
    // userDataDir: '/home/zero/.config/google-chrome/Default',
    args: [
      `--window-size=${width},${height}`, 
      '--disable-blink-features=AutomationControlled',
      `--disable-extensions-except=${EXTENSION_PATH_LIVE_CHAT_OVERLAY}`,
      `--load-extension=${EXTENSION_PATH_LIVE_CHAT_OVERLAY}`
    ]
  });

  // Launch the page with specific size
  const page = await browser.newPage();
  await page.setViewport({
    width: width,
    height: height,
  });

  // await page.goto('chrome://extensions/', { waitUntil: 'networkidle2' });
  
  // await new Promise(resolve => setTimeout(resolve, 1000 * 60 * 10)); 


  
  console.log("GOOGLE Login");
  console.log("1 - Login Google Page");
  await page.goto('https://accounts.google.com', { waitUntil: 'networkidle2' });

  console.log("2 - Entering Google credentials");
  
  // Fill in the username and password
  console.log("3 - Email");
  await new Promise(resolve => setTimeout(resolve, 1000 * 2)); 
  await page.type('input[type="email"]', process.env.GOOGLE_USERNAME);
  await page.click('div[id="identifierNext"]');
  
  // wait for a bit
  console.log("3 - Password");
  await new Promise(resolve => setTimeout(resolve, 1000 * 2)); 
  await page.type('input[type="password"]', process.env.GOOGLE_PASSWORD);
  await page.click('div[id="passwordNext"]');

  // Wait for login to complete
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  console.log("DND PAGE on Youtube");
  
  console.log("1 - Accessing Page");
  await page.goto('https://www.youtube.com/@DnDBrasilCork/live', { waitUntil: 'networkidle2' });

  console.log("2 - Waiting for the chat iframe to load");
  await page.waitForSelector('iframe#chatframe', { visible: true, timeout: 60000 });

  console.log("3 - Clicking on Iframe element to expand options (...)");
  const iframeElement = await page.$('#chat-container iframe');
  const iframe = await iframeElement.contentFrame();
  await iframe.click('yt-live-chat-app yt-live-chat-button');

  console.log("4 - Select PopOut");
  await iframe.click('tp-yt-paper-listbox ytd-menu-service-item-renderer:nth-of-type(2)');
  await new Promise(resolve => setTimeout(resolve, 1000 * 3)); 

  const pages = await browser.pages();
  const newPage = pages[pages.length - 1];
  if (newPage) {
      console.log('LiveChat:', newPage.url());
  }

  // click on pop-out-button to show the url
  // console.log("5 - Click to get the popout");
  await newPage.click('#pop-out-button');
  await new Promise(resolve => setTimeout(resolve, 1000 * 2)); 

  const popOutUrl = await newPage.$eval('#pop-out-url', el => el.value);

  // const popoutValue = await newPage.$('#pop-out-url').value
  console.log('Popout Value:', popOutUrl);


  await new Promise(resolve => setTimeout(resolve, 1000 * 60 * 10)); 

  await browser.close();
})();
