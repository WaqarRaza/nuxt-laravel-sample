import colors from 'vuetify/es5/util/colors'

export default {
    head: {
        titleTemplate: '%s - Task manager',
        title: 'Home',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    css: [
        'sweetalert2/dist/sweetalert2.min.css',
    ],

    plugins: [
        '~/plugins/toast.js',
        '~/plugins/axios.js',
        '~/plugins/mixins.js',
    ],

    components: true,

    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/moment',
        '@nuxtjs/axios',
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        'nuxt-highcharts',
    ],

    axios: {
        baseURL: 'http://tasks.test/api',
    },

    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    highcharts: {},

    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                },
                light: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent1
                }
            }
        }
    },

    build: {}
}
