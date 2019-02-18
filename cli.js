#!/usr/bin/env node

const yargs = require('yargs')
const fs = require('fs')
const cli = require('./index.js')

const input = yargs.option('output', {
    alias: 'o',
    describe: 'the filename of the file to create, when omitted output is printed to stdout',
    default: null
  })
  .option('prefix', {
    alias: 'p',
    describe: 'the env variables prefix all env vars beginning with this prefix will be incorporated in the result',
    default: 'CFG_'
  })
  .help()
  .argv

const parseResult = cli.parse(input.prefix)

if (input.output == null) {
  // no output file given, log to stdout
  console.log(parseResult)
} else {
  // output file given, write to file
  fs.writeFile(input.output, JSON.stringify(parseResult), function (err) {
    if (err) {
      return console.log(err)
    }
    console.log(`Env parsed file ${input.output} written`)
  });
}
