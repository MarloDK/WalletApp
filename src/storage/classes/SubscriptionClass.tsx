import { PaymentPeriod } from "../PaymentPeriodEnum";

export class Subscription {
    /**
     * Creates a new Subscription instance.
     * @param private _serviceName The name of the subscription service.
     * @param private _serviceLogo The logo of the subscription service.
     * @param private _price The price of the subscription when payment is due.
     * @param private _subscriptionPeriod The period you pay for every time the payment is due.
     * @param private _billingDate The date at which payment is due.
     */
    constructor(
        private _serviceName: string,
        private _serviceLogo: any,
        private _price: number,
        private _subscriptionPeriod: PaymentPeriod,
        private _billingDate: Date,
    ) { }

    /**
     * Gets the name of the subscription service.
     * @returns The name of the subscription service.
     */
    getName(): string {
        return this._serviceName;
    }

    /**
     * Sets a new name for the subscription service.
     * @param name The new name for the subscription service.
     */
    setName(name: string) {
        this._serviceName = name;
    }

    /**
     * Gets the price of the subscription service.
     * @returns The price of the subscription service.
     */
    getPrice(): number {
        return this._price;
    }

    /**
     * Gets the monthly price of the subscription service.
     * @returns The monthly price of the subscription service.
     */
    getMonthlyPrice(): number {
        switch (this._subscriptionPeriod) {
            case PaymentPeriod.MONTHLY:
                return this.getPrice();

            case PaymentPeriod.QUARTERLY:
                return this.getPrice() / 3;

            case PaymentPeriod.HALF_YEARLY:
                return this.getPrice() / 6;

            case PaymentPeriod.YEARLY:
                return this.getPrice() / 12;
        
            default:
                break;
        }
        return this._price;
    }

    /**
     * Sets a new name for the subscription service.
     * @param name The new name for the subscription service.
     */
    setPrice(price: number) {
        this._price = price;
    }

    /**
     * Gets the period the user pays to stays subscribed for.
     * @returns A payment period representing the period the users pays for.
     */
    getSubscriptionPeriod(): PaymentPeriod {
        return this._subscriptionPeriod;
    }

    /**
     * Gets the period the user pays to stays subscribed for.
     * @returns The name of the period as a string.
     */
    getSubscriptionPeriodName(): string {
        switch (this._subscriptionPeriod) {
            case PaymentPeriod.MONTHLY:
                return "måned";

            case PaymentPeriod.QUARTERLY:
                return "3. måned";

            case PaymentPeriod.HALF_YEARLY:
                return "6. måned";

            case PaymentPeriod.YEARLY:
                return "år";
        
            default:
                break;
        }
        return "Fejl";
    }

    /**
     * Sets a new subscription period.
     * @param period The new subscription period for the service.
     */
    setSubscriptionPeriod(period: PaymentPeriod) {
        this._subscriptionPeriod = period;
    }

    /**
     * Gets the billing date for the subscription.
     * @returns A date object representing the next billing date.
     */
    getBillingDate(): Date {
        return this._billingDate;
    }

    /**
     * Gets the path to the logo of subscription service.
     * @returns A string with the path to the logo file.
     */
    getLogoPath() {
        return this._serviceLogo;
    }

    /**
     * Sets the path to the logo of subscription service.
     * @params path The path to the image for the logo of subscription service.
     */
    setLogoPath(path: string) {
        this._serviceLogo = path;
    }
}