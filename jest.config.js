module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/?(*.)+(test).ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov", "text", "clover"],
};
