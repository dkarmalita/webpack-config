module.exports = {
    'presets': [
        [ 'env', {
            'targets': {
                'browsers': [ 'last 2 versions', 'ie 11' ],
                'modules': false,
            },
        }],
        'react',
    ],

    'plugins': [

        'transform-runtime',

        'transform-object-rest-spread',

        'transform-class-properties',

        [ 'transform-react-remove-prop-types', { 'mode': 'wrap' }],

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
