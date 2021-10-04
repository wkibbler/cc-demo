
const {override, fixBabelImports, addWebpackAlias, useBabelRc} = require('customize-cra')
const path = require('path');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = override(
    /**
     * Explanation:
     * use .babelrc to enable decorators support, not officially supported by CRA
     */
    useBabelRc(),

    /**
     * Explanation:
     * add HMR support to CRA
     */
    (config, env) => {
        config = rewireReactHotLoader(config, env);
        return config;
    }
)