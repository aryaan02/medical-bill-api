const express = require("express");
const Ajv = require("ajv");
const bodyParser = require("body-parser");

const app = express();
const ajv = new Ajv();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const schema = {
  type: "object",
  properties: {
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
  },
  required: [
    "patientName",
    "patientAddress",
    "hospitalName",
    "dateOfService",
    "amount",
  ],
};

var bills = [];

app.get("/items", (req, res) => {
  if (bills.length === 0) {
    return res.send("No bills found");
  }

  res.json(bills);
});

app.post("/items", (req, res) => {
  var newBill = req.body;

  // Validate the request body against the schema
  const valid = ajv.validate(schema, newBill);
  if (!valid) {
    return res.status(400).send(ajv.errorsText());
  }

  // Check the format of the name, should be Firstname Lastname
  if (!newBill.patientName.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
    return res
      .status(400)
      .send("Invalid name format. Please use Firstname Lastname");
  }

  // Check the format of the date, should be MM-DD-YYYY format or MM/DD/YYYY format
  if (
    !newBill.dateOfService.match(
      /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/
    )
  ) {
    return res
      .status(400)
      .send(
        "Invalid date format. Please use MM-DD-YYYY format or MM/DD/YYYY format"
      );
  }

  // Format the date
  newBill.dateOfService = new Date(newBill.dateOfService).toLocaleDateString();

  // Check the format of the address
  if (!newBill.patientAddress.street.match(/^[0-9]+ [a-zA-Z]+ [a-zA-Z]+$/)) {
    return res
      .status(400)
      .send("Invalid street format. Please use 123 Main St");
  }

  // Format the city to be titlecase
  newBill.patientAddress.city = newBill.patientAddress.city.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );

  // Check the format of the state
  if (!newBill.patientAddress.state.match(/^[A-Z]{2}$/)) {
    return res
      .status(400)
      .send("Invalid state format. Please use 2 letter state code");
  }

  // Check the format of the zip
  if (!newBill.patientAddress.zip.match(/^[0-9]{5}$/)) {
    return res
      .status(400)
      .send("Invalid zip format. Please use 5 digit zip code");
  }

  // Check the format of the amount, make sure it's a number, and there are no more than 2 decimal places
  if (isNaN(newBill.amount)) {
    return res
      .status(400)
      .send("Invalid amount format. Please use money format (e.g. 123.45)");
  }

  // Format the hospital name to be all titlecase
  newBill.hospitalName = newBill.hospitalName.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Add the bill to the array
  bills.push(newBill);
  res.status(201).send("Bill added");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
