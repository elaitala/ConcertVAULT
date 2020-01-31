console.log('UTILS connected...');

const logger = (request, response, next) => {
  console.log(`${request.method} -- ${request.url}`);
  next();
};

const methodNotAllowed = (request, response) => {
  response.status(405).json({message: 'You are no Method Man'});
};

module.exports = {
  logger,
  methodNotAllowed
};