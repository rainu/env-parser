const yargs = require('yargs')
var fs = require('fs');
const envParser = require('./index.js')
const input = yargs.option('output', {
    alias: 'o',
    describe: 'the filename of the file to create, when ommited output is printed to stdout',
    default: null
})
    .option('prefix', {
        alias: 'p',
        describe: 'the env variables prefix all env vars begginning with this prefix will be incorporated in the result',
        default: 'CFG_'
    })

    .help()
    .argv

const parseResult=envParser.parse(input.prefix)

if (input.output == null) {
    // no output file given, log to stdout
    console.log(parseResult)
} else {
    // output file given, write to file
    fs.writeFile(input.output,JSON.stringify(parseResult), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(`Env Parsed file ${input.output} written`);
    });
}
