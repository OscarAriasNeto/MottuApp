module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|@react-native-picker|@react-native-async-storage|expo-status-bar|@expo)/)'
  ],
};
