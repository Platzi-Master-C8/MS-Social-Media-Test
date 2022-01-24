'use strict';

exports.plugin = {
  name: 'usersRouter',
  register: async function (server, options) {
    server.route({
      method: 'GET',
      path: '/{id?}',
      options: {
        auth: false, //quitar para produccion
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
          } catch (error) {
            console.log(error);
            return error;
          }
        },
      },
    });
  },
};
