export const testingConfig = {
    autofillStorage: true,
    skipClasses: {
        accounts: false,
        subscriptions: false,
        loans: false,
    },
    classInstanceVariation: {
        min: 1,
        max: 10,
    },
    accountSettings: {
        generateTransactionhistory: true,
        startingBalance: {
            min: 0,
            max: 9999999,
        },
        names: [
            'Gebyrfri Teenage',
            'Netbank Plus',
            'Studiekonto',
            'Senior Opsparing',
            'Børneopsparing',
            'Flexlån konto',
            'Boligopsparing',
            'Pension Plus',
            'Valutakonto',
            'Investorkonto',
        ],
    },
    transcationGenerationSettings: {
        randomTransactionValueVariance: {
            min: -20000,
            max: 80000,
        },
        names: [
            "Løn",
            "MobilePay Overførsel - Hans Hansen",
            "MobilePay Overførsel - John Doe",
            "MobilePay Overførsel - Casper Bakhøj",
            "MobilePay Overførsel - Jens Jensen",

        ]
    },
    subscriptionSettings: {
        // Threshold to reach before going to yearly subscription period
        // (price <= threshold)
        subscriptionPeriodThreshold: 1000,
        priceVariation: {
            min: 10,
            max: 2500,
        },
        dateVariationStart: {
            day: 1,
            month: 1,
            year: 2018,
        },
        names: [
            'Spotify',
            'Netflix',
            'Twitch',
            'HBO Max',
            'Hulu',
            'Disney+',
            'ESPN',
            'Apple TV',
            'Paramount',
            'TV2+',
        ],
    },
    loanSettings: {
        loanAmountVariation: {
            min: 5000,
            max: 9999999,
        },
        interestVariation: {
            min: 0.1,
            max: 10,
        },
        names: [
            'Boliglån',
            'Billån',
            'Studielån',
            'Renoveringslån',
            'Forbrugslån',
            'Grønlån',
            'Iværksætterlån',
            'Ferielån',
        ],
        creditorNames: [
            'Saxo Bank',
            'Vestjysk Bank',
            'Sparekassen Thy',
            'Forældre',
        ]
    }
}