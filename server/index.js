'use strict';

const controllers = require('./controllers');
const routes = require('./routes');

module.exports = {
  controllers,
  routes,
  
  register({ strapi }) {
    console.log('🧩 [Plugins Manager] Server plugin registered');
  },

  bootstrap({ strapi }) {
    console.log('🧩 [Plugins Manager] Server plugin bootstrap');
  },
}; 