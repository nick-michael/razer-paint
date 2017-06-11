module.exports = {
    asar: false,
    platform: 'win32',
    win32metadata: {
        CompanyName: "Nick Michael",
        FileDescription: "Razer Paint",
        ProductName: "Razer Paint",
    },
    arch: 'ia32',
    icon: 'assets/icons/icon.ico',
    prune: true,
    dir: '.',
    out: 'dist/app',
    overwrite: true,
    ignore: [
        /^\/webapp/,
        /^\/build/,
        /^\/assets/,
        /^\/src/,
        /^\/test/,
        /^\/node_modules/,
        /\.(gitignore|nvmrc|idea|DS_Store|babelrc|eslintrc)$/,
        /.*\.(md|map)$/,
        /webpack\.config\.js/
    ]
};