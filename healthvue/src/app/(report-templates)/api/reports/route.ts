import puppeteer from "puppeteer";

export async function GET() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //   // Navigate the page to a URL
  await page.goto("http://localhost:3000/case-report");

  await page.waitForSelector("#mark-end");

  const pdf = await page.pdf();

  await browser.close();

  return new Response(pdf, { headers: { contentType: "application/pdf" } });
}
