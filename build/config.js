module.exports = {
    dir: '.',
    overwrite: true,
    config: {
        asar: true,
        extraFiles: [
            'animations',
        ],
        win: {
            files: [
                '**/*',
                '!src',
                '!assets',
                '!build',
                '!animations',
                '!.env',
                '!.*',
                '!webpack.config.js',
                '!dist/win-unpacked',
                'dist/app.min.css',
            ],
        },
    },
};
