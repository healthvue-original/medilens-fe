import {
  uniqueNamesGenerator,
  NumberDictionary,
  names,
  colors,
  adjectives,
  animals,
} from "unique-names-generator";
import { writeFileSync } from "fs";

// --------------- Utils ----------------

const sexDictionary = ["male", "female"];

const nameGenerator = () => uniqueNamesGenerator({ dictionaries: [names] });
const ageGenerator = () => +NumberDictionary.generate({ min: 1, max: 100 })[0];
const sexGenerator = () =>
  uniqueNamesGenerator({ dictionaries: [sexDictionary] });
const emailGenerator = (name) =>
  name.replace(/\s+/g, "").toLowerCase() + "@gmail.com";
const phoneGenerator = () =>
  +NumberDictionary.generate({
    min: 9000000000,
    max: 9999999999,
  })[0];
const descriptionGenerator = () =>
  uniqueNamesGenerator({ dictionaries: [colors, adjectives, animals] });

// -------------- Patient -----------------

const createPatient = () => {
  const name = nameGenerator();
  return {
    name,
    email: emailGenerator(name),
    age: ageGenerator(),
    sex: sexGenerator(),
    phone: phoneGenerator(),
    created_by: 1,
  };
};

// -------------- Hospital -----------------

const createHospital = () => ({
  name: uniqueNamesGenerator({ dictionaries: [names] }) + " Medicals",
});

// -------------- Cases -----------------

const createCase = ({ patientCount, hospitalCount }) => {
  const patientIdGenerator = () =>
    +NumberDictionary.generate({ min: 1, max: patientCount })[0];

  const hospitalIdGenerator = () =>
    +NumberDictionary.generate({ min: 1, max: hospitalCount })[0];

  const statusGenerator = () =>
    uniqueNamesGenerator({
      dictionaries: [["In Progress", "Completed", "Delayed"]],
    });
  return {
    name: nameGenerator(),
    description: descriptionGenerator(),
    created_by: 1,
    patient_id: patientIdGenerator(),
    hospital_id: hospitalIdGenerator(),
    status: statusGenerator(),
  };
};

// -------------- Scanners -----------------

const createScanner = (_, index) => {
  return {
    name: `Floor-${index}`,
    group_id: 1,
  };
};

// ------------------- Jobs --------------------

const createScanJob = ({ casesCount, scannerCount }) => {
  return {
    case_id: +NumberDictionary.generate({ min: 1, max: casesCount })[0],
    scanner_id: +NumberDictionary.generate({ min: 1, max: scannerCount })[0],
    slot_id: +NumberDictionary.generate({ min: 1, max: 5 })[0],
  };
};

// ------------------------------------------------

const generateData = (generator, count) =>
  Array.from({ length: count }).map(generator);

const patientCount = 300;
const hospitalCount = 50;
const casesCount = 1200;
const scannerCount = 3;
const scanJobsCount = 30;

const mockData = {
  patients: generateData(createPatient, patientCount),
  hospitals: generateData(createHospital, hospitalCount),
  cases: generateData(
    () => createCase({ patientCount, hospitalCount }),
    casesCount
  ),
  scanners: generateData(createScanner, scannerCount),
  scan_jobs: generateData(
    () => createScanJob({ casesCount, scannerCount }),
    scanJobsCount
  ),
};

writeFileSync(
  "mockData.js",
  `const mockData = ${JSON.stringify(mockData)};
    const generateDataByAPI = async () => {
    const { patients, cases, hospitals, scanners, scan_jobs } = mockData;

    await Promise.all(patients.map((patient) => api.addPatient(patient)));
    console.log("patients Added");

    await Promise.all(hospitals.map((hospital) => api.addHospital(hospital)));
    console.log("Hospitals Added");

    await Promise.all(cases.map((caseObj) => api.addCase(caseObj)));
    console.log("Cases Added");

    await Promise.all(scanners.map(scanner => api.addScanner(scanner)));
    console.log("Scanners Added");

    await Promise.all(scan_jobs.map(job => api.addScanJob(job)));
    console.log("Jobs Added");

  };`
);
