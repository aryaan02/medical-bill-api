# medical-bill-api

Welcome! This repository houses the Node.js app that serves GET and POST requests for medical bills. it includes the following files:

- app.js: the main server logic where the GET and POST requests are processed
- test/app.test.js: API tests using 'mocha' and 'chai'

To run the service, first download a local copy of the project. Then, make sure to download the dependencies by running 'npm install' in the root directory. Now, you should be able to run 'npm start', which starts the server and allows it to listen for incoming requests.
- GET \items: In another terminal, run "curl http://localhost:3000/items" to submit a GET request.
- POST \items: In another terminal run 'curl -X POST -H "Content-Type: application/json" -d '<JSON>' http://localhost:3000/items', with your desired JSON-   formatted bill inserted in-place of '<JSON>'. The JSON file should be in the following format:
  {
    patientName: {
      type: "string",
    },
    patientAddress: {
      type: "object",
      properties: {
        street: {
          type: "string",
          pattern: "\\d+\\s+\\w+\\s+\\w+",
        },
        city: {
          type: "string",
          pattern: "\\w+",
        },
        state: {
          type: "string",
          pattern: "[A-Z]{2}",
        },
        zip: {
          type: "string",
          pattern: "\\d{5}",
        },
      },
      required: ["street", "city", "state", "zip"],
    },
    hospitalName: {
      type: "string",
    },
    dateOfService: {
      type: "string",
    },
    amount: {
      type: "number",
      minimum: 0,
    },
  }
  If the request is in the correct format, the response in the terminal should return as "Bill added."

To run the tests, you can run 'npm test' to run the pre-defined tests, including valid and invalid GET and POST requests.
