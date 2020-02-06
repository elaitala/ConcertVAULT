console.log('UTILS connected...');

const logger = (request, response, next) => {
  console.log(`${request.method} -- ${request.url}`);
  next();
};

const methodNotAllowed = (request, response) => {
  response.status(405).json({message: 'You are no Method Man'});
};

const notFound = (request, response) => {
  response
    .status(404)
    .send(`<h1>404</h1><h2>You don't have to go home</h2><h3>But you can't stay here</h3>`);
};

module.exports = {
  logger,
  methodNotAllowed,
  notFound
};