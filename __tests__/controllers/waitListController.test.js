import request from "supertest";
import app from "../../src/app";
require("dotenv").config();

describe("WaitList Controller", () => {
	test("GET /api/waitlist should return status code 200", async () => {
		const res = await request(app).get("/api/waitlist");
		expect(res.statusCode).toEqual(200);
	});

	test("POST /api/waitlist/postWaitList should return total number of elements", async () => {
		const testData = [{ id: 1 }, { id: 2 }, { id: 3 }];
		const res = await request(app)
			.post("/api/waitlist/postWaitList")
			.send(testData);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual({ total: testData.length });
	});

	test("POST /api/waitlist/postSortedWaitList should return sorted list with consumptionForecast", async () => {
		const response = await request(app).get("/api/waitlist/fetchData");
		const testData = response.body; // Extract the data from the response

		const res = await request(app)
			.post("/api/waitlist/postSortedWaitList")
			.send(testData); // Use the extracted data in the POST request

		expect(res.statusCode).toEqual(200);

		res.body.forEach((item, index) => {
			if (index > 0) {
				const lastItem = res.body[index - 1];

				const lastItemScore =
					lastItem.quantity * 0.5 +
					(parseFloat(lastItem.paymentCondition) * 0.3 || 0) + // Ensure that NaN is treated as 0
					(lastItem.country === "PORT" ? 0.2 : 0);
				const currentItemScore =
					item.quantity * 0.5 +
					(parseFloat(item.paymentCondition) * 0.3 || 0) + // Ensure that NaN is treated as 0
					(item.country === "PORT" ? 0.2 : 0);

				// Check for NaN values and treat them as 0
				const lastItemScoreValid = isNaN(lastItemScore) ? 0 : lastItemScore;
				const currentItemScoreValid = isNaN(currentItemScore)
					? 0
					: currentItemScore;

				expect(lastItemScoreValid).toBeGreaterThanOrEqual(
					currentItemScoreValid
				);
			}
		});
	});
});
