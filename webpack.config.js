const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    context: path.resolve(__dirname),
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src'),
            '~': path.resolve(__dirname)
        }
    },
    devServer: {
        open: true,
        hot: true,
        port: 8003,
    },
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin(
            {
                template: './public/index.html'
            }
        ),
        new ModuleFederationPlugin({
            name: 'mf_mntg',
            filename: 'remoteEntry.js',
            exposes: {
              './initMntgApp': './src/initMntgApp.js',
            },
        }),
    ]
}
