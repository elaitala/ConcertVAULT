console.log('ROUTER is working...');

module.exports = {
  user: require('./userRoutes'),
  concert: require('./concertRoutes'),
  views: require('./viewRoutes')
};