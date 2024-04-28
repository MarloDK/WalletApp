import { LoanIcons } from "../../utils/LogosAndIcons";

export class Loan {
    private _icon: JSX.Element = LoanIcons.MoneyBill(20, "#FFF");
    /**
     * Creates a new Loan instance.
     * @param private _name The name of the loan.
     * @param private _icon The icon for the loan.
     * @param readonly creditor The name of the creditor.
     * @param readonly amount The total amount of the loan.
     * @param private _paid The amount that has already been paid off.
     * @param private _interest The interest rate of the loan.
     */
    constructor(
        private _name: string, 
        readonly creditor: string, 
        readonly amount: number, 
        private _paid: number, 
        private _interest: number,
        icon?: JSX.Element,
    )   { 
        if (icon) {
            this._icon = icon;
        }
    }


    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }


    get icon(): JSX.Element {
        return this._icon;
    }

    set icon(icon: JSX.Element) {
        this._icon = icon;
    }

    /**
     * Repays a specified amount of the loan.
     * @param amount The amount to be repaid.
     */
    repay(amount: number) {
        this._paid += amount;
    }

    get amountPaidOff(): number {
        return this._paid;
    }

    get remainingDebt(): number {
        return this.amount - this._paid;
    }

    get interest(): number {
        return this._interest;
    }

    set interest(interest: number) {
        this._interest = interest;
    }
}