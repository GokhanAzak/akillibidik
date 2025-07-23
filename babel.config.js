module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', { // BU KISIM ÖNEMLİ!
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true,
    }],
    // Eğer reanimated kullanıyorsanız bu satır bunun altında olmalı
    // 'react-native-reanimated/plugin',
  ],
};