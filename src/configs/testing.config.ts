export const testingConfig = {
    autofillStorage: true,
    skipClasses: {
        accounts: false,
        savingsGoals: false,
        subscriptions: false,
        loans: false,
        expenses: false,
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
            'Teenage Account',
            'Banking Plus',
            'Student Account',
            'Senior Savings',
            'Kids Savings',
            'Flex Account',
            'Mortgage Savings',
            'Pension Plus',
            'Currency Account',
            'Invest+',
        ],
    },
    transcationGenerationSettings: {
        randomTransactionValueVariance: {
            min: -20000,
            max: 80000,
        },
        names: [
            "Paycheck",
            "Zelle Transfer - George Johnson",
            "Zelle Transfer - John Doe",
            "Zelle Transfer - Casper Boyd",
            "Zelle Transfer - Guy Keith",

        ]
    },
    savingsGoalSettings: {
        goalTarget: {
            min: 100,
            max: 100000,
        },
        currentlySaved: {
            min: 0,
            max: -1,
        },
        names: [
            'New car',
            'New phone',
            'New PC',
            'Down payment',
            'New kitchen',
            'New speakers',
            'New TV',
            'Home renovation',
        ],
    },
    subscriptionSettings: {
        // Threshold to reach before going to yearly subscription period
        // (price <= threshold)
        subscriptionPeriodThreshold: 1000,
        priceVariation: {
            min: 10,
            max: 2500,
        },
        dateVariation: {
            day: 31,
            month: 12,
            year: 2,
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
            'Down payment loan',
            'Car loan',
            'Student loan',
            'Renovation loan',
            'Vacation loan',
            'Entrepreneur loan',
        ],
        creditorNames: [
            'Bank Of America',
            'Wells Fargo',
            'Chase Bank',
            'U.S. Bank',
        ]
    },
    expenseSettings: {
        expenseAllocatedVariation: {
            min: 10,
            max: 1000,
        },
        expenseSpentPercentage: {
            min: 0,
            max: 70,
        },
        names: [
            'Groceries',
            'Electricity',
            'Phone',
            'Gas',
            'Water and sewer',
            'Transportation',
        ],
    }
}