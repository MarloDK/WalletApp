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

    /**
     * Gets the name of the savings goal.
     * @returns The name of the savings goal.
     */
    getName(): string {
        return this._name;
    }

    /**
     * Sets the name of the savings goal.
     * @param name The new name of the savings goal.
     */
    setName(name: string) {
        this._name = name;
    }

    /**
     * Gets the target for the savings goal.
     * @returns The target for the savings goal.
     */
    getTargetAmount(): number {
        return this._targetAmount;
    }
    
    /**
     * Sets the target for the savings goal.
     * @param amnt The new target for the savings goal.
     */
    setTargetAmount(amnt: number) {
        this._targetAmount = amnt;
    }

    /**
     * Gets the saved amount of money for the savings goal.
     * @returns The saved amount of money for the savings goal.
     */
    getSavedAmount(): number {
        return this._savedAmount;
    }
        
    /**
     * Sets the saved amount of money for the savings goal.
     * @param amnt The new saved amount of money for the savings goal.
     */
    setSavedAmount(amnt: number) {
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