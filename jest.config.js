module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/index.js',
  ],
};