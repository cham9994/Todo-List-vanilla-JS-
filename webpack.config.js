// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// export
module.exports = {
  //parcel index.html
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js',

  // 결과물(번들)을 변환하는 설정
  output: {
    // path: path.resolve(__dirname, 'public'), // 첫번째 인수와 두번째 인수의 경로를 합쳐줌
    // filename: 'app.js',
    // webpack이 자동으로 만들어줌
    clean: true, // 파일 이름이 바뀌면 기존에 있던 파일 지움(기존 필요 없는 파일 지움)
  },

  module: {
    rules: [
      {
        test: /\.s?css$/, // .css 확장자를 가진 모든 파일에서 사용하기 위해
        use: [
          'style-loader', // 분석된 css 스타일 결과를 html 헤더 안에 스타일 태그로 삽입함
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader', // 웹팩이 해석하고 적용하기 위해 bable-loader를 사용
        ],
      },
    ],
  },

  plugins: [
    new HtmlPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }], //스태틱 안에 있는 파일이 복사 돼서 dist 폴더로 들어감
    }),
  ],

  devServer: {
    host: 'localhost',
  },
}
