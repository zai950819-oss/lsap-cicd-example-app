// app.test.js
const request = require("supertest");
const app = require("./app"); // Import the app logic

let server; // Define a variable to hold the server instance

// This block runs once before all tests
beforeAll((done) => {
  // Start the server on a specific port for testing
  server = app.listen(3000, () => {
    console.log("Test server running on port 3000");
    done(); // Signal that the setup is complete
  });
});

// This block runs once after all tests are finished
afterAll((done) => {
  // Shut down the server and release the port
  server.close(done);
});

test('GET /time returns ISO timestamp', async () => {
  const response = await request(app).get('/time');
  expect(response.statusCode).toBe(200);

  const isoRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  expect(response.body.time).toMatch(isoRegex);
});
describe("API Endpoints", () => {
  it("should return a 200 OK status and welcome message for the root endpoint", async () => {
    // Test against the running server
    const res = await request(server).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain("Welcome to the CI/CD Workshop!");
  });
});
