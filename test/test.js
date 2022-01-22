const Lab = require('@hapi/lab');
const lab = exports.lab = Lab.script(); //export test script
const Code = require('@hapi/code');
const server = require("../index");
const pool = require('../libs/postgres.pool');

lab.experiment("Basic HTTP Tests", function() {
	// tests
	lab.test("GET /api/v1/users/{id ?} (endpoint test)", async function() {
		const options = {
			method: "GET",
			url: "/api/v1/users/3"
		};
		// server.inject lets you simulate an http request
		const response = await server.inject(options);
		Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200 ("Ok")
		Code.expect(response.result).to.have.object; // Expect result to be "Hello Timmy!" (12 chars long)
		await server.stop();
	});
});
