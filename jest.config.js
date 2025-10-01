module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|@react-native-picker|@react-native-async-storage|@shopify/flash-list|expo-status-bar|@expo)/)'
    main
  ],
};
