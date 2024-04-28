export class SavingsGoal {
    /**
     * Creates a new Savings goal instance.
     * @param private _name The name of the savings goal.
     * @param private _targetAmount The target amount of money saved for the savings goal.
     * @param private _savedAmount The current amount saved for the savings goal.
     */
    constructor(
        private _name: string, 
        private _targetAmount: number, 
        private _savedAmount: number, 
    ) { }


    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get targetAmount(): number {
        return this._targetAmount;
    }
    
    set targetAmount(amnt: number) {
        this._targetAmount = amnt;
    }

    get savedAmount(): number {
        return this._savedAmount;
    }
        
    set savedAmount(amnt: number) {
        this._savedAmount = amnt;
    }

    /**
     * Adds amnt to the saved amount of money for the savings goal.
     * @param amnt The amount of money to add to the saved amount for the savings goal.
     */
    addToSavedAmount(amnt: number) {
        this._savedAmount += amnt;
    }

    /**
     * Subtracts amnt from the saved amount of money for the savings goal.
     * @param amnt The amount of money to subtract from the saved amount for the savings goal.
     */
    subtractFromSavedAmount(amnt: number) {
        this._savedAmount -= amnt;
    }
}