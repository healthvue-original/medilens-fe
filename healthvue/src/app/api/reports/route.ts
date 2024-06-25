import puppeteer from "puppeteer";

export async function GET() {
  //   const res = await fetch("https://data.mongodb-api.com/...", {
  //     next: { revalidate: 60 }, // Revalidate every 60 seconds
  //   });

  //   console.log(htmlFile);

  //   const htmlFile = await fs.readFileSync("./templates/sample.html");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //   // Navigate the page to a URL
  await await page.goto("http://localhost:3000/case-report");

  const pdf = await page.pdf();

  //   console.log(pdf);

  //   // Set screen size
  //   await page.setViewport({ width: 1080, height: 1024 });

  //   // Type into search box
  //   await page.type(".devsite-search-field", "automate beyond recorder");

  //   // Wait and click on first result
  //   const searchResultSelector = ".devsite-result-item-link";
  //   await page.waitForSelector(searchResultSelector);
  //   await page.click(searchResultSelector);

  //   // Locate the full title with a unique string
  //   const textSelector = await page.waitForSelector(
  //     "text/Customize and automate"
  //   );
  //   const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  //   // Print the full title
  //   console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();

  return new Response(pdf, { headers: { contentType: "application/pdf" } });
}
