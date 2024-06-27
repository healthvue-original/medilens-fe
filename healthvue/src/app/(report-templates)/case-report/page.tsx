"use client";
import { createAPI } from "@/services/api";
import { API } from "@/services/api/types";
import PagedHTML, { components, utils } from "paged-html";
import { useEffect } from "react";
const { Paragraph } = components;

export default function CaseReport() {
  useEffect(() => {
    const pdfContainer = document.getElementById("pdf-container");

    if (pdfContainer && !pdfContainer.innerHTML) {
      const api = createAPI({ org: "healthvue" });
      generateReport({ container: pdfContainer, api });
    }
  }, []);
  return <div id="pdf-container"></div>;
}

async function generateReport({
  container,
  api,
}: {
  container: HTMLElement;
  api: API;
}) {
  const cases = await api.getCases();

  const para = utils.htmlToElement(
    `<p style="word-break: break-all">${JSON.stringify(cases)}</p>`
  );

  const root = container;

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

  const markEndEl = utils.htmlToElement(
    `<div id="mark-end" style="display:none"></div>`
  );

  document.body.appendChild(markEndEl);
  window.print();
}
