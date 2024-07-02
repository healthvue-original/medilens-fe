"use client";
import { useEffect } from "react";
import PagedHTML, { utils } from "paged-html";
import { dateFormatter, updatePageTitle } from "@/lib/utils";
import {
  PagedeComponentCreator,
  PagedHTMLInstance,
} from "paged-html/build/types";
import { CaseModel } from "@/services/api/models";

export default function View({ caseObj }: { caseObj: CaseModel }): JSX.Element {
  useEffect(() => {
    const pdfContainer = document.getElementById("pdf-container");

    updatePageTitle(`Case Report - ${caseObj.id}`);

    if (pdfContainer && !pdfContainer.innerHTML) {
      generateReport({ container: pdfContainer, caseObj });
    }
  }, []);
  return <div id="pdf-container"></div>;
}

function ListView(caseObj: CaseModel): PagedeComponentCreator {
  const patient = caseObj.patient;
  if (!patient) {
    throw new Error("patient is Empty");
  }
  const renderRow = (key: string, value: string | number) => `
      <div style='display:flex; align-items: center; gap: 16px'>
        <span style='font-weight: bold; min-width: 94px'>${key}</span>
        <span>:</span>
        <span>${value}</span>
      </div>
    `;

  const viewEl = utils.htmlToElement(`
      <div style='display : flex; flex-direction: column; gap : 64px; height: 100%'>
        <div style='display : flex;'>
          <div style='display: flex; flex-direction: column; gap : 4px; flex : 1'>
            ${renderRow("Patient ID", patient.id)}
            ${renderRow("Name", patient.name)}
            ${renderRow("Age", patient.age)}
            ${renderRow("Gender", patient.sex)}
          </div>
          <div style='display: flex; flex-direction: column; gap : 4px; flex: 1'>
            ${renderRow("Case ID", caseObj.id)}
            ${renderRow(
              "Created At",
              dateFormatter.format(new Date(caseObj.created_at))
            )}
          </div>
        </div>
  
        <div style='flex:1;'>
          <h3 style='font-weight : bold; font-size : 16px'>Case Report : </h3>
          <p style='margin-top: 8px'>
              ${caseObj.result.replace("\n", "<br>")}
          </p>
        </div>
  
        <div style='display: flex; justify-content: space-between'>
            <div>
              <p>Dr. John,</p>
              <p>Consultant Pathologist</p>
            </div>
            <div>
              <p>Dr. Krishna,</p>
              <p>Head Pathologist</p>
          </div>
        </div>
      </div>
    `);

  return function (instance: PagedHTMLInstance) {
    function init() {}

    function* renderer() {
      const pageContent = instance.getCurrentPage().contentArea;
      pageContent.appendChild(viewEl);
      yield viewEl;
    }

    return {
      init,
      renderer,
    };
  };
}

async function generateReport({
  container,
  caseObj,
}: {
  container: HTMLElement;
  caseObj: CaseModel;
}) {
  const root = container;

  if (!root) {
    return;
  }

  const instance = PagedHTML.create({
    root,
    events: {
      onPageEnd: (page) => {
        const topCenter = page.querySelector(".top-center");
        const bottomRight = page.querySelector(".bottom-right");

        topCenter.innerHTML = `
            <div style='display:flex; justify-content: center;'>
              <span style='position: relative; top:12px; padding-bottom: 4px;
              border-bottom: 1px solid #dedede;'>
                HealthVue
              </span>
            </div>`;
        bottomRight.innerHTML = `<span style='position: relative; top: calc(50% - 1rem);'>Page no ${page.pageNumber}</span>`;
      },
      onPageStart: () => {},
    },
  });

  await instance.render([ListView(caseObj)]);

  const markEndEl = utils.htmlToElement(
    `<div id="mark-end" style="display:none"></div>`
  );

  document.body.appendChild(markEndEl);
  window.print();
}
