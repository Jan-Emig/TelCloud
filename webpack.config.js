const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
    {
        entry: {
            app: './src/js/electron.ts',
            sign_in: './src/js/sign_in.tsx',
            sign_in_preload: './src/js/preloaders/sign_in_preload.ts',
            zeta: './src/js/zeta.tsx',
        },
        mode: 'development',
        target: 'electron-main',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                }
            ],
        },
        resolve: {
            mainFields: ['module', 'main'],
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist/js'),
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: './src/*.html', to: '../[name].html'},
                    { from: './src/assets/*', to: '../assets/[name][ext]'}
                ]
            })
        ]
    },
];