'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/plugins',
    handler: 'plugins.getPlugins',
    config: {
      policies: [],
      auth: false,
    },
  },
]; 