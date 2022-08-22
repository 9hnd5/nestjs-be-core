const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    target: 'node',
    context: __dirname,
    mode: 'production',
    entry: './src/index.ts',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: true,
                    mangle: true,
                    keep_classnames: true,
                    keep_fnames: true,
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', 'json'],
        alias: {
            '~': path.resolve(__dirname, 'src/'),
        },
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        plugins: [new TsconfigPathsPlugin()],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            type: 'commonjs2',
        },
    },
    stats: 'errors-only',
    externals: ['class-transformer', 'class-validator', 'cache-manager', /^@nestjs\/.+$/],
    plugins: [
        new webpack.ProgressPlugin(),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                mode: 'write-dts',
            },
        }),
    ],
};
