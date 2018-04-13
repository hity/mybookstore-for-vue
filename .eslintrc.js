module.exports = {
    root: true,
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-stylestandard
    extends: 'standard', //airbnb-base | standard
    // required to lint *.vue files
    plugins: [
        'html',
    ],
    parser: 'babel-eslint', // import的模式替代require
    parserOptions: {
        sourceType: 'module',
        "ecmaFeatures": {
            "jsx": true
        }
    }, // import的模式替代require
    "globals": {
        "window": true,
        "__webpack_public_path__": true,
        "_hmt": true,
        "scrollBehavior": true
    },
    // add your custom rules here
    'rules': {
        "class-methods-use-this": 0,
        // "compat/compat": 2,
        "comma-dangle": 0,
        "consistent-return": 2,
        "func-names": 0,
        "generator-star-spacing": [0],
        "import/no-extraneous-dependencies": ["off"],
        "import/extensions": 0,
        "import/no-unresolved": 0,
        "new-cap": 0,
        "no-implicit-coercion": "error",
        "no-mixed-operators": 0,
        "no-plusplus": 0,
        "no-use-before-define": 0,
        "no-nested-ternary": 0,
        "no-underscore-dangle": 0,
        "no-var": "error",
        "semi": ["error", "always"],
        "promise/param-names": 2,
        "promise/always-return": 0,
        "promise/catch-or-return": 0,
        "promise/no-native": 0,
        "space-before-function-paren": [2, "never"],
        "no-useless-escape": 0,
        "no-use-before-define": 0,
        "no-unused-vars": [0, {
            "varsIgnorePattern": "[iI]gnored|rem"
        }],
        "no-new": 0,
        "handle-callback-err": 0,
        "camelcase": [2, { // http://eslint.org/docs/rules/camelcase
            "properties": "never"
        }],
        // enable additional rules
        indent: ['error', 4, {
            SwitchCase: 1,
            "VariableDeclarator": {
                "var": 2,
                "let": 2,
                "const": 3
            },
            outerIIFEBody: 1
        }],
        "linebreak-style": 0, // ["warn", "windows"],
        "quotes": ["error", "single"],
        "semi": ["error", "never"],
        "eqeqeq": [0, "allow-null"],
        "operator-linebreak": [0, "before"],
        //"no-extra-semi": ["error"],
        // override default options for rules from base configurations
        "comma-dangle": ["error", "never"],
        "no-cond-assign": ["error", "always"],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        "arrow-body-style": [0, "always"],
        "prefer-promise-reject-errors": ["error", { "allowEmptyReject": true }],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    },
    settings: {
        "import/resolver": "webpack",
        "import/extensions": [".js", ".jsx"]
    },
};
