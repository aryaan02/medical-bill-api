const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);

// Test the GET /items endpoint
describe("GET /items", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .get("/items")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("POST /items", () => {
  it("should return 201", (done) => {
    chai
      .request(app)
      .post("/items")
      .send({
        patientName: "John Doe",
        patientAddress: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
        },
        hospitalName: "Any Hospital",
        dateOfService: "01/01/2020",
        amount: 100.00,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});

// Test the GET /items endpoint
describe("GET /items", () => {
    it("should return 200", (done) => {
        chai
        .request(app)
        .get("/items")
        .end((err, res) => {
            expect(res).to.have.status(200);
            console.log(res.body);
            done();
        });
    });
    }
);

// Test the POST /items endpoint with invalid data
describe("POST /items", () => {
    it("should return 400", (done) => {
        chai
        .request(app)
        .post("/items")
        .send({
            patientName: "John Doe",
            patientAddress: {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "12345",
            },
            hospitalName: "Any Hospital",
            dateOfService: "01/01/2020",
            amount: -100.00,
        })
        .end((err, res) => {
            expect(res).to.have.status(400);
            done();
        });
    });
    });

// Test the POST /items endpoint with invalid date
describe("POST /items", () => {
    it("should return 400", (done) => {
        chai
        .request(app)
        .post("/items")
        .send({
            patientName: "John Doe",
            patientAddress: {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "12345",
            },
            hospitalName: "Any Hospital",
            dateOfService: "01/01-29",
            amount: 100.00,
        })
        .end((err, res) => {
            expect(res).to.have.status(400);
            done();
        });
    });
    }
);
