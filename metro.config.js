const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 🚫 Bloquear librería nativa incompatible con Web
config.resolver.blockList = [
  /@invertase\/react-native-apple-authentication\/.*/,
  /react-native-otp-auto-fill\/.*/,
  /react-native-jailbreak\/.*/,
];

module.exports = config;
