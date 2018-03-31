// 'use strict'
// require('./check-versions')()

// const ora = require('ora')
// const rm = require('rimraf')
// const path = require('path')
// const chalk = require('chalk')
// const webpack = require('webpack')
// const webpackConfig = require('./webpack.build.conf.js')

// const spinner = ora('building for production...')
// spinner.start()

// webpack(webpackConfig, (err, stats) => {
//   spinner.stop()
//   if (err) throw err
//   process.stdout.write(stats.toString({
//     colors: true,
//     modules: false,
//     children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
//     chunks: false,
//     chunkModules: false
//   }) + '\n\n')

//   if (stats.hasErrors()) {
//     console.log(chalk.red('  Build failed with errors.\n'))
//     process.exit(1)
//   }

//   console.log(chalk.cyan('  Build complete.\n'))
//   console.log(chalk.yellow(
//     '  Tip: built files are meant to be served over an HTTP server.\n' +
//     '  Opening index.html over file:// won\'t work.\n'
//   ))
// })
const path = require('path')
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.dev.conf.js');
const options = {
  // contentBase: path.resolve(__dirname, '../dist'),
  // open: true,
  // contentBase:'__webpack_dev_server__',
  contentBase:'/dist/',
  hot: true,
  host: '127.0.0.1',
  historyApiFallback: true,
  noInfo: true,
  overlay: true
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, '127.0.0.1', () => {
  console.log('dev server listening on port 5000');
});
