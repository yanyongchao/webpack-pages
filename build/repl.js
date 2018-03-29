const inquirer = require('inquirer')
const { spawn } = require('child_process')
const alias = require('./alias')

const question = [
  {
    type: 'input',
    message: '请输入路径别名（详见alias.json）',
    name: 'a',
    default: 'checkin',
    prefix: '$',
    validate (input) {
      var done = this.async();
      done(null, true)
    }
  },
  {
    type: 'list',
    message: '请选择内容',
    name: 'operation',
    choices: [
      {
        name: '开发',
        value: 'dev',
        short: '本地开发'
      },
      {
        name: '生产',
        value: 'build',
        short: '打包生产'
      }
    ]
  }
]

function ask () {
  inquirer.prompt(question).then(answer => {
    autoBundle(answer)
  })
}

ask()

function shell_stdio (command) {
  spawn(command, [], {
    stdio: 'inherit',
    shell: true
  })
}

function autoBundle ({ a = 'all', operation = 'dev' }) {
  if (typeof alias[a] === 'object' && alias[a] instanceof Array) {
    a = alias[a].join(',')
  }
  if (operation === 'dev') {
    shell_stdio(`cross-env ENTRYPATH=${a} webpack-dev-server --inline --progress --config build/webpack.dev.conf.js`)
  } else if (operation === 'build') {
    shell_stdio(`cross-env ENTRYPATH=${a} node build/build.js`)
  }
}