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

const ageDictionary = NumberDictionary.generate({ min: 1, max: 100 });

const sexDictionary = ["male", "female"];

const phoneDictionary = NumberDictionary.generate({
  min: 9000000000,
  max: 9999999999,
});

const nameGenerator = () => uniqueNamesGenerator({ dictionaries: [names] });
const ageGenerator = () =>
  +uniqueNamesGenerator({ dictionaries: [ageDictionary] });
const sexGenerator = () =>
  uniqueNamesGenerator({ dictionaries: [sexDictionary] });
const emailGenerator = (name) =>
  name.replace(/\s+/g, "").toLowerCase() + "@gmail.com";
const phoneGenerator = () =>
  +uniqueNamesGenerator({
    dictionaries: [phoneDictionary],
  });
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

// console.log(createPatient());

// -------------- Hospital -----------------

const createHospital = () => ({
  name: uniqueNamesGenerator({ dictionaries: [names] }) + " Medicals",
});

// console.log(createHospital());

// -------------- Cases -----------------

const createCase = ({ patientCount, hospitalCount }) => {
  const patientIdGenerator = () =>
    +uniqueNamesGenerator({
      dictionaries: [NumberDictionary.generate({ min: 1, max: patientCount })],
    });

  const hospitalIdGenerator = () =>
    +uniqueNamesGenerator({
      dictionaries: [NumberDictionary.generate({ min: 1, max: hospitalCount })],
    });

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

// console.log(createCase({ patientCount: 10, hospitalCount: 5 }));

const generateData = (generator, count) =>
  Array.from({ length: count }).map(generator);

const patientCount = 300;
const hospitalCount = 50;
const casesCount = 1200;

const mockData = {
  patients: generateData(createPatient, patientCount),
  hospitals: generateData(createHospital, hospitalCount),
  cases: generateData(
    () => createCase({ patientCount, hospitalCount }),
    casesCount
  ),
};

/*

const generateDataByAPI = async () => {
  // patients
  const { patients, cases, hospitals } = mockData;
  await Promise.all(patients.map((patient) => api.addPatient(patient)));
  await Promise.all(hospitals.map((hospital) => api.addHospital(hospital)));
  await Promise.all(cases.map((caseObj) => api.addCase(caseObj)));
};

*/

writeFileSync("mockData.js", `const mockData = ${JSON.stringify(mockData)}; 
    const generateDataByAPI = async () => {
    const { patients, cases, hospitals } = mockData;
    await Promise.all(patients.map((patient) => api.addPatient(patient)));
    await Promise.all(hospitals.map((hospital) => api.addHospital(hospital)));
    await Promise.all(cases.map((caseObj) => api.addCase(caseObj)));
  };`);
