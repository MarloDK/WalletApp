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

    /**
     * Gets the name of the loan.
     * @returns The name of the loan.
     */
    getName(): string {
        return this._name;
    }

    /**
     * Sets the name of the loan.
     * @param name The new name of the loan.
     */
    setName(name: string) {
        this._name = name;
    }

    /**
     * Gets the icon for the loan.
     * @returns The icon for the loan.
     */
    getIcon(): JSX.Element {
        return this._icon;
    }

    /**
     * Sets the icon for the loan.
     * @param icon The new icon for the loan.
     */
    setIcon(icon: JSX.Element) {
        this._icon = icon;
    }

    /**
     * Repays a specified amount of the loan.
     * @param amount The amount to be repaid.
     */
    repay(amount: number) {
        this._paid += amount;
    }

    /**
     * Gets the total amount paid off from the loan.
     * @returns The total amount paid off.
     */
    getAmountPaidOff(): number {
        return this._paid;
    }

    /**
     * Calculates and returns the remaining debt of the loan.
     * @returns The remaining amount to be paid off.
     */
    getRemainingDebt(): number {
        return this.amount - this._paid;
    }

    /**
     * Gets the interest rate of the loan.
     * @returns The interest rate.
     */
    getInterest(): number {
        return this._interest;
    }

    /**
     * Sets the interest rate of the loan.
     * @param interest The new interest rate.
     */
    setInterest(interest: number) {
        this._interest = interest;
    }
}