module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
      targets: {
        browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
      }
    }]
  ],
  plugins: [
    'babel-plugin-transform-vue-jsx',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }]
      ],
      plugins: [
        'babel-plugin-transform-vue-jsx',
        '@babel/plugin-transform-modules-commonjs',
        'babel-plugin-dynamic-import-node',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread'
      ]
    }
  }
}
