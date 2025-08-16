const request = require("supertest");
const app = require("../app");

describe("Integration Tests - HiveBox API", () => {
  test("GET /version → should return app version", async () => {
    const res = await request(app).get("/version");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("version");
    expect(typeof res.body.version).toBe("string");
  });

  test("GET /temperature → should return average temperature", async () => {
    const res = await request(app).get("/temperature");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("averageTemperature");
  });

  test("GET /metrics → should return Prometheus metrics text", async () => {
    const res = await request(app).get("/metrics");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("process_cpu_user_seconds_total");
    expect(res.headers["content-type"]).toMatch(/text\/plain/);
  });
});
