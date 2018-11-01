# env-parser

Parse environment variable names and build a single object out of them.

## Installation

  npm install rainu-env-parser --save

## Usage

```javascript
let defaultValues = {
   port: 1312
}
let config = parse("CFG_", defaultValues)

console.log(config)
```

## Tests

  npm test

## Licence

This project is distributed under the [MIT-License](http://www.opensource.org/licenses/mit-license.php).
