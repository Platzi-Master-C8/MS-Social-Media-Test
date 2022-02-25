const Boom = require('@hapi/boom');

'use strict';

exports.plugin = {
  name: 'usersRouter',
  register: async function (server, options) {
    server.route({
      method: 'GET',
      path: '/{id?}',
      options: {
        // auth: false, //quitar para produccion
        handler: async (request, h) => {
          try {
            const id = request.params.id;
            let resp;

            if (id) {
              resp = await server.methods.findUser(id);
              return resp;
            }

            resp = await server.methods.findUsers();
            return resp;
          } catch (err) {
            console.log(err);
            return err;
          }
        },
      },
    });

    server.route({
      method: 'POST',
      path: '/saveCustomInfo',
      options: {
        // auth: false, //quitar para produccion
        handler: async (request, h) => {
          try {
            
            const {id, info} = request.payload;
            // const customInfo = server.methods.generateCustomInfo();

            return await server.methods.saveCustomInfo(id, info);
          } catch (err) {
            console.log(err);
            return Boom.badRequest(err);
          }
        },
      },
    });

    server.route({
      method: 'GET',
      path: '/customInfo/{id}',
      options: {
        // auth: false, //quitar para produccion
        handler: async (request, h) => {
          try {
            const id = request.params.id;

            return await server.methods.getCustomInfo(id);
          } catch (err) {
            console.log(err);
            return Boom.badRequest(err);
          }
        },
      },
    });
  },
};
