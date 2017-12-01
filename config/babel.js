const babelPreset = (name) => require.resolve(`babel-preset-${name}`)
const babelPlugin = (name) => require.resolve(`babel-plugin-${name}`)

module.exports = {
    'presets': [
        [ babelPreset('env'), {
            'targets': {
                'browsers': [ 'last 2 versions', 'ie 11' ],
                'modules': false,
            },
        }],
        babelPreset('react'),
    ],

    'plugins': [
        babelPlugin('transform-runtime'),
        babelPlugin('transform-object-rest-spread'),
        babelPlugin('transform-class-properties'),
        [ babelPlugin('transform-react-remove-prop-types'), { 'mode': 'wrap' }],
    ],
    'env': {
        'development': {},
        'production': {},
        'test': {
            'plugins': [
                [ 'istanbul',
                    {
                        'include': [
                            'src/**/*.jsx',
                            'src/**/*.js',
                        ],
                        'exclude': [
                            'src/**/*.spec.js',
                            'src/**/*.spec.jsx',
                        ],
                    },
                ],
            ],
        },
    },
}
