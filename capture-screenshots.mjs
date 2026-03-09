import { chromium } from 'playwright';

async function captureScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  console.log('Navigating to workflow page...');
  await page.goto('http://localhost:3000/my-claude-code-workflow', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // Wait a bit for any animations
  await page.waitForTimeout(1000);

  // Take initial screenshot
  console.log('Capturing viewport screenshot 1...');
  await page.screenshot({
    path: 'workflow-screenshot-1.png',
    fullPage: false
  });

  // Get page height to determine scroll steps
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = 1080;
  const scrollSteps = Math.ceil(scrollHeight / viewportHeight);

  console.log(`Page height: ${scrollHeight}px, viewport: ${viewportHeight}px, scroll steps: ${scrollSteps}`);

  // Scroll and capture
  for (let i = 1; i < scrollSteps; i++) {
    console.log(`Scrolling and capturing screenshot ${i + 1}...`);
    await page.evaluate((step) => {
      window.scrollTo(0, step * 1080);
    }, i);
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `workflow-screenshot-${i + 1}.png`,
      fullPage: false
    });
  }

  // Also capture full page screenshot
  console.log('Capturing full page screenshot...');
  await page.screenshot({
    path: 'workflow-screenshot-full.png',
    fullPage: true
  });

  await browser.close();
  console.log('Screenshots captured successfully!');
}

captureScreenshots().catch(console.error);
