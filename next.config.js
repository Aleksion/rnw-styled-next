const withTM = require("next-transpile-modules");
const withPlugins = require("next-compose-plugins");
var nodeExternals = require("webpack-node-externals");

module.exports = withPlugins([
  {
    webpack: (config, { defaultLoaders, isServer, dev }) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: "empty"
      };

      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        // Transform all direct `react-native` imports to `react-native-web`
        "react-native$": "react-native-web"
      };

      defaultLoaders.babel.options.plugins = [
        ["react-native-web", { commonjs: true }]
      ];

      /*******************************************
       *** Externals
       ******************************************/
      // Configure externals
      return config;
    }
  },
  [
    withTM,
    ["react-native-web", "styled-components", "styled-components/native"]
  ]
]);
