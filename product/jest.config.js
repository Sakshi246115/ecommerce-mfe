module.exports = {
  preset: 'jest-preset-angular',

  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts'
  ],

  testEnvironment: 'jsdom',

  testMatch: [
    '<rootDir>/src/**/*.spec.ts'
  ],

  transform: {
    '^.+\\.(ts|js|mjs)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json'
      }
    ]
  },

  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)'
  ],

  moduleFileExtensions: [
    'ts',
    'html',
    'js',
    'json'
  ],

  moduleNameMapper: {
    '\\.(html)$': '<rootDir>/src/test/html-mock.js'
  }
};