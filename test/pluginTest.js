const Lab = require('@hapi/lab');
const lab = exports.lab = Lab.script(); //export test script
const Code = require('@hapi/code');
const server = require("../index");
const { config } = require('../config/config');


lab.experiment("authStrategies plugin", function() {

    lab.test("Plugin successfully loads", function(done) {
        server.inject("authStrategies", async function(err) {
            Code.expect(err).to.equal(null);
 
            await server.stop();
        });
    });
 
   
}); 