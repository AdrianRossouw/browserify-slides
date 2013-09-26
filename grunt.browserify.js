module.exports = {
    vendor: {
        files: {
            'dist/js/vendor.js': ['highlight.js', 'impress', 'underscore']
        },
        options: {
            shim: {
                'impress': { path: 'bower_components/impress.js/js/impress.js', exports: 'impress'}
            },
            alias: ['underscore:', 'highlight.js:']
        }
    },
    templates: {
        files: {
            'dist/js/templates.js': ['templates/*.jade']
        },
        options: {
            transform: ['jadeify2'],
            aliasMappings: { src: ['templates/*.jade'] }
        }
    },
    dist: {
        files: {
            'dist/js/main.js': ['js/main.js', 'js/init.js']
        },
        options: {
            external: ['impress', 'highlight.js', 'underscore', 'templates/*.jade'],
            transform: ['coffeeify', 'jadeify2', 'brfs']
        }
    }
};
