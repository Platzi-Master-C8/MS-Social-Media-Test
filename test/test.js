const Lab = require('@hapi/lab');
const lab = exports.lab = Lab.script(); //export test script
const Code = require('@hapi/code');
const server = require("../index");

lab.experiment("Basic HTTP Tests", function() {
	// tests
	lab.test("GET /{yourname*} (endpoint test)", async function() {
		const options = {
			method: "GET",
			url: "/hi"
		};
		// server.inject lets you simulate an http request
		const response = await server.inject(options);
		Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200 ("Ok")
		Code.expect(response.result).to.have.length(5); // Expect result to be "Hello Timmy!" (12 chars long)
		await server.stop();
	});
});
