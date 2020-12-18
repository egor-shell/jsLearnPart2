const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'shop.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     { loader: 'babel-loader' },
      //   ]
      // },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.[s]?css$/,
        use: [
          'style-loader', // инжектит стили из js модуля в тэги <style></style>
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }, // трансформирует css файл в js модуль
          'sass-loader',
        ]
      },
      {
        test: /\.vue$/,
        use: [
          { loader: 'vue-loader' },
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}