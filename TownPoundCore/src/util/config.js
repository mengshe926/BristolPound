import _ from 'lodash'
import * as Config from '@Config/config'


// the base configuration
export const global_default_config={
    APP_CITY: '{Scheme Area}',
    APP_CURRENCY: '{Currency Name}',
    APP_WEBSITE: 'https://gitlab.com/TownPound/cyclos/ScottLogic.mobile.react-native/TownPoundCore',
    TXT2PAY_NO: undefined,
    TXT2PAY_ACTION_PAY: 'PAY',
    TXT2PAY_ACTION_WITHDRAW: 'EXC',
    TXT2PAY_TEMPLATE: '{ACTION} {PIN} {PAYEE} {AMOUNT}',
    CASH_ONLY_TEXT: 'Cash Only Business',
    CYCLOS: {
        host: undefined,
        cyclosPrefix: undefined,
        network: undefined,
        wsPrefix: undefined,
        channel: undefined
    },
    DIRECTORY: {
        host: undefined,
        cyclosPrefix: undefined,
        network: undefined,
        wsPrefix: undefined
    },
    ALLOW_LOGIN: true,
    DEFAULT_COORDINATES: { latitude: 0, longitude: 0 },
    MAP_MAX_DISTANCE: 100,
    PRIVACY_POLICY: '<div><p>By using the {APP_CURRENCY} mobile application, you are giving your consent to the terms of this privacy policy and to the collection, processing and storage of your personal information for the purposes set forth herein. If you do not agree to this privacy policy, we ask that you desist from using the application as a way of opting out.</p><p>We reserve the right, at our discretion, to change this privacy policy at any time. Such change will be effective 30 days following posting of the revised privacy policy, and your continued use of the Services thereafter means that you accept those changes.</p><p>The {APP_CURRENCY} mobile application collects information for the purposes of improving the services we offer, and for effectively promoting services to you. The application collects data as aggregated, non-personally-identifiable information. This includes transaction dates and times, user types, approximate geolocations, usage patterns and data about the functioning of the application. Information about personal payments is not stored, nor is personally identifiable information about your transaction history or personal shopping habits. All payment data is pulled from and stored on the online banking server and is covered under your separate data protection agreement.</p><p>Your rights to access data stored about you remain as per our data protection policy.</p></div>',
}

const default_secret={
    CHANNEL_SECRET: ''
}

const secrets           = {}
var importedSecrets     = {}

if (Config.secrets) {
    importedSecrets     = require('../../../config/secrets').default
}

_.forEach(['staging', 'development', 'production'], function (flavour) {

    const branch        = _.has(importedSecrets, flavour)
                        ? importedSecrets[flavour]
                        : {}

    _.defaultsDeep(branch, default_secret)

    secrets[flavour]    = branch
})

export const cyclosUrl = (config) => {
    config.CYCLOS.url = 'https://'+config.CYCLOS.host	+'/'+config.CYCLOS.cyclosPrefix +'/'+config.CYCLOS.network +'/api/'

    return config
}

const normaliseConfigurations = (configurations, flavour, default_config) => {

    const extendConfigurations = (c, f, cc) => {
        const result = {}

        // copy flavour config
        _.defaultsDeep(result, c)

        // copy default config
        _.defaultsDeep(result, default_config)

        // copy global default config
        _.defaultsDeep(result, global_default_config)

        cyclosUrl(result)

        result.PRIVACY_POLICY = result.PRIVACY_POLICY.replace(/\{APP_CURRENCY\}/g, result.APP_CURRENCY)

        result['secrets']   = _.has(secrets, flavour)
                            ? secrets[flavour]
                            : default_secret

        // save flavour
        result.FLAVOUR = f

        cc[f] = result
    }

    // extend the customisations
    _.each(configurations, extendConfigurations)

    const result    = _.has(configurations, flavour)
                    ? configurations[flavour]
                    : cyclosUrl(_.merge({}, default_config))

    return result
}

_.merge(Config.default, normaliseConfigurations(Config.configurations, Config.flavour, Config.default_config))
