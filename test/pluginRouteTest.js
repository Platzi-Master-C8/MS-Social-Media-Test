const Lab = require('@hapi/lab');
const lab = exports.lab = Lab.script(); //export test script
const Code = require('@hapi/code');
const server = require("../index");
const { config } = require('../config/config');


lab.experiment("authStrategies Routes plugin", function() {
lab.test("Plugin registers routes", async function(done) {
    var table = server.table();

    Code.expect(table).to.have.length(7);
    Code.expect(table[0].path).to.equal("/graphql");
   

    //await server.stop();
});
});