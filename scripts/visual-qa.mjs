/**
 * Temporary visual QA helper. Run against dev or preview:
 *   node scripts/visual-qa.mjs [baseUrl]
 *
 * Requires: npx playwright (one-off download on first run).
 */
import { chromium } from 'playwright';

const baseUrl = process.argv[2] ?? 'http://127.0.0.1:5173';
const chapterIds = [
  'couple-bubble',
  'warring-loving-brain',
  'know-your-partner',
  'becoming-experts',
  'launchings-landings',
  'go-to-people',
  'protecting-bubble',
  'fighting-well',
  'eye-contact',
  'partnership-heals',
];

const viewports = [
  { name: 'desktop-wide', width: 1440, height: 900 },
  { name: 'desktop-narrow', width: 1180, height: 850 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'mobile', width: 390, height: 844 },
];

function checkPageMetrics(page, label) {
  return page.evaluate((ctx) => {
    const doc = document.documentElement;
    const overflowX = doc.scrollWidth > doc.clientWidth + 1;
    const artifacts = [...document.querySelectorAll('.chapter-artifact')];
    const overlapping = [];

    for (const artifact of artifacts) {
      const rect = artifact.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const top = document.elementFromPoint(cx, cy);
      if (top && !artifact.contains(top) && top !== artifact) {
        const textLike = top.closest(
          'p, li, h1, h2, h3, input, textarea, button, label, summary',
        );
        if (textLike) {
          overlapping.push(textLike.tagName.toLowerCase());
        }
      }
    }

    const nav = document.querySelector('.mobile-nav');
    let navBlocksInput = false;
    if (nav) {
      const inputs = [...document.querySelectorAll('input, textarea, button.mobile-primary-button')];
      const navRect = nav.getBoundingClientRect();
      for (const input of inputs) {
        const r = input.getBoundingClientRect();
        if (r.bottom > navRect.top + 2 && r.top < navRect.bottom) {
          navBlocksInput = true;
          break;
        }
      }
    }

    return {
      label: ctx,
      overflowX,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      artifactCount: artifacts.length,
      overlapping,
      navBlocksInput,
    };
  }, label);
}

async function openDesktopChapter(page, chapterId) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: new RegExp(chapterId.replace(/-/g, ' '), 'i') }).first().click({
    timeout: 8000,
  }).catch(async () => {
    const index = chapterIds.indexOf(chapterId);
    await page.getByRole('button', { name: `Chapter ${index + 1}`, exact: false }).first().click();
  });
  await page.waitForTimeout(400);
}

async function openMobileMirror(page) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Mirror' }).click();
  await page.getByRole('button', { name: /Add intentions/i }).click();
  await page.waitForTimeout(300);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const report = [];

for (const vp of viewports) {
  await page.setViewportSize({ width: vp.width, height: vp.height });

  if (vp.width >= 768) {
    for (const chapterId of chapterIds) {
      await openDesktopChapter(page, chapterId);
      const result = await checkPageMetrics(page, `${vp.name} / ${chapterId}`);
      report.push(result);
    }
  } else {
    await openMobileMirror(page);
    const mirror = await checkPageMetrics(page, `${vp.name} / mirror-intent`);
    report.push(mirror);

    await page.getByRole('button', { name: 'Learn' }).click();
    const learn = await checkPageMetrics(page, `${vp.name} / learn-grid`);
    report.push(learn);
  }
}

await browser.close();

const failures = report.filter(
  (row) => row.overflowX || row.overlapping.length > 0 || row.navBlocksInput,
);

console.log(JSON.stringify({ checked: report.length, failures: failures.length, report, failures }, null, 2));
process.exit(failures.length > 0 ? 1 : 0);
