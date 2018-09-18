module.exports = {
    /*
	** Headers of the page
	*/
    head: {
        title: 'Todo',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Réalisation d‘une Todolist en vue.js avec Nuxt et Vuex' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
	** Customize the progress bar color
	*/
    loading: { color: '#3B8070' },
    /*
	** Build configuration
	*/
    build: {
        /*
		** Run ESLint on save
		*/
        extend( config, { isDev, isClient } ) {
            if ( isDev && isClient ) {
                config.module.rules.push( {
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                } );
            }
        },
        /*
		** SCSS
		*/
        styleResources: {
            scss: './assets/scss/main.scss'
        }
    }
};

