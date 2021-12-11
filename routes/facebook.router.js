const router = [
  {
    method: '*', // Must handle both GET and POST
    path: '/loginFacebook', // The callback endpoint registered with the provider
    options: {
      auth: {
        mode: 'try',
        strategy: 'facebook',
      },
      handler: (request, h) => {
        if (!request.auth.isAuthenticated) {
          return request.auth;
        }

        // console.log(request.auth.credentials);

        // Perform any account lookup or registration, setup local session,
        // and redirect to the application. The third-party credentials are
        // stored in request.auth.credentials. Any query parameters from
        // the initial request are passed back via request.auth.credentials.query.

        return h.redirect('/home');
      },
    },
  }
];

module.exports = router;
