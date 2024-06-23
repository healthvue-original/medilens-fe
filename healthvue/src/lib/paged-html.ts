import PagedHTML, { components, utils } from "paged-html";

const { Paragraph } = components;

export default async function generateReport() {
  const el = utils.htmlToElement(
    `<div id="pdf-container"> 
    
        </div>`
  );
  document.body.appendChild(el);

  const styles = `
    
  `;

  const shadow = el.attachShadow({ mode: "closed" });

  shadow.appendChild(
    utils.htmlToElement(`
      <div id="pdf-root">
          <style>${styles}</style>
      </div>
    `)
  );

  const para = utils.htmlToElement(`<p>Hello</p>`);

  const root = shadow.firstElementChild as HTMLElement;

  if (!root) {
    return;
  }

  const instance = PagedHTML.create({
    root,
    events: {
      onPageEnd: (page) => {
        const topLeft = page.querySelector(".top-left");
        const bottomRight = page.querySelector(".bottom-right");
        const style = `
            position: relative;
            top: 10px;
            width: 156px;
            height: 32px;
        `;
        bottomRight.innerHTML = `<span style='position: relative; top: 10px;'>Page no ${page.pageNumber}</span>`;
      },
      onPageStart: () => {},
    },
  });

  await instance.render([Paragraph({ paraElement: para })]);

  printPage(shadow.innerHTML);

  document.body.removeChild(el);
}

function closePrint() {
  document.body.removeChild(this.__container__);
}

function setPrint() {
  this.contentWindow.__container__ = this;
  this.contentWindow.onbeforeunload = closePrint;
  this.contentWindow.onafterprint = closePrint;
  this.contentWindow.focus(); // Required for IE
  this.contentWindow.print();
}

function printPage(srcDoc) {
  const hideFrame = document.createElement("iframe");
  hideFrame.onload = setPrint;
  hideFrame.style.position = "fixed";
  hideFrame.style.right = "0";
  hideFrame.style.bottom = "0";
  hideFrame.style.width = "0";
  hideFrame.style.height = "0";
  hideFrame.style.border = "0";
  hideFrame.srcdoc = getHtml(srcDoc);
  document.body.appendChild(hideFrame);
}

const getHtml = (htmlString) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
  </head>
  <body>
      ${htmlString}
  </body>
  </html>
  `;
