module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    reporters: ['default', 'jest-junit'],
    snapshotSerializers: ['jest-serializer-vue'],
    collectCoverage: false,
    testMatch: ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
    transformIgnorePatterns: ['node_modules/(?!vue-json-tree)/'],
    testURL: 'http://localhost/',
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.jest.json',
        },
        'vue-jest': {
            tsConfig: 'tsconfig.jest.json',
        },
    },
};
