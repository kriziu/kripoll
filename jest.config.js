const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/common/components/(.*)$': '<rootDir>/common/components/$1',
    '^@/common/constants/(.*)$': '<rootDir>/common/constants/$1',
    '^@/common/hooks/(.*)$': '<rootDir>/common/hooks/$1',
    '^@/common/layouts/(.*)$': '<rootDir>/common/layouts/$1',
    '^@/common/lib/(.*)$': '<rootDir>/common/lib/$1',
    '^@/common/styles/(.*)$': '<rootDir>/common/styles/$1',
    '^@/common/types/(.*)$': '<rootDir>/common/types/$1',

    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
