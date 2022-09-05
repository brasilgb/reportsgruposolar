/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
 const { getDefaultConfig } = require('@expo/metro-config');
 module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'js' && ext !== 'ts'),
    sourceExts: [...resolver.sourceExts, 'js', 'jsx', 'ts', 'tsx'],
  };

  return config;
})();
