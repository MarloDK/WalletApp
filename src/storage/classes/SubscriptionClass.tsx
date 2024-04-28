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


    get name(): string {
        return this._serviceName;
    }

    set name(name: string) {
        this._serviceName = name;
    }

    get price(): number {
        return this._price;
    }

    get monthlyPrice(): number {
        switch (this._subscriptionPeriod) {
            case PaymentPeriod.MONTHLY:
                return this.price;

            case PaymentPeriod.QUARTERLY:
                return this.price / 3;

            case PaymentPeriod.HALF_YEARLY:
                return this.price / 6;

            case PaymentPeriod.YEARLY:
                return this.price / 12;
        
            default:
                break;
        }
        return this._price;
    }

    set price(price: number) {
        this._price = price;
    }

    get subscriptionPeriod(): PaymentPeriod {
        return this._subscriptionPeriod;
    }

    get subscriptionPeriodName(): string {
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

    set subscriptionPeriod(period: PaymentPeriod) {
        this._subscriptionPeriod = period;
    }

    get billingDate(): Date {
        return this._billingDate;
    }


    get logoPath(): any {
        return this._serviceLogo;
    }

    set logoPath(path: string) {
        this._serviceLogo = path;
    }
}