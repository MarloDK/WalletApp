export class Transaction {
    /**
     * Creates a new instance of the Transaction class.
     * @param private _name The name associated with the transaction.
     * @param readonly date The date the transaction occurred.
     * @param readonly previousBalance The account balance before the transaction was made.
     * @param readonly newBalance The account balance after the transaction was made.
     * @param readonly transactionValue The value of the transaction.
     */
    constructor(
        private _name: string,
        readonly date: string,
        readonly previousBalance: number,
        readonly newBalance: number,
        readonly transactionValue: number
    ) { }

    /**
     * Gets the name associated with the transaction.
     * @returns The name associated with the transaction.
     */
    getName(): string {
        return this._name;
    }

    /**
     * Sets a new name for the transaction.
     * @param name The new name to associate with the transaction.
     */
    setName(name: string) {
        this._name = name;
    }
}