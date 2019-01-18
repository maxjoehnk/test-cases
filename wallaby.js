module.exports = function(wallaby) {
    return {
        files: [
            'src/**/*.ts'
        ],
        tests: [
            'tests/**/*.ts'
        ],
        env: {
            type: 'node'
        }
    };
};
