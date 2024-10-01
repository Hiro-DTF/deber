module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'babel-preset-react-native'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };
};
