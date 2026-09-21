const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'shell',

 remotes: {
  product: 'http://localhost:4201/remoteEntry.js',
  cart: 'http://localhost:4202/remoteEntry.js'
},

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    }),
  },

});