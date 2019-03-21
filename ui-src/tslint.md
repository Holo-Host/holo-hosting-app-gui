`{
  "extends": ["tslint-config-standard", "tslint-react"],
  "rules": {
  	"jsx-no-lambda": false,
    "jsx-no-multiline-js": false,
    "tsx-no-multiline-ts": false,
    "semicolon": [true, "always", "ignore-interfaces"],
    "indent": [false]
  },
  "linterOptions": {
    "exclude": [
      "config/**/*.js",
      "node_modules/**/*.ts",
      "coverage/lcov-report/*.js"
    ]
  }
}`
