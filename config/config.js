// export this to see the original selection
export const flavour = 'staging'

// use the secrets
export const secrets = true

// the base configuration
export const default_config={
    APP_CITY: 'Bristol',
    APP_CURRENCY: 'Bristol Default',
    APP_WEBSITE: 'https://bristolpound.org',
    TXT2PAY_NO: '+44 7441 906260',
    CASH_ONLY_TEXT: 'Cash Only Business',
    CYCLOS: {
        host: 'bristol-stage.community-currency.org',
        cyclosPrefix: 'cyclos',
        network: 'bristolpound',
        wsPrefix: '',
        channel: 'BristolPoundApp{CHANNEL_SECRET}',
    },
    DIRECTORY: {
        host: 'api.bristolpound.org',
        cyclosPrefix: '',
        network: '',
        wsPrefix: '',
        apiVersion: '2'
    },
    ALLOW_LOGIN: true,
    DEFAULT_COORDINATES: { latitude: 51.454513, longitude:  -2.58791 },
    MAP_MAX_DISTANCE: 75,
    CASH_POINT_1: 'Here everyone can swap Sterling for Bristol Pounds, account holders can withdraw paper notes and businesses can deposit them.',
    CASH_POINT_2: 'Here everyone can swap Sterling for Bristol Pounds.',
    PRVACY_POLICY: `<div><p>By using the Bristol Pound mobile application, you are giving your consent to the terms of this privacy policy and to the collection, processing and storage of your personal information for the purposes set forth herein. If you do not agree to this privacy policy, we ask that you desist from using the application as a way of opting out.</p><p>We reserve the right, at our discretion, to change this privacy policy at any time. Such change will be effective 30 days following posting of the revised privacy policy, and your continued use of the Services thereafter means that you accept those changes.</p><p>The Bristol Pound mobile application collects information for the purposes of improving the services we offer, and for effectively promoting services to you. The application collects data as aggregated, non-personally-identifiable information. This includes transaction dates and times, user types, approximate geolocations, usage patterns and data about the functioning of the application. Information about personal payments is not stored, nor is personally identifiable information about your transaction history or personal shopping habits. All payment data is pulled from and stored on the online banking server run by the Bristol Credit Union (BCU), and is covered under your separate data protection agreement directly with the BCU.</p><p>Your rights to access data stored about you remain as per our data protection policy at: <a href="https://bristolpound.org/data-protection-pledge" target="_blank">https://bristolpound.org/data-protection-pledge</a></p></div>`,
}

// customisations for individual flavours are added here
export const configurations={
    staging: {
        APP_CURRENCY: 'Bristol Staging',
    },
    development: {
        APP_CURRENCY: 'Bristol Devel',
        CYCLOS: {
            host: 'dev-bristol.community-currency.org',
        },
    },
    production: {
        APP_CURRENCY: 'Bristol Pound',
        TXT2PAY_NO: '+44 7441 900 333​',
        CYCLOS: {
            host: 'bristol.community-currency.org',
        }
	}
}

export default config = {}
