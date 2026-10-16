module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@contexts': './src/app/contexts',
          '@features': './src/app/features',
          '@app': './src/app',
          '@hooks': './src/app/hooks',
          '@stores': './src/app/stores',
          '@modules': './src/modules',
          '@platform': './src/platform',
          '@shared': './src/shared',
          '@ui': './src/ui',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
