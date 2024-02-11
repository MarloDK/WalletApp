import { AccountType } from "./AccountTypeEnum";
import { PaymentPeriod } from "./PaymentPeriodEnum";
import { Account } from "./classes/AccountClass";
import { Loan } from "./classes/LoanClass";
import { Subscription } from "./classes/SubscriptionClass";
import { AccountIcons, BrandLogos } from "../utils/LogosAndIcons";

export const getAccounts = (): Account[] => {
    let testAccounts = [
        new Account("Gebyrfri Ungdom", AccountType.DEBIT, 9119, 5752927662, 3271, AccountIcons.AccountAlt()),
        new Account("Gebyrfri Ungdom", AccountType.DEBIT, 9119, 1588006185, 48932, AccountIcons.AccountAlt()),
        new Account("Gebyrfri Ungdom", AccountType.DEBIT, 9119, 4497392324, 4383812, AccountIcons.Invest()),
        new Account("Gebyrfri Ungdom", AccountType.DEBIT, 9119, 7584873432, 547863, AccountIcons.Account()),
        new Account("Gebyrfri Ungdom", AccountType.DEBIT, 9119, 2829307547, 434523, AccountIcons.Savings()),
    ];

    return testAccounts;
}

export const getSubscriptions = (): Subscription[] => {
    let testSubscriptions = [
        new Subscription("Spotify", BrandLogos["Spotify"], 25, PaymentPeriod.MONTHLY, new Date(2023, 4, 25)),
        new Subscription("Splice", BrandLogos["Disney"], 110, PaymentPeriod.MONTHLY, new Date(2023, 5, 12)),
        new Subscription("Twitch", BrandLogos["ESPN"], 30, PaymentPeriod.MONTHLY, new Date(2023, 2, 14)),
        new Subscription("Webflow", BrandLogos["HBOMax"], 1700, PaymentPeriod.YEARLY, new Date(2021, 1, 3)),
    ];

    return testSubscriptions;
}

export const getLoans = (): Loan[] => {
    let testLoans = [
        new Loan("Huslån", "Saxo bank", 1000000, 450000, 2),
        new Loan("Billån", "Saxo bank", 780000, 200000, 1.2),
    ];

    return testLoans;
}